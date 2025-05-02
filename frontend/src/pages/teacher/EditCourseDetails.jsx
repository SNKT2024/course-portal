import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function EditCourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/course/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.msg || "Failed to fetch course details");
        }

        const { data } = await res.json();
        setCourseDetails({
          title: data.title || "",
          price: data.price || "",
          description: data.description || "",
          category: data.category || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!courseDetails.title.trim()) return alert("Title is required.");

    const form = new FormData();
    form.append("title", courseDetails.title);
    form.append("price", courseDetails.price);
    form.append("description", courseDetails.description);
    form.append("category", courseDetails.category);

    try {
      setUpdating(true);
      const res = await fetch(
        `http://localhost:3000/api/course/edit-course/${courseId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
          },
          body: form,
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Course updated successfully.");
      } else {
        alert(data.msg || "Failed to update course.");
      }
    } catch (err) {
      alert("Error updating course.", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(
        `http://localhost:3000/api/course/delete-course/${courseId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Course deleted successfully.");
        navigate("/dashboard-teacher");
      } else {
        alert(data.msg || "Failed to delete course.");
      }
    } catch (err) {
      alert("Error deleting course.", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        <span className="ml-2">Loading course details...</span>
      </div>
    );

  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white relative">
      <Button
        onClick={handleDelete}
        className="absolute top-4 right-4 bg-red-600 text-white hover:bg-red-700"
      >
        Delete Course
      </Button>

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Edit Course Details
      </h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="mb-2">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            value={courseDetails.title}
            onChange={handleChange}
            placeholder="Course Title"
            required
          />
        </div>

        <div>
          <Label htmlFor="price" className="mb-2">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={courseDetails.price}
            onChange={handleChange}
            placeholder="Course Price"
          />
        </div>

        <div>
          <Label htmlFor="description" className="mb-2">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={courseDetails.description}
            onChange={handleChange}
            placeholder="Course Description"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="category" className="mb-2">
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

        <Button
          onClick={handleUpdate}
          disabled={updating}
          className="w-full py-3 bg-black text-white rounded-lg"
        >
          {updating ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Updating...</span>
            </div>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}
