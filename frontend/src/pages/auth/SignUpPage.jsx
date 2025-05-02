import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // Import the Label component

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signup(name, email, password, role);
    setLoading(false);
    if (result.success) {
      const userRole = result.user?.role;
      if (userRole === "student") {
        navigate("/dashboard-student");
      } else if (userRole === "teacher") {
        navigate("/dashboard-teacher");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>{" "}
      {/* Increased margin-bottom */}
      {error && <p className="text-red-600 mb-4">{error}</p>}{" "}
      {/* Increased margin-bottom */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Select onValueChange={setRole}>
            <SelectTrigger id="role-select" className="w-full">
              {" "}
              {/* Made the SelectTrigger full width */}
              <SelectValue placeholder="Select role" />{" "}
              {/* Updated placeholder */}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-center">
        {" "}
        {/* Increased margin-top */}
        Already have an account?{" "}
        <Link to="/login" className="text-primary underline">
          Login
        </Link>
      </p>
    </div>
  );
}
