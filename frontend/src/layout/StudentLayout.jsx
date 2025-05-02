import React from "react";
import Navbar from "../components/Navbar";

import StudentDashboard from "../pages/student/StudentDashboard";
export default function StudentLayout() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto px-4 py-8 w-max">
        <div className="mb-8"></div>
        <StudentDashboard />
      </main>
    </div>
  );
}
