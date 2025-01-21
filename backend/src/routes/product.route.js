import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  getSignature,
} from "../controller/product.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.get("/signature", getSignature);

export default router;
