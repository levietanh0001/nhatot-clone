const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  id: { type: Number, required: true }
}, {
  timestamps: true,
  collection: 'user'
});

const UserCollection = mongoose.model('user', userSchema);

module.exports = UserCollection;