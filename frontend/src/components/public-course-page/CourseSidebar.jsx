import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";

export default function CourseSidebar({
  course,
  activeLesson,
  handleLessonClick,
  isEnrolled,
  isFirstLesson,
}) {
  return (
    <div className="w-1/3 max-w-md border-r border-slate-200 bg-white overflow-y-auto">
      <div className="p-4 bg-slate-800 text-white">
        <h1 className="text-xl font-bold truncate">{course.title}</h1>
      </div>

      <div className="p-2">
        {course.sections.map((section, sectionIndex) => (
          <Collapsible key={section._id} defaultOpen={sectionIndex === 0}>
            <Card className="border-0 shadow-none">
              <CollapsibleTrigger className="w-full">
                <CardHeader className="p-3 bg-slate-50 hover:bg-slate-100 flex justify-between items-center">
                  <span className="font-medium text-sm">
                    Section {sectionIndex + 1}: {section.title}
                  </span>
                  <div className="text-slate-500 text-xs">
                    {section.lessons.length} lessons
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="p-0">
                  <ul className="divide-y divide-slate-100">
                    {section.lessons.map((lesson, lessonIndex) => {
                      const active = activeLesson?._id === lesson._id;
                      const locked =
                        !isEnrolled &&
                        !isFirstLesson(sectionIndex, lessonIndex);

                      return (
                        <li
                          key={lesson._id}
                          className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 ${
                            active ? "bg-slate-100" : ""
                          } ${locked ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() =>
                            handleLessonClick(lesson, sectionIndex, lessonIndex)
                          }
                        >
                          {locked ? (
                            <Lock className="h-4 w-4 text-slate-400" />
                          ) : (
                            <span className="text-slate-600 text-lg">→</span>
                          )}
                          <p className="text-sm font-medium truncate">
                            {lesson.title}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
