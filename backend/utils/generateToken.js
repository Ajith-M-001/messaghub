import jwt from "jsonwebtoken";
import User from "../model/user.js";

const generateToken = ({ userId }) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "12h" } // Token expires in 12 hours
  );
};
const generateAdminToken = ({ secretKey }) => {
  return jwt.sign(
    { secretKey },
    process.env.JWT_SECRET,
    { expiresIn: "12h" } // Token expires in 12 hours
  );
};

const socketAuthticator = async (err, socket, next) => {
  try {
    if (err) {
      return next(err);
    }

    const authToken = socket.request.cookies.access_token;
    if (!authToken) {
      console.log("Authentication error");
      // return next(new Error("Authentication error"));
    }
    const decodedUser = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedUser.userId);
    if (!user) {
      console.log("user not found");
      // return next(new Error("Authentication error"));
    }
    socket.user = user;
    next();
  } catch (error) {
    console.log(error);
    // return next(new Error("Authentication error"));
  }
};

export { generateToken, generateAdminToken, socketAuthticator };
