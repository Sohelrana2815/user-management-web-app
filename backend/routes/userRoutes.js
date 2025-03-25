import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
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
  const user = req.body;
  console.log("Reg.. info:", user);
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

// LOGIN ROUTE

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("user data:", email, password);
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // 2. Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. check if user is blocked

    if (user.status === "blocked") {
      return res.status(403).json({ message: "User is blocked" });
    }

    // 4. Update lastLogin
    user.lastLogin = new Date();
    await user.save();

    // 5. Return the user doc INCLUDING the hashed password
    // Convert Mongoose doc to a plain JS object
    const userDoc = user.toObject();
    return res.json(userDoc);
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * Update user status (Block/Unblock) for single, multiple, or all users
 */
router.patch("/update-status", async (req, res) => {
  try {
    const { ids, status } = req.body;

    // Ensure a valid status is provided
    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // If no specific IDs are given, update all users
    const filter = ids?.length ? { _id: { $in: ids } } : {};

    // Update users
    const result = await User.updateMany(filter, { status });

    res.json({ message: `Updated ${result.modifiedCount} users` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Delete user(s) - single, multiple, or all users
 */
router.delete("/delete", async (req, res) => {
  try {
    const { ids } = req.body;

    // If no specific IDs are given, delete all users
    const filter = ids?.length ? { _id: { $in: ids } } : {};

    const result = await User.deleteMany(filter);

    res.json({ message: `Deleted ${result.deletedCount} users` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
