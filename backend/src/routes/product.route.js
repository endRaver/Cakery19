import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  getSignature,
} from "../controller/product.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/signature", getSignature);
router.get("/:productId", getProductById);

export default router;
