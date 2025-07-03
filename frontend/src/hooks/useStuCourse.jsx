import { useState } from "react";
import { useEffect } from "react";

const useStuCourse = (studentId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/student/dashboard/courses`
        );

        if (!res.ok) {
          throw new Error(`Response status:${res.status}`);
        }

        const json = await res.json();

        setData(json.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchCourses();
    }
  }, [studentId]);

  const getCourseById = async (courseId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/student/course/${courseId}`
      );
      if (!res.ok) throw new Error(`Response status: ${res.status}`);
      const courseDetails = await res.json();
      return courseDetails;
    } catch (err) {
      console.error(`Error fetching course ${courseId}: `, err);
      return null;
    }
  };

  return { data, loading, getCourseById };
};

export default useStuCourse;
