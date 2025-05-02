import cloudinary from "./cloudinary.js"; // Adjust the path if needed

cloudinary.uploader.upload(
  "your_video_file.mp4",
  { resource_type: "video" },
  (error, result) => {
    if (error) {
      console.error("Cloudinary upload error:", error);
    } else {
      console.log("Cloudinary upload result:", result);
    }
  }
);
