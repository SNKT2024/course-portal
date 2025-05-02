import Course from "../models/Course.js";

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teacher", "name email")
      .select("title description thumbnail category price teacher");

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error fetching course",
      error: err.message,
    });
  }
};

export default getAllCourses;
