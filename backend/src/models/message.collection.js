const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  content: {
    type: String,
    trim: true
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'chat'
  }
},
  {
    timestamps: true,
    collection: 'message',
  }
)

const MessageCollection = mongoose.model('message', MessageSchema);
module.exports = MessageCollection;