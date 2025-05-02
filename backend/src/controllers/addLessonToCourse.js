import Course from "../models/Course.js";

export const addLessonToCourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: "No video file provided" });
  }

  const videoUrl = req.file.path;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({ msg: "Course not found" });
    }

    course.lessons.push({
      title,
      description,
      videoUrl,
    });

    await course.save();

    res.status(200).json({
      success: true,
      msg: "Lesson added successfully",
      course,
    });
  } catch (error) {
    console.error("Error adding lesson: ", error);
    res
      .status(500)
      .json({ success: false, msg: "Server Error", error: error.message });
  }
};
