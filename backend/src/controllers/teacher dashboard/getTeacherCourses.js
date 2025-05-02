import jwt from "jsonwebtoken";
import Course from "../../models/Course.js";

// Controller to fetch courses for a teacher by decoding JWT
export const getCoursesByTeacher = async (req, res) => {
  const token = req.headers.authorization; // Assuming the token is passed in Authorization header as "Bearer token"

  if (!token) {
    return res.status(400).json({ msg: "No token provided" });
  }

  try {
    // Decode the JWT to get the teacher's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same secret key as in your JWT creation
    const teacherId = decoded.id; // Assuming the teacher's ID is stored as 'id' in the token payload

    // Fetch courses for the teacher
    const courses = await Course.find({ teacher: teacherId });

    // Check if courses exist for the teacher
    if (courses.length === 0) {
      return res.status(404).json({ msg: "No courses found for this teacher" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
