const ChatCollection = require('../models/chat.collection');
const UserCollection = require('../models/user.collection');
const { sequelize } = require('../utils/database.util');
const { redisClient } = require('../utils/redis-store.util');
const { databaseName } = require('../utils/variables.util');



async function getUserChats(req, res, next) {

  try {

    const userId = req.user.id;

    const cacheKey = `getUserChats${userId}`;
    const cache = await redisClient.get(cacheKey);

    if(cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const currentUser = await UserCollection.findOne({ id: { $eq: userId } });

    let userChats = await ChatCollection.find({
      users: { $elemMatch: { $eq: currentUser._id } }
    })
      .populate('users')
      .populate('groupAdmin')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });

    userChats = await UserCollection.populate(userChats, {
      path: 'latestMessage.sender',
      select: 'id'
    });

    // const usernames = await sequelize.query(`
    //   SELECT * from ${databaseName}.user
    //   WHERE id = ?
    // `, { replacements: {  } })

    await redisClient.setEx(cacheKey, 2, JSON.stringify(userChats));

    return res.status(200).json(userChats);

  } catch (error) {

    console.error(error);
    return next(error);
  }

}


async function getGroupChats(req, res, next) {

  try {

    const userId = req.user.id;

    const currentUser = await UserCollection.findOne({ id: { $eq: userId } });

    let currentChats = await ChatCollection.find({
      users: { $elemMatch: { $eq: currentUser._id } },
      isGroupChat: { $eq: true }
    })
      .populate('users')
      .populate('groupAdmin')
      .populate('latestMessage')
      .sort({ updatedAt: -1 });

    currentChats = await UserCollection.populate(currentChats, {
      path: 'latestMessage.sender',
      select: 'id'
    });

    return res.status(200).json(currentChats);

  } catch (error) {

    console.error(error);
    return next(error);
  }

}


async function createOneOneChat(req, res, next) {

  try {

    const userId = req.body['userId'];

    // if no userId
    if (!userId || !parseInt(userId)) {
      return res.status(400).json({
        message: 'No user id is provided'
      });
    }

    const receiver = await UserCollection.findOne({ id: { $eq: userId } });

    // create user id for chat if not exists
    if(!receiver) {
      await UserCollection.create({ id: userId });
    }

    const sender = await UserCollection.findOne({ id: { $eq: req.user.id } });

    // if there is already users (current user and receiver) in chat
    let currentChats = await ChatCollection.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: receiver._id } } },
        { users: { $elemMatch: { $eq: sender._id } } },
      ]
    })
      .populate('users') // populate users field (which has ref to user collection)
      .populate('latestMessage'); // populate latestMessage field ref to message collection

    currentChats = await UserCollection.populate(currentChats, {
      path: 'latestMessage.sender',
      select: 'id'
    });

    if (currentChats.length > 0) {
      return res.status(200).json(currentChats[0]);
    } 

    const createdChat = await ChatCollection.create({
      chatName: 'sender', // ?
      isGroupChat: false,
      users: [sender._id, receiver._id]
    });

    const currentChat = await ChatCollection.findOne({ _id: createdChat._id })
                                            .populate('users')

    return res.status(200).json(currentChat);

  } catch (error) {

    console.error(error);
    return next(error);
  }

}


async function createGroupChat(req, res, next) {

  try {

    const users = req.body['users'] || [];
    const chatName = req.body['chatName'] || '';

    if(!users || !chatName) {
      return res.status(422).json({
        error: 'Fields missing',
        message: 'Group name and users must not be empty'
      });
    }

    let currentUsers = JSON.parse(users);

    if(!Array.isArray(currentUsers)) {
      return res.status(422).json({
        error: 'Invalid users',
        message: 'users must be an array'
      });
    }

    if(currentUsers.length < 2) {
      return res.status(422).json({
        error: 'Inadequate number of users',
        message: 'More than 2 users are required to create a group'
      });
    }

    const currentUser = await UserCollection.findOne({ id: { $eq: req.user.id } });

    currentUsers = [...currentUsers, currentUser];

    let groupChat = await ChatCollection.create({
      chatName: chatName,
      users: currentUsers,
      isGroupChat: true,
      groupAdmin: currentUser._id
    });

    groupChat = await ChatCollection.findOne({ _id: groupChat._id })
                          .populate('users')
                          .populate('groupAdmin');

    return res.status(200).json(groupChat);

  } catch (error) {

    console.error(error);
    return next(error);
  }

}

async function renameGroupChat(req, res, next) {

  try {

    const chatId = req.body['chatId'];
    const chatName = req.body['chatName'];

    const updatedChat = await ChatCollection.findByIdAndUpdate(
      chatId,
      { chatName }, 
      { new: true } // returns updated document
    ).populate('users').populate('groupAdmin');

    return res.status(200).json(updatedChat);

  } catch (error) {

    console.error(error);
    return next(error);
  }

}

async function deleteGroupChat(req, res, next) {

  try {

    const chatId = req.body['chatId'];

    const deletedChat = await ChatCollection.findByIdAndDelete(
      chatId,
      // { new: true } // returns updated document
    ).populate('users').populate('groupAdmin');

    return res.status(200).json(deletedChat);

  } catch (error) {

    console.error(error);
    return next(error);
  }

}


async function addUserToGroupChat(req, res, next) {

  try {

    const chatId = req.body['chatId'];
    const userId = req.body['userId'];

    const updatedChat = await ChatCollection.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    ).populate('users').populate('groupAdmin');

    if(!updatedChat) {
      return res.status(404).json({
        error: 'Chat not found',
        message: 'Chat with specified id was not found'
      })
    }

    return res.status(200).json(updatedChat);

  } catch (error) {

    console.error(error);
    return next(error);
  }

}


async function removeUserFromGroupChat(req, res, next) {

  try {

    const chatId = req.body['chatId'];
    const userId = req.body['userId'];

    const updatedChat = await ChatCollection.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    ).populate('users').populate('groupAdmin');

    if(!updatedChat) {
      return res.status(404).json({
        error: 'Chat not found',
        message: 'Chat with specified id was not found'
      })
    }

    return res.status(200).json(updatedChat);

  } catch (error) {

    console.error(error);
    return next(error);
  }

}




// async function getUsers(req, res, next) {

//   try {
//     const q = req.query['q'];

//     if (q) {

//       const users = await UserCollection
//         .find({
//           id: { $ne: req.user.id }
//         })

//       return res.status(200).json(users);
//     }

//   } catch (error) {

//     console.error(error);
//     return next(error);
//   }
// }


// async function createUser(req, res, next) {

//   try {

//     const userId = req.body['id'];

//     const user = await UserCollection.create({ id: userId });

//     return res.status(200).json(user);

//   } catch (error) {

//     console.error(error);
//     return next(error);
//   }

// }


// async function getUserById(req, res, next) {

//   try {

//     const userId = req.params['id'];

//     const user = await UserCollection.findOne({ id: userId });

//     return res.status(200).json(user);

//   } catch (error) {

//     console.error(error);
//     return next(error);
//   }

// }



module.exports = {
  // createUser,
  // getUserById,
  // getUsers,
  getUserChats, 
  getGroupChats,
  createOneOneChat,
  createGroupChat,
  renameGroupChat,
  deleteGroupChat,
  addUserToGroupChat,
  removeUserFromGroupChat
}