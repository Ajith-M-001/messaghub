import mongoose from "mongoose";

// Define the schema for the Chat model
const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    groupChat: {
      type: Boolean,
      default: false, // By default, chat will not be a group chat
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (creator of the chat)
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model (members of the chat)
      },
    ],
  },

  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create and export the Chat model
const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
