import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./lib/db.js";
// routes
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import songsRoute from "./routes/songs.route.js";
import albumsRoute from "./routes/albums.route.js";
import statsRoute from "./routes/stats.route.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json()); // to parse req.body
app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  })
);

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/songs", songsRoute);
app.use("/api/albums", albumsRoute);
app.use("/api/stats", statsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  connectDB();
});
