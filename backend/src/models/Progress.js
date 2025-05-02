import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  completedLessons: [String],
  updatedAt: Date,
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
