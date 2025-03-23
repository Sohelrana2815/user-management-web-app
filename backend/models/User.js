import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
});

// Create unique index

export default mongoose.model("User", userSchema);
