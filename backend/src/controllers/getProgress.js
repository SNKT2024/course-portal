import Progress from "../models/Progress.js";

const getProgress = async (req, res) => {
  const course = req.params.courseId;
  const student = req.user.id;

  try {
    const progress = await Progress.findOne({ student, course });

    if (!progress) {
      return res.status(404).json({ msg: "Not found" });
    }

    const completed = progress.completedLessons;
    console.log(completed);

    return res.status(200).json({ success: true, completed });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default getProgress;
