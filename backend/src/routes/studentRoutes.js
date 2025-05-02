import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import getStudentEnrolledCourses from "../controllers/student dashboard/getStudentEnrolledCourses.js";
import getStudentCourseProgress from "../controllers/student dashboard/getStudentCourseProgress.js";
import getDashboardCourses from "../controllers/student dashboard/dashboardController.js";
import getCourseById from "../controllers/getCourseById.js";
import getStuCoursePage from "../controllers/student dashboard/stuCoursePage.js";

const router = express.Router();

router.get("/enrolled-course", authMiddleware, getStudentEnrolledCourses);
router.get("/course-progress", authMiddleware, getStudentCourseProgress);
router.get("/dashboard/courses", authMiddleware, getDashboardCourses);
// router.get("/dashboard/courses/:courseId", getDashboardCoursesById);
router.get("/course/:courseId", authMiddleware, getCourseById);
router.get("/courses/:courseId/details", authMiddleware, getStuCoursePage);
export default router;
