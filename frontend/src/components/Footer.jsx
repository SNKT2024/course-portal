import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-4 px-6 flex items-center justify-between text-sm text-muted-foreground ">
      <div className="flex items-center gap-2 text-lg">
        <Link to="/home" className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-7 w-7" />
          <span className="hidden md:inline-block">EduLearn</span>
        </Link>
      </div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
      </div>
    </footer>
  );
};

export default Footer;
