import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BookOpen, Users } from "lucide-react";
import { useEffect, useState } from "react";
import Revenue from "./Revenue";

export default function HomePage() {
  const [details, setDetails] = useState({
    totalCourses: 0,
    totalStudents: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          "http://localhost:3000/api/teacher/get-teacher-dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setDetails({
            totalCourses: data.totalCourses,
            totalStudents: data.totalStudents,
            revenue: data.revenue,
          });
        } else {
          console.error("Error fetching dashboard data:", data.msg);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchTeacherDetails();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{details.totalCourses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{details.totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{details.revenue}</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
        <Revenue />
      </div>
    </>
  );
}
