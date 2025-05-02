import {
  BookOpen,
  GraduationCap,
  Home,
  Info,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
    setOpen(false);
  };
  const location = useLocation();
  return (
    <header className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 px-15 py-1">
      <div className=" flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 text-lg">
          <Link to="/home" className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-7 w-7" />
            <span className="hidden md:inline-block">EduLearn</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/home"
            className="text-sm font-medium transition-colors hover:text-white hover:bg-black px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/public-courses"
            className="text-sm font-medium transition-colors hover:text-white hover:bg-black px-3 py-2 rounded-md"
          >
            Courses
          </Link>
          {user?.role === "teacher" && (
            <Link
              to="/dashboard-teacher"
              className="text-sm font-medium transition-colors hover:text-white hover:bg-black px-3 py-2 rounded-md"
            >
              Dashboard
            </Link>
          )}

          {user?.role === "student" && (
            <Link
              to="/dashboard-student"
              className="text-sm font-medium transition-colors hover:text-white hover:bg-black px-3 py-2 rounded-md"
            >
              My Learning
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          ) : location.pathname !== "/login" ? (
            <Button
              className="bg-black hidden md:flex"
              onClick={() => handleLogin()}
            >
              Login
            </Button>
          ) : null}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 px-2 my-3">
                <div className="flex items-center justify-between">
                  <SheetTitle>
                    <Link
                      to="/home"
                      className="flex items-center gap-2 font-semibold"
                      onClick={() => setOpen(false)}
                    >
                      <GraduationCap className="h-6 w-6" />
                      <span>EduLearn</span>
                    </Link>
                  </SheetTitle>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    to="/home"
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <Link
                    to="/public-courses"
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    <BookOpen className="h-4 w-4" />
                    Courses
                  </Link>

                  {user?.role === "teacher" && (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      <Info className="h-4 w-4" />
                      Dashboard
                    </Link>
                  )}

                  {user?.role === "student" && (
                    <Link
                      to="/my-learning"
                      className="flex items-center gap-2 text-sm font-medium text-primary transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <GraduationCap className="h-4 w-4" />
                      My Learning
                    </Link>
                  )}
                </nav>
                {user ? (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Button>
                ) : location.pathname !== "/login" ? (
                  <Button className="bg-black" onClick={() => handleLogin()}>
                    Login
                  </Button>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
