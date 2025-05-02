import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Revenue() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          "http://localhost:3000/api/teacher/get-teacher-dashboard",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setMonthlyData(data.revenueOverTime || []);
          setCourseData(data.revenueByCourse || []);
        } else {
          console.error("Failed to fetch revenue data:", data.msg);
        }
      } catch (err) {
        console.error("Error fetching revenue data:", err);
      }
    };

    fetchRevenueData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold">Revenue Overview</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
        {/* Revenue Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-center">
                Loading chart...
              </p>
            )}
          </CardContent>
        </Card>

        {/* Revenue by Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Courses</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            {courseData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-center">
                Loading chart...
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
