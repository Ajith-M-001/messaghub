import User from "../model/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const newUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const avatar = req.file;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      password: hashedPassword,
      // avatar: {
      //   public_id: avatar?.filename,
      //   url: avatar?.path,
      // },
    });

    const savedUser = await user.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    console.log(user);

    if (!user) {
      return next(new Error("Invalid username or password"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const token = generateToken({ userId: user._id });

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure flag in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
      })
      .json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
  }
};

export const getMyProfile = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.userId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("access_token")
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (req, res) => {
  try {
    const { user } = req.query;
    const users = await User.find({
      username: { $regex: user, $options: "i" },
    });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
  }
};
