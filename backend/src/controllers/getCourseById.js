import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user?.id || null;
    const course = await Course.findById(courseId)
      .populate("teacher", "name email")
      .select("title description thumbnail category price teacher sections");
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: "Course not found",
      });
    }

    let isEnrolled = false;

    if (userId) {
      const enrollment = await Enrollment.findOne({
        student: userId,
        course: courseId,
      });

      isEnrolled = !!enrollment;
    }

    const courseData = course.toObject();

    if (!isEnrolled) {
      courseData.sections = courseData.sections.map((section, secIdx) => {
        return {
          ...section,
          lessons: section.lessons.map((lesson, lessonIdx) => {
            if (secIdx === 0 && lessonIdx === 0) {
              return lesson; // preview allowed
            }
            const { videoUrl, ...rest } = lesson;
            return {
              ...rest,
              locked: true,
            };
          }),
        };
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Error fetching course",
      error: err.message,
    });
  }
};

export default getCourseById;
