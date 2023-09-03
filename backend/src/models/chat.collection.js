const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ChatSchema = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean },
    users: [
      { 
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: 'message',
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  {
    timestamps: true, // include createdAt field
    collection: 'chat'
  }
)


const ChatCollection = mongoose.model('chat', ChatSchema);
module.exports = ChatCollection;