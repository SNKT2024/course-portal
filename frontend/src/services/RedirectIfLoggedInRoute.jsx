import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RedirectIfLoggedInRoute({ children }) {
  const { token, user } = useAuth();

  if (token) {
    if (user?.role === "teacher") {
      return <Navigate to="/dashboard-teacher" replace />;
    }
    return <Navigate to="/dashboard-student" replace />;
  }

  return children;
}
