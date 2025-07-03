import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import AddLessonModal from "./AddLessonModal";
import EditLessonModal from "./EditLessonModal";
import { Label } from "@/components/ui/label";

export default function AddSections() {
  const { courseId } = useParams();
  const [sections, setSections] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const token = localStorage.getItem("token");
  const [editingTitles, setEditingTitles] = useState({});
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const fetchCourseData = async () => {
      setFetchLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/course/${courseId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.msg || "Failed to fetch course data");
        }
        const { data: courseData } = await res.json();
        setCourse(courseData);
        setSections(courseData.sections || []);
        setEditingTitles(
          Object.fromEntries(
            (courseData.sections || []).map((s) => [s._id, s.title])
          )
        );
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleAddSection = async () => {
    if (!sectionTitle.trim()) {
      alert("Section title cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/course/create-section/${courseId}/sections`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ title: sectionTitle }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const newSection = { ...data.createdSection, lessons: [] };
        setSections((prev) => [...prev, newSection]);
        setEditingTitles((prev) => ({
          ...prev,
          [newSection._id]: newSection.title,
        }));
        setSectionTitle("");
        alert("Section added successfully.");
      } else {
        alert(data.msg || "Failed to add section");
      }
    } catch (error) {
      alert("Error adding section", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm("Delete this section?")) return;

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/course/${courseId}/sections/${sectionId}`,
        {
          method: "DELETE",
          headers: { Authorization: token },
        }
      );
      const data = await res.json();

      if (res.ok) {
        setSections((prev) => prev.filter((s) => s._id !== sectionId));
        setEditingTitles((prev) => {
          const updated = { ...prev };
          delete updated[sectionId];
          return updated;
        });
        alert("Section deleted");
      } else {
        alert(data.msg || "Failed to delete section");
      }
    } catch (err) {
      alert("Error deleting section", err);
    }
  };

  const handleEditSection = async (sectionId) => {
    const newTitle = editingTitles[sectionId];
    if (!newTitle.trim()) {
      alert("Section title cannot be empty!");
      return;
    }

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/course/${courseId}/sections/${sectionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ title: newTitle }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setSections((prev) =>
          prev.map((section) =>
            section._id === sectionId
              ? { ...section, title: newTitle }
              : section
          )
        );
        alert("Section updated successfully.");
      } else {
        alert(data.msg || "Failed to update section");
      }
    } catch (error) {
      alert("Error editing section", error);
    }
  };

  if (fetchLoading) return <div>Loading course data...</div>;
  if (fetchError) return <div>Error: {fetchError}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Add/Edit Sections and Lessons</h1>
      <h1 className="text-2xl text-center font-bold">{course.title}</h1>

      <div className="flex gap-4">
        <Input
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          placeholder="Section Title"
        />
        <Button onClick={handleAddSection} disabled={loading}>
          {loading ? "Adding..." : "Add Section"}
        </Button>
      </div>

      {sections.map((section) => (
        <Card key={section._id} className="mt-4">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="flex-1 mr-4">
              <Input
                value={editingTitles[section._id] || ""}
                onChange={(e) =>
                  setEditingTitles((prev) => ({
                    ...prev,
                    [section._id]: e.target.value,
                  }))
                }
                placeholder="Edit Section Title"
              />
            </CardTitle>
            <div className="space-x-2 flex-shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditSection(section._id)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-500"
                onClick={() => handleDeleteSection(section._id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-4">
            <AddLessonModal section={section} setSections={setSections} />
            {section.lessons?.length > 0 ? (
              <ul className="list-disc ml-6 space-y-1">
                {section.lessons.map((lesson) => (
                  <li
                    key={lesson._id}
                    className="flex justify-between items-center"
                  >
                    <span>{lesson.title}</span>
                    <div className="space-x-2 flex items-center">
                      <EditLessonModal
                        lesson={lesson}
                        sectionId={section._id}
                        courseId={courseId}
                        onUpdate={(updatedLesson) =>
                          setSections((prevSections) =>
                            prevSections.map((s) =>
                              s._id === section._id
                                ? {
                                    ...s,
                                    lessons: s.lessons.map((l) =>
                                      l._id === updatedLesson._id
                                        ? updatedLesson
                                        : l
                                    ),
                                  }
                                : s
                            )
                          )
                        }
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500"
                        onClick={async () => {
                          if (!window.confirm("Delete this lesson?")) return;
                          try {
                            const res = await fetch(
                              `${
                                import.meta.env.VITE_API_BASE_URL
                              }/api/course/${courseId}/sections/${
                                section._id
                              }/lessons/${lesson._id}`,
                              {
                                method: "DELETE",
                                headers: {
                                  Authorization: token,
                                },
                              }
                            );
                            const data = await res.json();
                            if (res.ok) {
                              setSections((prevSections) =>
                                prevSections.map((s) =>
                                  s._id === section._id
                                    ? {
                                        ...s,
                                        lessons: s.lessons.filter(
                                          (l) => l._id !== lesson._id
                                        ),
                                      }
                                    : s
                                )
                              );
                              alert("Lesson deleted");
                            } else {
                              alert(data.msg || "Failed to delete lesson");
                            }
                          } catch (err) {
                            alert("Error deleting lesson", err);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground italic">
                No lessons added yet.
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
