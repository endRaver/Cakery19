import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "../controller/product.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.post("/category", getProductsByCategory);


export default router;
