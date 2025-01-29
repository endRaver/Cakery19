import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import fs from "fs";
import cron from "node-cron";

import { clerkMiddleware } from "@clerk/express";

import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/socket.js";
import { app, httpServer } from "./lib/socket.js";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import statRoutes from "./routes/stat.route.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT;

initializeSocket();

app.use(
  cors({
    origin: "http://localhost:3000", // frontend Url
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);

// cron jobs | run once a day
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 0 * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {
          if (err) console.error(err);
        });
      }
    });
  }
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stats", statRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// error handle
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

httpServer.listen(5000, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
