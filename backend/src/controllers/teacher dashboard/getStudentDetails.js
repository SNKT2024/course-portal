import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";

const getStudentDetails = async (req, res) => {
  try {
    // Total number of students enrolled across all courses
    const totalEnrollments = await Enrollment.countDocuments();

    // Get student count per course
    const courseEnrollments = await Course.aggregate([
      {
        $lookup: {
          from: "enrollments",
          localField: "_id",
          foreignField: "course",
          as: "enrollments",
        },
      },
      {
        $project: {
          title: 1,
          studentCount: { $size: "$enrollments" },
        },
      },
    ]);

    return res.status(200).json({
      totalEnrollments,
      courseEnrollments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
export default getStudentDetails;
