import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  newGroupChat,
  getMyChats,
  getMyGroup,
  addMembers,
  removeMembers,
  leaveGroup,
  sendAttachments,
  getChatDetails,
} from "../controllers/chat.js";
import { attachmentMulter } from "../middlewares/multer.js";

const router = express.Router();

router.use(verifyToken);

router.post("/new", newGroupChat);
router.get("/my-chats", getMyChats);
router.get("/my-group", getMyGroup);
router.put("/add-member", addMembers);
router.put("/remove-member", removeMembers);
router.delete("/leave/:id", leaveGroup);
router.post("/message", attachmentMulter, sendAttachments);
router.route("/:id").get(getChatDetails).put().delete();

export default router;
