// Import necessary modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
import adminRouter from "./routes/admin.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Use userRouter for routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/admin", adminRouter);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(errorMiddleware);

// Create a function to start the server after the DB is connected
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start the server on a port from environment variables
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1); // Exit the process if there's an error
  }
};

// Start the server
startServer();
