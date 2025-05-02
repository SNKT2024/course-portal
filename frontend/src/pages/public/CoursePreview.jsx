// src/pages/CoursePreview.jsx
"use client";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCoursePreview } from "../../hooks/useCoursePreview";
import CourseSidebar from "../../components/public-course-page/CourseSidebar";
import VideoPlayer from "../../components/public-course-page/VideoPlayer";
import LessonDetails from "../../components/public-course-page/LessonDetails";

export default function CoursePreview() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    course,
    activeLesson,
    isEnrolled,
    loading,
    isFirstLesson,
    isActiveLessonFirst,
    handleLessonClick,
  } = useCoursePreview(courseId, user);

  const handleEnroll = () => {
    if (user) {
      navigate(`/enroll/${courseId}`);
    } else {
      navigate(`/login?redirect=/public-course/${courseId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        Course not found
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100">
      <CourseSidebar
        course={course}
        activeLesson={activeLesson}
        handleLessonClick={handleLessonClick}
        isEnrolled={isEnrolled}
        isFirstLesson={isFirstLesson}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <VideoPlayer
          lesson={activeLesson}
          isEnrolled={isEnrolled}
          isFirst={isActiveLessonFirst()}
          user={user}
          courseId={courseId}
          onEnroll={handleEnroll}
        />
        {!isEnrolled && (
          <div className="p-4 bg-white border-t flex justify-center">
            {user ? (
              <button
                onClick={handleEnroll}
                className="bg-black text-white px-6 py-2 rounded-md shadow-md"
              >
                Enroll Now
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                className="bg-black hover:bg-white  hover:text-black text-white px-6 py-2 rounded-md shadow-md"
              >
                Login to Enroll
              </button>
            )}
          </div>
        )}

        {activeLesson && <LessonDetails lesson={activeLesson} />}
      </div>
    </div>
  );
}
