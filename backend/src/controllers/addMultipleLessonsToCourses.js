import Course from "../models/Course.js";

export const addMultipleLessonsToCourse = async (req, res) => {
  const { courseId } = req.params;
  const { lessons } = req.body;
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ success: true, msg: "No videos uploaded" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, msg: "Course not find" });
    }

    const parsedLessons = JSON.parse(lessons);

    if (parsedLessons.length !== files.length) {
      return res
        .status(400)
        .json({ success: false, msg: "Mismatch in lessons and videos count" });
    }

    for (let i = 0; i < parsedLessons.length; i++) {
      course.lessons.push({
        title: parsedLessons[i].title,
        description: parsedLessons[i].description,
        videoUrl: files[i].path,
      });
    }

    await course.save();

    res.status(200).json({
      success: true,
      msg: "All lessons added successfully",
    });
  } catch (err) {
    console.error("Error uploading lessons:", err);
    res
      .status(500)
      .json({ success: false, msg: "Server Error", error: err.message });
  }
};
