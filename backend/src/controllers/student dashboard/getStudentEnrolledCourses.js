import Enrollment from "../../models/Enrollment.js";

const getStudentEnrolledCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: "67ef986684374082ff966578",
    });

    if (!enrollments) {
      return res.status(404).json({ msg: "No enrolled courses found" });
    }

    const courseList = enrollments.map((e) => e.course);

    return res.status(200).json({
      success: true,
      courseList,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default getStudentEnrolledCourses;
