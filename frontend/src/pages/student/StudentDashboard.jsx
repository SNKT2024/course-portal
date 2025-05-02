import React, { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchEnrolledCourses = async () => {
    const url = "http://localhost:3000/api/student/dashboard/courses";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status:${response.status}`);
      }

      const json = await response.json();
      setEnrolledCourses(json.dashBoardCourses);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  return (
    <>
      {enrolledCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
          <h2 className="text-xl font-semibold">
            You're not enrolled in any courses yet.
          </h2>
          <p className="text-muted-foreground">
            Browse our available courses and start learning today!
          </p>
          <Button onClick={() => navigate("/public-courses")}>
            Browse Courses
          </Button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">My Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-full">
            {enrolledCourses.map((course) => (
              <Card key={course._id} className="overflow-hidden flex flex-col">
                <div className="relative">
                  <img
                    src={
                      course.thumbnail ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVjry8cXdWXZtkZKt8fS3rOHjf9TVa6NLC_g&s"
                    }
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-primary">
                    {course.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {course.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                </CardHeader>
                <CardContent className="pb-2 flex-1">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progressPercentage}%</span>
                    </div>
                    <Progress
                      value={course.progressPercentage}
                      className="h-2"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => navigate(`/public-courses/${course._id}`)}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
}
