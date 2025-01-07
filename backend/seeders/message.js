import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker, simpleFaker } from "@faker-js/faker";
import User from "../model/user.js";
import Chat from "../model/chat.js";
import Message from "../model/message.js";

// Load environment variables from .env file
dotenv.config({
  path: "../.env",
});
console.log("sdfdsaf", process.env.MONGO_URI);

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

const createSampleMessage = async (chatId, numMessages) => {
  try {
    // Establish a connection to MongoDB
    await connectDB();

    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");

    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];
      const message = await Message.create({
        sender: randomUser._id,
        content: faker.lorem.sentence(),
        chat: chatId,
      });
      messagesPromise.push(message);
    }

    await Promise.all(messagesPromise);

    console.log(`${numMessages} messages created successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Error creating users:", error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
};

// Call the function with the desired number of users
createSampleMessage("677a7c50006d2437c36807f3", 30); // Replace 10 with the number of users you want to create
