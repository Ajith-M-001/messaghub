import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// MongoDB connection function
const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose and the connection URI from .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
