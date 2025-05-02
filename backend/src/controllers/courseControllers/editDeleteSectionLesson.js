import Course from "../../models/Course.js";

// Edit Section
export const editSection = async (req, res) => {
  try {
    const { courseId, sectionId } = req.params;
    const { title, duration } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    const section = course.sections.id(sectionId);
    if (!section) return res.status(404).json({ msg: "Section not found" });

    if (title) section.title = title;
    if (duration) section.duration = duration;

    await course.save();

    res.status(200).json({ msg: "Section updated successfully", section });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while updating section" });
  }
};

// Delete Section
export const deleteSection = async (req, res) => {
  try {
    const { courseId, sectionId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    const sectionIndex = course.sections.findIndex(
      (section) => section._id.toString() === sectionId
    );

    if (sectionIndex === -1)
      return res.status(404).json({ msg: "Section not found" });

    course.sections.splice(sectionIndex, 1);
    await course.save();

    res.status(200).json({ msg: "Section deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while deleting section" });
  }
};

// Edit Lesson
export const editLesson = async (req, res) => {
  try {
    const { courseId, sectionId, lessonId } = req.params;
    const { title, description, videoUrl } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    const section = course.sections.id(sectionId);
    if (!section) return res.status(404).json({ msg: "Section not found" });

    const lesson = section.lessons.id(lessonId);
    if (!lesson) return res.status(404).json({ msg: "Lesson not found" });

    if (title) lesson.title = title;
    if (description) lesson.description = description;
    if (videoUrl) lesson.videoUrl = videoUrl;

    await course.save();

    res.status(200).json({ msg: "Lesson updated successfully", lesson });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while updating lesson" });
  }
};

// Delete Lesson
export const deleteLesson = async (req, res) => {
  try {
    const { courseId, sectionId, lessonId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    const section = course.sections.id(sectionId);
    if (!section) return res.status(404).json({ msg: "Section not found" });

    // Find index of lesson
    const lessonIndex = section.lessons.findIndex(
      (lesson) => lesson._id.toString() === lessonId
    );

    if (lessonIndex === -1)
      return res.status(404).json({ msg: "Lesson not found" });

    // Remove lesson using splice
    section.lessons.splice(lessonIndex, 1);

    await course.save();

    res.status(200).json({ msg: "Lesson deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error while deleting lesson" });
  }
};
