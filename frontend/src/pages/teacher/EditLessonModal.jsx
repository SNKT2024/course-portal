import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function EditLessonModal({
  lesson,
  sectionId,
  courseId,
  onUpdate,
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description);
  const [videoUrl, setVideoUrl] = useState(lesson.videoUrl);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim() || !videoUrl.trim()) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/course/${courseId}/sections/${sectionId}/lessons/${lesson._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ title, description, videoUrl }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        onUpdate(data.lesson); // Pass updated lesson back
        setOpen(false);
        alert("Lesson updated successfully.");
      } else {
        alert(data.msg || "Failed to update lesson");
      }
    } catch (error) {
      alert("Error updating lesson", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Edit Lesson</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Lesson Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update Lesson"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
