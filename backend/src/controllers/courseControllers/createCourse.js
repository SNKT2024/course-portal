import Course from "../../models/Course.js";

const createCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "teacher") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { title, description, thumbnail, category, price } = req.body;
    const teacherId = req.user.id;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    const exsistingCourse = await Course.findOne({
      title: title,
      teacher: teacherId,
    });

    if (exsistingCourse) {
      return res.status(409).json({
        success: false,
        msg: "Course already exsist with this title for this teacher",
      });
    }
    const course = new Course({
      title,
      description,
      thumbnail: req.file.path,
      category,
      teacher: teacherId,
      price,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export default createCourse;
