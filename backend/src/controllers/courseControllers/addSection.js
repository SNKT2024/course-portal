import Course from "../../models/Course.js";

export const addSection = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;
    console.log(req.body);

    if (!title) {
      return res
        .status(400)
        .json({ success: false, msg: "Section title is required" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({ success: false, msg: "Course not found" });
    }
    const newSection = { title, lessons: [] };
    course.sections.push(newSection);
    await course.save();

    const createdSection = course.sections[course.sections.length - 1];
    res.status(201).json({ success: true, createdSection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
