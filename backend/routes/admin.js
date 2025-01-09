import express from "express";
import {
  allUsers,
  allChats,
  allMessages,
  getDashBoardStats,
  adminLogin,
  adminLogout,
  getAdminData,
} from "../controllers/admin.js";
import { adminVerifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/verify", adminLogin);

router.get("/logout", adminLogout);

//only admin can login
router.use(adminVerifyToken);
router.get("/", getAdminData);

router.get("/users", allUsers);

router.get("/chats", allChats);

router.get("/messages", allMessages);

router.get("/stats", getDashBoardStats);

export default router;
