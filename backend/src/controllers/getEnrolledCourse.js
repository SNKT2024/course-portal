import Enrollment from "../models/Enrollment.js";

const getEnrolletCourses = async (req, res) => {
  try {
    const enrolledCourses = await Enrollment.find({
      student: "67ef986684374082ff966578",
    }).populate("course");

    if (!enrolledCourses || enrolledCourses.length === 0) {
      return res
        .status(404)
        .json({ msg: "No Enrolled Courses found for this user" });
    }

    return res.status(200).json({
      success: true,
      enrolledCourses,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

export default getEnrolletCourses;
