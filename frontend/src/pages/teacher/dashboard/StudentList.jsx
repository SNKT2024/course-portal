import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentList() {
  const [studentData, setStudentData] = useState({
    totalEnrollments: 0,
    courseEnrollments: [],
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/teacher/get-student-details`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setStudentData({
            totalEnrollments: data.totalEnrollments,
            courseEnrollments: data.courseEnrollments,
          });
        } else {
          console.error("Error fetching student data:", data.msg);
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Students Overview</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
        {/* Total Student Enrollment */}
        <Card>
          <CardHeader>
            <CardTitle>Total Students Enrolled</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-4xl font-bold">
              {studentData.totalEnrollments}
            </div>
          </CardContent>
        </Card>

        {/* Students per Course */}
        <Card>
          <CardHeader>
            <CardTitle>Students by Course</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {studentData.courseEnrollments.length > 0 ? (
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Course
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Students Enrolled
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.courseEnrollments.map((course) => (
                    <tr key={course._id} className="border-t">
                      <td className="px-4 py-2 text-sm">{course.title}</td>
                      <td className="px-4 py-2 text-sm">
                        {course.studentCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted-foreground text-sm">
                No course data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
