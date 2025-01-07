import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker, simpleFaker } from "@faker-js/faker";
import User from "../model/user.js";
import Chat from "../model/chat.js";

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

const createSampleChats = async (chatsCount) => {
  try {
    // Establish a connection to MongoDB
    await connectDB();

    const users = await User.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < users.length; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });

      const members = [];
      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];

        if (!members.includes(randomUser._id)) {
          members.push(randomUser._id);
        }
      }

      const chat = await Chat.create({
        name: faker.lorem.word(2),
        members: members,
        groupChat: true,
        creator: members[0],
      });

      chatsPromise.push(chat);
    }

    await Promise.all(chatsPromise);

    console.log(`${chatsCount} chats created successfully.`);
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
createSampleChats(87); // Replace 10 with the number of users you want to create
