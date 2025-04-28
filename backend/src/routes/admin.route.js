import { Router } from "express";
import { protectedRoute, adminRoute } from "../middleware/auth.middleware.js";
import {
  checkAdmin,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/admin.controller.js";

const router = Router();

router.use(protectedRoute, adminRoute);

router.get("/check", checkAdmin);

router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
