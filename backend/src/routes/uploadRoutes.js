import express from "express";
import upload from "../middleware/cloudinaryUpload.js";

const router = express.Router();

router.post("/video", upload.single("video"), async (req, res) => {
  try {
    const file = req.file;

    if (!file || !file.path) {
      return res.status(400).json({
        success: false,
        message: "No video uploaded or Cloudinary failed.",
      });
    }

    const videoUrl = JSON.stringify(file.path);

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully.",
      videoUrl,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      message: "Upload failed.",
    });
  }
});

export default router;
