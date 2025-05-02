import mongoose from "mongoose";
import Enrollment from "../models/Enrollment.js";

const checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const enrollment = await Enrollment.findOne({
      student: new mongoose.Types.ObjectId(userId),
      course: new mongoose.Types.ObjectId(courseId),
    });

    enrollment
      ? res.status(200).json({ success: true, msg: "Already Enrolled" })
      : res.json({ success: false, msg: "Not Enrolled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export default checkEnrollment;
