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
  renameGroup,
  deleteChat,
  getMessages,
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
router.get('/message/:id', getMessages);
router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default router;
