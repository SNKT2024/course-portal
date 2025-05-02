import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "course-thumbnails",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 600, height: 400, crop: "limit" }],
  },
});

const thumbnailUpload = multer({ storage });

export default thumbnailUpload;
