import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import TeacherDashboardSidebar from "../pages/teacher/dashboard/TeacherDashboardSidebar";

export default function TeacherLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen bg-gray-100">
        <TeacherDashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
