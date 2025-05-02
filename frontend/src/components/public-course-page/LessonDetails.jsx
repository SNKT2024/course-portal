import { Separator } from "@/components/ui/separator";

export default function LessonDetails({ lesson }) {
  return (
    <div className="p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
      <Separator className="my-4" />
      <div className="prose max-w-none">
        <h3>About this lesson</h3>
        <p>{lesson.description}</p>
      </div>
    </div>
  );
}
