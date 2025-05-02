import mongoose from "mongoose";
import Course from "../models/Course.js";

const getMyCourses = async (req, res) => {
  const teacher_id = req.user.id;
  if (!teacher_id) {
    return res.status(404).json({ msg: "User not found" });
  }
  try {
    const course = await Course.find({ teacher: teacher_id });

    if (!course || course.length === 0) {
      return res.status(404).json({ msg: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error: ", err });
  }
};

export default getMyCourses;
