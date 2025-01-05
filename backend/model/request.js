import mongoose from "mongoose";

// Define the schema for the Request model
const requestSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"], // Only these values are allowed for status
      default: "pending", // Default status is pending
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (sender of the request)
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (receiver of the request)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create and export the Request model
const Request = mongoose.model("Request", requestSchema);

export default Request;
