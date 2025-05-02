import React from "react";
import { useParams } from "react-router-dom";
import useCourseId from "../../hooks/useStuCourse";

export default function Sidenav() {
  const { courseId } = useParams();
  const course = useCourseId(courseId);

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="hidden md:block w-80 border-r overflow-hidden flex-shrink-0">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Course Content</h2>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span>
              {course?.sections?.reduce(
                (sum, section) => sum + section.lessons.length,
                0
              ) || 0}{" "}
              lessons
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
