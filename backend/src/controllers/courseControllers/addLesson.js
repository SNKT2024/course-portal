import Course from "../../models/Course.js";

export const addLesson = async (req, res) => {
  try {
    const { courseId, sectionId } = req.params;
    const { title, videoUrl, description } = req.body;

    if (!title || !videoUrl) {
      return res.status(400).json({
        success: false,
        msg: "Lesson title and video URL are required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, msg: "Course not found" });
    }

    const section = course.sections.id(sectionId);

    if (!section) {
      return res.status(404).json({ success: false, msg: "Section not found" });
    }
    console.log("Received Lesson Data:", {
      title,
      videoUrl,
      description,
    });

    section.lessons.push({ title, videoUrl, description });

    await course.save();

    res.status(201).json({ success: true, course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
