import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  checkRole(["admin,teacher"]),
  (req, res) => {
    res.json({ msg: "Course created successfully!" });
  }
);

export default router;
