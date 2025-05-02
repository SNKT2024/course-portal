import express from "express";
import upload from "../middleware/multer.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import { log } from "util";

const router = express.Router();

router.post("/video", upload.single("video"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "video",
      folder: "lms-videos",
    });

    fs.unlinkSync(file.path);

    return res.status(200).json({
      success: true,
      message: "Video Uploaded Successfully",
      videoUrl: result.secure_url,
    });
  } catch (err) {
    console.error("Video Upload Error: ", err);
    return res.status(500).json({
      success: false,
      message: "Error Uploading Video",
      error: err.message,
    });
  }
});

export default router;
