import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

export default function AddLessonModal({ section, setSections }) {
  const { courseId } = useParams();

  const [open, setOpen] = useState(false);
  const [lessonData, setLessonData] = useState({
    title: "",
    description: "",
    videoFile: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleLessonChange = (e) => {
    setLessonData({ ...lessonData, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    setLessonData({ ...lessonData, videoFile: e.target.files[0] });
  };

  const handleAddLesson = async () => {
    if (!lessonData.videoFile) {
      alert("Please upload a video!");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("video", lessonData.videoFile);

      const uploadRes = await axios.post(
        "http://localhost:3000/api/upload/video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );

      const videoUrl = uploadRes.data.videoUrl.replace(/^"(.*)"$/, "$1");

      const res = await fetch(
        `http://localhost:3000/api/course/create-lesson/${courseId}/sections/${section._id}/add-lessons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: lessonData.title,
            description: lessonData.description,
            videoUrl,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const updatedSection = data.course.sections.find(
          (s) => s._id === section._id
        );
        const newLesson = updatedSection?.lessons.slice(-1)[0];

        if (newLesson) {
          setSections((prevSections) =>
            prevSections.map((s) =>
              s._id === section._id
                ? { ...s, lessons: [...(s.lessons || []), newLesson] }
                : s
            )
          );
          setOpen(false);
          setLessonData({ title: "", description: "", videoFile: null });
        } else {
          alert("Error: New lesson not found in response.");
        }
      } else {
        alert(data.msg || "Failed to add lesson");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload lesson.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Lesson</Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogTitle />
        <h2 className="text-xl font-bold mb-4">Add New Lesson</h2>
        <div className="space-y-4">
          <Input
            name="title"
            placeholder="Lesson Title"
            value={lessonData.title}
            onChange={handleLessonChange}
          />
          <Textarea
            name="description"
            placeholder="Lesson Description"
            value={lessonData.description}
            onChange={handleLessonChange}
          />
          <Input type="file" accept="video/*" onChange={handleVideoChange} />

          {isUploading && <Progress value={uploadProgress} className="h-2" />}

          <Button onClick={handleAddLesson} disabled={isUploading}>
            {isUploading
              ? `Uploading... ${uploadProgress}%`
              : "Upload & Add Lesson"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
