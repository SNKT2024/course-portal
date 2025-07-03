import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../contexts/AuthContext";
import { useCoursePreview } from "../../hooks/useCoursePreview";

export default function EnrollPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isEnrolled } = useCoursePreview();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=/enroll/${courseId}`);
      return;
    }

    if (isEnrolled) {
      alert("User is already enrolled in the course");
      navigate(`public-cousrse/${courseId}`);
    }

    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/course/${courseId}`
        );
        const data = await res.json();
        if (res.ok) {
          setCourse(data.data);
        } else {
          alert(data.msg || "Failed to load course");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, user, navigate, isEnrolled]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/enroll/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Enrolled successfully!");
        navigate(`/public-courses/${courseId}`);
      } else {
        alert(data.msg || "Enrollment failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error during enrollment");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="p-10">Loading course...</div>;
  if (!course) return <div className="p-10">Course not found.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 px-4">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold">Enroll in: {course.title}</h2>
          <p className="text-muted-foreground mt-2">{course.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm">Your Name</label>
            <Input value={user?.name} readOnly />
          </div>
          <div>
            <label className="text-sm">Your Email</label>
            <Input value={user?.email} readOnly />
          </div>
          <div>
            <label className="text-sm mb-1 block">Payment Method</label>
            <p className="text-muted-foreground text-sm">
              (Mock Payment — no real transaction)
            </p>
          </div>
          <Button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full"
          >
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
