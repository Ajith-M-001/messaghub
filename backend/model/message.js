import mongoose from "mongoose";

// Define the schema for the Message model
const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true, // Message content must be provided
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (sender of the message)
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat", // Reference to the Chat model (chat to which the message belongs)
      required: true,
    },
    attachments: [
      {
        public_id: {
          type: String, // Cloudinary's unique identifier for the uploaded image
          required: false, // Avatar is optional
        },
        url: {
          type: String, // The URL for the avatar image from Cloudinary
          required: false, // Avatar URL is optional
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create and export the Message model
const Message = mongoose.model("Message", messageSchema);

export default Message;
