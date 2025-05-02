import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import deleteCourse from "../controllers/deleteCourse.js";
import createCourse from "../controllers/courseControllers/createCourse.js";

import getAllCourses from "../controllers/getAllCourses.js";
import { addSection } from "../controllers/courseControllers/addSection.js";
import { addLesson } from "../controllers/courseControllers/addLesson.js";
import getCourseById from "../controllers/getCourseById.js";
import {
  editSection,
  deleteSection,
  editLesson,
  deleteLesson,
} from "../controllers/courseControllers/editDeleteSectionLesson.js";
import { getCoursesByTeacher } from "../controllers/teacher dashboard/getTeacherCourses.js";
import { editCourseDetails } from "../controllers/courseControllers/editCourseDetails.js";
import thumbnailUpload from "../middleware/thumbnailUpload.js";
import upload from "../middleware/cloudinaryUpload.js";
const router = express.Router();

// Course Routes
router.post(
  "/create",
  authMiddleware,
  thumbnailUpload.single("thumbnail"),
  createCourse
); // create course
router.delete("/delete-course/:id", authMiddleware, deleteCourse); // delete course
router.put(
  "/edit-course/:courseId",
  authMiddleware,
  upload.none(),
  editCourseDetails
);
// edit course basic details

// Section Routes
router.post("/create-section/:courseId/sections", addSection); // add section
router.put("/:courseId/sections/:sectionId", authMiddleware, editSection);
router.delete("/:courseId/sections/:sectionId", authMiddleware, deleteSection);

//  Lesson Routes
router.post(
  "/create-lesson/:courseId/sections/:sectionId/add-lessons",
  addLesson
); // add lesson
router.put(
  "/:courseId/sections/:sectionId/lessons/:lessonId",
  authMiddleware,
  editLesson
);
router.delete(
  "/:courseId/sections/:sectionId/lessons/:lessonId",
  authMiddleware,
  deleteLesson
);

router.get("/teacher-courses", authMiddleware, getCoursesByTeacher);
router.get("/all-courses", getAllCourses);
router.get("/:courseId", getCourseById);
export default router;
