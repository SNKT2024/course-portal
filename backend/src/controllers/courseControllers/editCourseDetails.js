import Course from "../../models/Course.js";

export const editCourseDetails = async (req, res) => {
  const { title, description, category, price, thumbnail } = req.body;

  if (!title || !description) {
    return res.status(400).json({ msg: "Title and descrition are required" });
  }

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.courseId,
      { title, description, category, price, thumbnail },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ msg: "Course not found" });
    }

    res.status(200).json({ msg: "Course updated", data: updatedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to update course", error: error.message });
  }
};
