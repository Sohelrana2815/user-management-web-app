import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get all users sorted by last login

router.get("/", async (req, res) => {
  try {
    const user = await User.find().sort("-lastLogin");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create new user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

router.patch("/:email", async (req, res) => {
  try {
    const data = req.body;
    console.log("Data in the server: ", data);
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { lastLogin: new Date(req.body.lastSignInTime) }, // Firebase timestamp
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update user status
router.patch("/bulk-update", async (req, res) => {
  try {
    const { ids, status } = req.body;
    await User.updateMany({ _id: { $in: ids } }, { status });
    res.json({ message: "Users updated" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
