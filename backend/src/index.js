import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";

import { connectDB } from "./lib/db.js";
// routes
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import songsRoute from "./routes/songs.route.js";
import albumsRoute from "./routes/albums.route.js";
import statsRoute from "./routes/stats.route.js";

const app = express();
const __dirname = path.resolve();

dotenv.config();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json()); // to parse req.body
app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10mb max file size
    },
  })
);

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/songs", songsRoute);
app.use("/api/albums", albumsRoute);
app.use("/api/stats", statsRoute);

// error handler
app.use((error, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  connectDB();
});
