import ReactPlayer from "react-player";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function VideoPlayer({
  lesson,
  isEnrolled,
  isFirst,
  user,
  courseId,
  onEnroll,
}) {
  return (
    <div className="relative bg-black w-full h-[480px] flex items-center justify-center">
      {lesson ? (
        isEnrolled || isFirst ? (
          <ReactPlayer
            url={lesson.videoUrl}
            controls
            width="100%"
            height="100%"
          />
        ) : (
          <div className="text-white flex flex-col items-center">
            <Lock className="h-8 w-8 mb-2" />
            {user ? (
              <>
                <p className="mb-2">Enroll to access this lesson</p>
                <Button onClick={onEnroll}>Enroll Now</Button>
              </>
            ) : (
              <Link to={`/login?redirect=public-course/${courseId}`}>
                <Button>Login to Enroll</Button>
              </Link>
            )}
          </div>
        )
      ) : (
        <p className="text-white">Select a lesson to preview</p>
      )}
    </div>
  );
}
