import Progress from "../../models/Progress.js";

const getStudentCourseProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ student: req.user.id });

    if (progress.length === 0) {
      return res.status(404).json({ msg: "No progress found" });
    }

    const progressList = progress.map((item) => ({
      courseId: item.course._id,
      courseTitle: item.course.title,
      completedLessons: item.completedLessons,
    }));
    return res.status(200).json({ success: true, progressList });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default getStudentCourseProgress;
