import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
    imageUrls: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Messages", messagesSchema);
export default Message;
