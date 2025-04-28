import { Router } from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getMessages,
  sendMessage,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectedRoute, getAllUsers);
router.get("/messages/:userId", protectedRoute, getMessages);
router.post("/messages/:userId", protectedRoute, sendMessage);

export default router;
