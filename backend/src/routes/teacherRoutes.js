import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getCoursesByTeacher } from "../controllers/teacher dashboard/getTeacherCourses.js";
import getStudentDetails from "../controllers/teacher dashboard/getStudentDetails.js";
import { getTeacherDashboard } from "../controllers/teacher dashboard/getTeacherDashboard.js";

const router = express.Router();

// Get Teacher Dashboard - Tota Course, Students and Revenue

router.get("/get-teacher-dashboard", authMiddleware, getTeacherDashboard);

// Get Student List per course

router.get("/get-student-details", authMiddleware, getStudentDetails);

export default router;
