import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./src/config/db.js";

import authRoutes from "./src/routes/auth.js";
import courseRoutes from "./src/routes/courseRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import enrollRoutes from "./src/routes/enrollRoutes.js";
import progressRoutes from "./src/routes/progressRoute.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import teacherRoutes from "./src/routes/teacherRoutes.js";

dotenv.config();
const app = express();

console.log("📦 Initializing Express App");

await connectToDatabase();
console.log("✅ Mongo Connected");

const allowedOrigins = [
  "https://course-portal-frontend-alpha.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  console.log("⚡ GET / hit");
  res.send("LMS backend is running");
});
app.get("/api/test", (req, res) => {
  console.log("🔥 /api/test hit");
  res.send("Test route OK");
});

app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);

export default app;
