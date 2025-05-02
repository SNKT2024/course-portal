import Course from "../models/Course.js";

const updateCourse = async (req, res) => {
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
        .json({ msg: "You are not authorized to edit course" });
    }

    const { title, description, price } = req.body;

    if (title) course.title = title;
    if (title) course.description = description;
    if (title) course.price = price;

    await course.save();

    return res.status(200).json({ msg: "Course update", course });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error", err });
  }
};

export default updateCourse;
