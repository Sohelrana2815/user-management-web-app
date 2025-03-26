import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER
// POST /api/users
export const register = async (req, res) => {
  try {
    const { name, email, password, status } = req.body;
    console.log("Reg... Info: ", name, email, password, status);
    // 1. Check for non-empty password

    if (!password || password.trim().length === 0) {
      return res.status(400).json({ message: "Password cannot be empty" });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      status: status || "active", // Doubt 1
      createdAt: new Date(),
    });
    //  4. Return the user doc without password
    const { password: _, ...userData } = newUser.toObject();
    return res.status(201).json(userData);
  } catch (error) {
    // If email already exists => Mongo error code 11000
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
// POST /api/users/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login info:", email, password);

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare passwords
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Check if user is blocked
    if (user.status === "blocked") {
      return res.status(403).json({ message: "User is blocked" });
    }

    // 4. Update lastLogin
    user.lastLogin = new Date();
    await user.save();

    // 5. Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // or any expiry you want
    });

    // 6. Return user doc & token
    const { password: _, ...userData } = user.toObject();
    return res.json({ token, user: userData });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ALL USERS
// GET /api/users

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().sort("-lastLogin");
    return res.json(user);
  } catch (error) {
    console.error("GetAllUsers error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// UPDATE STATUS (BLOCK/UNBLOCK)
// PATCH /api/users/update-status

export const updateStatus = async (req, res) => {
  try {
    const { ids, status } = req.body; // e.g. { ids: ["123", "456"], status: "blocked" }

    const result = await User.updateMany(
      { _id: { $in: ids } },
      { status: status }
    );

    return res.json({ message: `Updated ${result.modifiedCount} users` });
  } catch (error) {
    console.error("UpdateStatus error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE USERS
// DELETE /api/users/delete
export const deleteUsers = async (req, res) => {
  try {
    const { ids } = req.body; // e.g. { ids: ["123", "456"] }

    const result = await User.deleteMany({ _id: { $in: ids } });
    return res.json({ message: `Deleted ${result.deletedCount} users` });
  } catch (error) {
    console.error("DeleteUsers error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
