import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("product route");
});

export default router;
