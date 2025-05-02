import { useEffect, useState } from "react";

export const useCoursePreview = (courseId, user) => {
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const isFirstLesson = (sectionIndex, lessonIndex) =>
    sectionIndex === 0 && lessonIndex === 0;

  const isActiveLessonFirst = () =>
    course && course.sections?.[0]?.lessons?.[0]?._id === activeLesson?._id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/course/${courseId}`);
        const data = await res.json();
        if (res.ok) {
          setCourse(data.data);
          const firstLesson = data.data.sections?.[0]?.lessons?.[0];
          setActiveLesson(firstLesson || null);
        }

        if (user) {
          const enrollRes = await fetch(
            `http://localhost:3000/api/enroll/check/${courseId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const enrollData = await enrollRes.json();
          setIsEnrolled(enrollData.success);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, user]);

  const handleLessonClick = (lesson, sectionIndex, lessonIndex) => {
    if (isEnrolled || isFirstLesson(sectionIndex, lessonIndex)) {
      setActiveLesson(lesson);
    }
  };

  return {
    course,
    activeLesson,
    isEnrolled,
    loading,
    setActiveLesson,
    isFirstLesson,
    isActiveLessonFirst,
    handleLessonClick,
  };
};
