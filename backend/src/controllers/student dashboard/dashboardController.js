import Enrollment from "../../models/Enrollment.js";
import Progress from "../../models/Progress.js";

const getDashboardCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user.id,
    }).populate("course");

    const dashBoardCourses = [];

    for (const course of enrollments) {
      const courseDetails = course.course;
      const totalLessons = courseDetails.sections?.reduce((acc, section) => {
        return acc + (section.lessons?.length || 0);
      }, 0);

      const progress = await Progress.findOne({
        student: req.user.id,
        course: course.course._id,
      });

      const completed = progress ? progress.completedLessons.length : 0;
      const percentage = totalLessons
        ? Math.round((completed / totalLessons) * 100)
        : 0;

      dashBoardCourses.push({
        _id: course.course._id,
        title: course.course.title,
        thumbnail: course.course.thumbnail,
        totalLessons,
        completedLessons: completed,
        progressPercentage: percentage,
      });
    }

    return res.status(200).json({ success: true, dashBoardCourses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default getDashboardCourses;
