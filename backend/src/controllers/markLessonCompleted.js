import Progress from "../models/Progress.js";

const markLessonCompleted = async (req, res) => {
  const { lessonId, courseId } = req.body;
  const studentId = req.user.id;

  try {
    let progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    if (progress) {
      if (progress.completedLessons.includes(lessonId)) {
        return res.status(200).json({ msg: "Lesson already completed" });
      }

      progress.completedLessons.push(lessonId);
      await progress.save();
      return res.status(200).json({ msg: "Lesson marked as completed" });
    }

    const newProgress = new Progress({
      student: studentId,
      course: courseId,
      completedLessons: [lessonId],
    });

    await newProgress.save();
    return res
      .status(200)
      .json({ msg: "Progress created and lesson marked completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

export default markLessonCompleted;
