import express from "express";
import authMiddleware, { isStudent } from "../middleware/authMiddleware.js";
import enrollIntoCourse from "../controllers/enrollIntoCourse.js";
import getEnrolletCourses from "../controllers/getEnrolledCourse.js";
import checkEnrollment from "../controllers/checkEnrollment.js";

const router = express.Router();

router.post("/:courseId", authMiddleware, enrollIntoCourse);
router.get("/student/my-course", getEnrolletCourses);
router.get("/check/:courseId", authMiddleware, checkEnrollment);

export default router;
