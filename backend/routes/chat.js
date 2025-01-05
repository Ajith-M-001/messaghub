import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { newGroupChat, getMyChats } from "../controllers/chat.js";

const router = express.Router();

router.use(verifyToken);

router.post("/new", newGroupChat);
router.get("/my-chats",getMyChats);

export default router;
