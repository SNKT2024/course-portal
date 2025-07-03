"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

// Sample categories for filtering
const categories = [
  "All Categories",
  "Academics",
  "Professional Skills",
  "IT & Software",
  "Creativity",
  "Health",
  "Personal Growth",
  "Language",
  "Business",
];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/course/all-courses`
        );
        const data = await res.json();

        if (res.ok && data.success) {
          setCourses(data.data || []);
          setFilteredCourses(data.data || []);
        } else {
          console.error(data.msg || "Failed to fetch courses.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  // Filter courses based on search query and category selection
  useEffect(() => {
    let result = [...courses];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(result);
  }, [courses, searchQuery, selectedCategory]);

  if (loading)
    return (
      <div className="w-full mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Skeleton for search/filter */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Skeleton className="h-10 w-full md:w-1/3" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Skeleton for course grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-10 w-28" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-full  mx-auto px-20 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
      <p className="text-gray-600 mb-8">
        Discover top-quality courses to enhance your skills and advance your
        career
      </p>

      {/* Search and filter section */}
      <div className="mb-8 space-y-4 w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "course" : "courses"} found
          </p>
        </div>
      </div>

      {/* Display course cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course._id}
            className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div>
              <div className="relative">
                <img
                  src={
                    course.thumbnail || `/placeholder.svg?height=240&width=400`
                  }
                  alt={course.title}
                  className="w-full h-50 object-contain"
                />
              </div>
              <CardContent className="p-5 space-y-3">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>
              </CardContent>
            </div>
            <CardFooter className="p-5 flex justify-between items-center border-t">
              <div className="flex flex-col">
                <p className="text-xl font-bold text-gray-800">
                  ₹{course.price}
                </p>
              </div>
              <Button
                className="bg-black "
                onClick={() => navigate(`/public-courses/${course._id}`)}
              >
                View Course
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
