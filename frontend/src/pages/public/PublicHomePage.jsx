import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Book,
  Briefcase,
  Cpu,
  Palette,
  Heart,
  User,
  Globe,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer"; // Make sure this path is correct

export default function PublicHomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const categories = [
    "Academics",
    "Professional Skills",
    "IT & Software",
    "Creativity",
    "Health",
    "Personal Growth",
    "Language",
    "Business",
  ];
  const categoryIcons = {
    Academics: Book,
    "Professional Skills": Briefcase,
    "IT & Software": Cpu,
    Creativity: Palette,
    Health: Heart,
    "Personal Growth": User,
    Language: Globe,
    Business: Building2,
  };

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/course/all-courses`
        );
        const data = await res.json();

        if (res.ok && data.success) {
          setCourses(data.data || []);
        } else {
          setError(true);
          console.error(data.msg || "Failed to fetch courses.");
        }
      } catch (err) {
        setError(true);
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Hero"
            className="w-full brightness-50 h-full object-cover"
          />
          <div className="absolute inse-0 bg-opacity-50" />
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome To EduLearn</h1>
          <p className="text-lg text-muted-foreground mb-6  text-white">
            Learn something new and grow every day.
          </p>

          <Button asChild size="lg">
            <Link to="/public-courses">Explore Courses</Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12  px-30 w-full ">
        <h2 className="text-3xl font-semibold mb-6 text-center">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            return (
              <Card
                key={cat}
                className="rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                  <Icon className="w-8 h-8 text-primary" />
                  <span className="font-medium">{cat}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-12 px-20  mx-auto w-full bg-muted">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Featured Courses
        </h2>
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-center text-destructive">
            Failed to load courses.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-max">
            {courses.map((course, index) => (
              <Card key={index}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="rounded-t-md w-full h-40 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {course.description}
                  </p>
                  <Button
                    className="mt-3 "
                    onClick={() => navigate(`/public-courses/${course._id}`)}
                  >
                    View Course
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-muted/30">
        <h2 className="text-3xl font-semibold text-center mb-10">
          What Our Learners Say
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              name: "Aarav Mehta",
              feedback:
                "EduLearn helped me master new skills in record time. The course quality is top-notch and instructors are amazing.",
            },
            {
              name: "Priya Sharma",
              feedback:
                "Absolutely loved the learning experience! The platform is user-friendly, and the lessons are very well structured.",
            },
            {
              name: "Rohit Verma",
              feedback:
                "Great content and very practical. I was able to apply what I learned immediately to my job.",
            },
          ].map((testimonial, index) => (
            <Card key={index} className="shadow-md rounded-xl h-full">
              <CardContent className="p-6 flex flex-col gap-4">
                <p className="text-muted-foreground italic">
                  "{testimonial.feedback}"
                </p>
                <p className="text-right font-semibold text-primary">
                  - {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sign Up */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Learning Today
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join millions of students and start your learning journey now.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="font-semibold"
            asChild
          >
            <Link to="/login">Sign Up For Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
