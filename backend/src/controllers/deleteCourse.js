import Course from "../models/Course.js";

const deleteCourse = async (req, res) => {
  const teacher_id = req.user.id;
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    if (course.teacher.toString() !== teacher_id) {
      return res
        .status(403)
        .json({ msg: "Unauthorized to delete this course" });
    }

    await course.deleteOne();

    return res
      .status(200)
      .json({ sucess: true, mesg: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default deleteCourse;
