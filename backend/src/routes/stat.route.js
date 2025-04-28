import { Router } from "express";
import { protectedRoute, adminRoute } from "../middleware/auth.middleware.js";
import { getStats } from "../controllers/stat.controller.js";

const router = Router();

router.get("/", protectedRoute, adminRoute, getStats);

export default router;
