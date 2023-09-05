const ChatCollection = require("../models/chat.collection");
const MessageCollection = require("../models/message.collection");
const UserCollection = require("../models/user.collection");


async function sendMessage(req, res, next) {

  try {
    
    const chatId = req.body['chatId'];
    const message = req.body['message'];
    console.log({ body: req.body, chatId });
  
    if(!chatId || !message) {
      return res.status(422).json({
        error: 'INVALID_DATA',
        message: 'Invalid data for sending a message'
      });
    }
    
    const currentUser = await UserCollection.findOne({
      id: req.user.id
    })

    let createdMessage = await MessageCollection.create({
      sender: currentUser._id, content: message, chat: chatId
    })
    
    createdMessage = await MessageCollection
                           .findById(createdMessage._id)
                           .populate('sender')
                          //  .populate('chat');

    createdMessage = await UserCollection.populate(createdMessage, {
      path: 'chat.users',
      select: 'id'
    });

    await ChatCollection.findByIdAndUpdate(
      chatId,
      { latestMessage: createdMessage._id }
    )

    console.log({ createdMessage });

    return res.status(200).json(createdMessage);

  } catch(error) {

    console.error(error);
    return next(error);
  }

}


async function getMessagesFromChat(req, res, next) {
  
  try {
    
    const chatId = req.params['chatId'];
    const limit = req.params['limit'] || null;
    const currentUserId = req.user.id;


    const currentChat = await ChatCollection.findById(chatId).populate('users');
    const currentChatUsers = currentChat.users;
    const isCurrentUserInChat = currentChatUsers.some(user => user.id === currentUserId);

    if(!isCurrentUserInChat) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'User does not have permission to enter specified chat'
      })
    }

    const messages = await MessageCollection.find({
      chat: chatId,
    })
    .sort({ createdAt: 1 })
    .limit(null)
    .populate('sender')
    .populate('chat');
  
    return res.status(200).json(messages ?? []);

  } catch(error) {

    console.error(error);
    return next(error);
  }

}




module.exports = {
  sendMessage,
  getMessagesFromChat,
  // getLatestMessageFromChat
}