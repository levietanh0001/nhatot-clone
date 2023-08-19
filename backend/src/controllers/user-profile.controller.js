const UserProfile = require("../models/user-profile.model");


async function getUserProfile(req, res, next) {

  const userId = req.params['userId'];

  const userProfile = await UserProfile.findOne({ where: { userId } });

  return res.status(200).json(userProfile);

}




module.exports = {
  getUserProfile
}