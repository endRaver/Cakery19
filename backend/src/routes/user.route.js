import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getMessages,
  sendMessage,
} from "../controller/user.controller.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);
router.post("/messages/:userId", protectRoute, sendMessage);

export default router;
