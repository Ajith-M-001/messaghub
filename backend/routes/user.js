import express from "express";
import {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  getMyNotifications,
  getMyFriends,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/new", singleAvatar, newUser);
router.post("/login", login);
router.get("/get-my-profile", verifyToken, getMyProfile);
router.get("/logout", verifyToken, logout);
router.get("/search", verifyToken, searchUser);
router.put("/send-request", verifyToken, sendFriendRequest);
router.get("/notifications", verifyToken, getMyNotifications);
router.get("/getMyFriend", verifyToken, getMyFriends);

export default router;
