import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import User from "../model/user.js";

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

const createUser = async (numUsers) => {
  try {
    // Establish a connection to MongoDB
    await connectDB();

    const users = [];

    for (let i = 0; i < numUsers; i++) {
      const user = new User({
        name: faker.person.fullName(),
        username: faker.internet.displayName(),
        password: "password", // Consider hashing the password before saving
        bio: faker.lorem.sentence(10),
        avatar: {
          public_id: faker.system.fileName(),
          url: faker.image.avatar(),
        },
      });
      users.push(user);
    }

    await User.insertMany(users);
    console.log(`${numUsers} users created successfully.`);
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
createUser(10); // Replace 10 with the number of users you want to create
