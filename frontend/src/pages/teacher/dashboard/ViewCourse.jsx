"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, Play, CheckCircle, Lock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import ReactPlayer from "react-player";

export default function CourseViewer() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/api/course/${courseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setCourse(data.data);
          // Set the first lesson as active by default
          if (
            data.data.sections.length > 0 &&
            data.data.sections[0].lessons.length > 0
          ) {
            setActiveLesson(data.data.sections[0].lessons[0]);
          }
        } else {
          console.error("Error:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleSelectLesson = (lesson) => {
    setActiveLesson(lesson);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading course...
      </div>
    );
  if (!course)
    return (
      <div className="flex items-center justify-center h-screen">
        Course not found
      </div>
    );

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Left sidebar - Course sections and lessons */}
      <div className="w-1/3 max-w-md border-r border-slate-200 bg-white overflow-y-auto">
        <div className="p-4 bg-slate-800 text-white">
          <h1 className="text-xl font-bold truncate">{course.title}</h1>
        </div>

        <div className="p-2">
          {course.sections.map((section, index) => (
            <Collapsible
              key={section._id || index}
              defaultOpen={index === 0}
              className="mb-2"
            >
              <Card className="border-0 shadow-none">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="p-3 bg-slate-50 hover:bg-slate-100 cursor-pointer flex flex-row items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium text-sm">
                        Section {index + 1}: {section.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="text-xs">
                        {section.lessons.length} lessons
                      </span>
                      <ChevronDown className="h-4 w-4 collapsible-chevron" />
                      <ChevronUp className="h-4 w-4 collapsible-chevron hidden" />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="p-0">
                    <ul className="divide-y divide-slate-100">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <li
                          key={lesson._id || lessonIndex}
                          className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50 ${
                            activeLesson && activeLesson._id === lesson._id
                              ? "bg-slate-100"
                              : ""
                          }`}
                          onClick={() => handleSelectLesson(lesson)}
                        >
                          <span className="text-slate-600 text-lg flex-shrink-0">
                            →
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {lesson.title}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Main content - Video player and lesson details */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Video player */}
        <div className="relative bg-black aspect-video">
          {activeLesson ? (
            <div className="w-full h-full flex items-center justify-center">
              <ReactPlayer
                url={activeLesson.videoUrl}
                className="w-full h-full"
                controls
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              Select a lesson to start learning
            </div>
          )}
        </div>

        {/* Lesson details */}
        {activeLesson && (
          <div className="p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2">{activeLesson.title}</h2>
            <Separator className="my-4" />

            <div className="prose max-w-none">
              <h3>About this lesson</h3>
              <p>
                {activeLesson.description ||
                  "In this lesson, you'll learn key concepts and practical techniques that you can apply immediately. Follow along with the video and practice what you learn to master the material."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
