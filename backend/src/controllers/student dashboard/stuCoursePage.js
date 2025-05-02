import mongoose from "mongoose";
import Course from "../../models/Course.js";

const getStuCoursePage = async (req, res) => {
  console.log("REQ PARAMS:", req.params);
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "teacher"
    );
    console.log(course);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Total lessons across all sections
    const totalLessons = course.sections.reduce(
      (sum, section) => sum + section.lessons.length,
      0
    );

    // For now, assuming 0 lessons completed
    const completedLessons = [];
    const progress =
      totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;

    // Format sections and lessons
    const formattedSections = course.sections.map((section, sIndex) => {
      return {
        _id: section._id,
        title: section.title,
        duration: section.duration,
        lessons: section.lessons.map((lesson, lIndex) => {
          const globalLessonIndex =
            course.sections
              .slice(0, sIndex)
              .reduce((acc, sec) => acc + sec.lessons.length, 0) + lIndex;

          return {
            _id: lesson._id,
            title: lesson.title,
            videoUrl: lesson.videoUrl,
            description: lesson.description,
            duration: lesson.duration || "0:00", // fallback if duration missing
            isCompleted: completedLessons.includes(globalLessonIndex),
          };
        }),
      };
    });

    // Construct instructor info
    const instructor = course.teacher
      ? {
          _id: course.teacher._id,
          name: course.teacher.name,
          title: course.teacher.title || "Instructor",
          avatar: course.teacher.avatar || "/placeholder.svg",
        }
      : null;

    res.json({
      _id: course._id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      category: course.category,
      instructor,
      price: course.price,
      sections: formattedSections,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      progress,
      completedLessons,
    });
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ message: "Failed to fetch course details" });
  }
};

export default getStuCoursePage;
