import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import markLessonCompleted from "../controllers/markLessonCompleted.js";
import getProgress from "../controllers/getProgress.js";

const router = express.Router();

router.post("/complete", authMiddleware, markLessonCompleted);
router.get("/:courseId", authMiddleware, getProgress);

export default router;
