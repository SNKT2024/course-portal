import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import StudentLayout from "./layout/StudentLayout";
import TeacherLayout from "./layout/TeacherLayout";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignUpPage";

import ProtectedRoute from "./services/ProtectedRoute";
import RedirectIfLoggedInRoute from "./services/RedirectIfLoggedInRoute";
import MyCourses from "./pages/teacher/dashboard/MyCourses";
import HomePage from "./pages/teacher/dashboard/HomePage";
import Revenue from "./pages/teacher/dashboard/Revenue";
import StudentList from "./pages/teacher/dashboard/StudentList";
import CreateCourse from "./pages/teacher/CreateCourse";
import AddSections from "./pages/teacher/AddSections";
import ViewCourse from "./pages/teacher/dashboard/ViewCourse";
import EditCourseDetails from "./pages/teacher/EditCourseDetails";
import CoursePreview from "./pages/public/CoursePreview";
import Courses from "./pages/public/Courses";
import PublicLayout from "./layout/PublicLayout";
import PublicHomePage from "./pages/public/PublicHomePage";
import EnrollPage from "./pages/public/EnrollPage";
import StudentDashboard from "./pages/student/StudentDashboard";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes with Navbar */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<PublicHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/public-courses" element={<Courses />} />
          <Route path="/public-courses/:courseId" element={<CoursePreview />} />

          <Route path="/enroll/:courseId" element={<EnrollPage />} />
          <Route path="/my-learning" element={<StudentDashboard />} />
        </Route>

        {/* Student Dashboard Routes */}
        <Route
          path="/dashboard-student/*"
          element={
            <ProtectedRoute>
              <StudentLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard-teacher/*"
          element={
            <ProtectedRoute>
              <TeacherLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="studentlist" element={<StudentList />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route
            path="create-course/:courseId/add-sections"
            element={<AddSections />}
          />
          <Route path="courses/:courseId/view" element={<ViewCourse />} />
          <Route path="edit-course/:courseId" element={<EditCourseDetails />} />
        </Route>

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
