import mongoose from "mongoose";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

const enrollIntoCourse = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    const alreadyEnrolled = await Enrollment.findOne({
      student: new mongoose.Types.ObjectId(studentId),
      course: new mongoose.Types.ObjectId(courseId),
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ msg: "Already enrolled in this course" });
    }

    const enrollment = new Enrollment({ student: studentId, course: courseId });

    await enrollment.save();

    return res.status(200).json({ msg: "Enrollment successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default enrollIntoCourse;
