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
    // 1. Find user by email
    const user = await User.findOne({ email }); // Find the doc for that user
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Check if user is blocked

    if (user.status === "blocked") {
      return res.status(403).json({ message: "Account blocked" });
    }
    // 4. Update lastLogin
    user.lastLogin = new Date();
    await user.save();
    // 5. Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 6. Return user doc & token

    const { password: _, ...userData } = user.toObject();
    return res.json({ token, user: userData });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
