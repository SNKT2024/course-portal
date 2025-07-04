import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./src/routes/auth.js";
import courseRoutes from "./src/routes/courseRoutes.js";

import uploadRoutes from "./src/routes/uploadRoutes.js";
import enrollRoutes from "./src/routes/enrollRoutes.js";
import progressRoutes from "./src/routes/progressRoute.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import teacherRoutes from "./src/routes/teacherRoutes.js";

dotenv.config();
const app = express();
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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo DB Connected"))
  .catch((err) => console.error(err + "Mongo DB connection error"));

app.get("/", (req, res) => {
  res.send("LMS backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port: " + PORT));
