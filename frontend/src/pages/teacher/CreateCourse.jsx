import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const predefinedCategories = [
  "Academics",
  "Professional Skills",
  "IT & Software",
  "Creativity",
  "Health",
  "Personal Growth",
  "Language",
  "Business",
];

export default function CreateCourse() {
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", courseDetails.title);
    form.append("description", courseDetails.description);
    form.append("price", courseDetails.price);
    form.append("category", courseDetails.category);
    if (thumbnailFile) {
      form.append("thumbnail", thumbnailFile);
    }

    setIsUploading(true);
    setUploadProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/course/create");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      const data = JSON.parse(xhr.responseText);
      if (xhr.status === 201) {
        navigate(`/dashboard-teacher/create-course/${data._id}/add-sections`);
      } else {
        alert(data.message || "Error creating course");
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      alert("Upload failed. Please try again.");
    };

    xhr.send(form);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Course Title"
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Course Description"
          onChange={handleChange}
          required
        />
        <Input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
        />
        <div className="space-y-2">
          <Label
            htmlFor="category"
            className="text-sm font-medium text-gray-700"
          >
            Category
          </Label>
          <Select
            value={courseDetails.category}
            onValueChange={(value) =>
              setCourseDetails({ ...courseDetails, category: value })
            }
          >
            <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {predefinedCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          required
        />
        {isUploading && (
          <div>
            <p className="text-sm mb-2 text-gray-600">Uploading image...</p>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Create Course"}
        </Button>
      </form>
    </div>
  );
}
