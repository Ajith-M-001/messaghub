import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const adminVerifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Only admins can access this route" });
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedUser.secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res
        .status(401)
        .json({ success: false, message: "Only admins can access this route" });
    }

    req.user = decodedUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Invalid token or Internal Server Error",
    });
  }
};
