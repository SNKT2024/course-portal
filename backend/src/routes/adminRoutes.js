import express from "express";

import User from "../models/User";
import { isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.delete("/user/:id", isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
