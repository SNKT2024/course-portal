import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourse = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/course/teacher-courses`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setCourses(data.courses || []); // Set the courses state
        } else {
          console.error("Error:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchMyCourse();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <Button onClick={() => navigate("/dashboard-teacher/create-course")}>
          Add New Course
        </Button>
      </div>

      {courses.length === 0 ? (
        <div className="mt-10 text-center text-gray-500 text-lg">
          You haven't created any courses yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {courses.map((course) => (
            <Card key={course._id} className="shadow-md">
              <CardHeader className="pb-2">
                {/* Display Course Thumbnail */}
                <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-min object-cover mb-4 rounded-lg"
                  />
                )}
              </CardHeader>
              <CardContent>
                {/* Display Course Price */}
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Price: ₹{course.price}
                </p>
                {/* Display Number of Students */}
                <p className="text-sm text-muted-foreground mb-4">
                  Students: {course.students?.length || 0}
                </p>
                <Button
                  variant="outline"
                  className="w-full mb-2"
                  onClick={() =>
                    navigate(`/dashboard-teacher/courses/${course._id}/view`)
                  }
                >
                  View
                </Button>
                <Button
                  variant="outline"
                  className="w-full mb-2"
                  onClick={() =>
                    navigate(
                      `/dashboard-teacher/create-course/${course._id}/add-sections`
                    )
                  }
                >
                  Edit Sections
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    navigate(`/dashboard-teacher/edit-course/${course._id}`)
                  }
                >
                  Edit Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
