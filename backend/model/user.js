import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Ensures the name has no extra spaces
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensures unique username
      trim: true, // Ensures the username has no extra spaces
      minlength: 3, // Optional: Ensures a minimum length for the username
      maxlength: 20, // Optional: Ensures a maximum length for the username
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Optional: Enforces a minimum length for the password
      select: false,
    },
    avatar: {
      public_id: {
        type: String, // Cloudinary's unique identifier for the uploaded image
        required: false, // Avatar is optional
      },
      url: {
        type: String, // The URL for the avatar image from Cloudinary
        required: false, // Avatar URL is optional
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create and export the User model
const User = mongoose.model("User", userSchema);

export default User;
