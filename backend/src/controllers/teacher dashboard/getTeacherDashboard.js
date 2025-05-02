import jwt from "jsonwebtoken";
import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";
import mongoose from "mongoose";

// Utility function to get the month-year string
const getMonthYear = (date) => {
  const month = date.getMonth() + 1; // Months are 0-indexed in JS
  const year = date.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month}`;
};

export const getTeacherDashboard = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const teacherId = decoded.id;

    // Get all courses by teacher
    const courses = await Course.find({ teacher: teacherId });

    if (courses.length === 0) {
      return res.status(404).json({ msg: "No courses found for this teacher" });
    }

    const courseIds = courses.map((course) => course._id);

    // Get all enrollments for those courses
    const enrollments = await Enrollment.find({
      course: { $in: courseIds },
    }).populate("course"); // Populate course to get course details like price

    // Total number of courses
    const totalCourses = courses.length;

    // Total revenue (sum of course.price * number of enrollments in that course)
    const courseIdToPriceMap = {};
    courses.forEach((course) => {
      courseIdToPriceMap[course._id.toString()] = course.price || 0;
    });

    // Calculate total revenue and revenue per course
    let totalRevenue = 0;
    const revenueByCourse = courses.map((course) => {
      const enrollmentsForCourse = enrollments.filter(
        (e) => e.course._id.toString() === course._id.toString()
      );
      const revenue = enrollmentsForCourse.length * course.price;
      totalRevenue += revenue;

      return {
        course: course.title,
        revenue,
      };
    });

    // Calculate revenue by month
    const revenueOverTime = enrollments.reduce((acc, enrollment) => {
      const courseId = enrollment.course._id.toString();
      const coursePrice = courseIdToPriceMap[courseId] || 0;
      const revenue = coursePrice;

      const monthYear = getMonthYear(enrollment.enrolledAt);

      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear] += revenue;

      return acc;
    }, {});

    // Convert revenueOverTime to array for chart use
    const revenueOverTimeArray = Object.keys(revenueOverTime).map(
      (monthYear) => ({
        month: monthYear,
        revenue: revenueOverTime[monthYear],
      })
    );

    // Total unique students
    const uniqueStudentIds = new Set(
      enrollments.map((e) => e.student.toString())
    );
    const totalStudents = uniqueStudentIds.size;

    return res.status(200).json({
      totalCourses,
      totalStudents,
      revenue: totalRevenue,
      revenueOverTime: revenueOverTimeArray,
      revenueByCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
