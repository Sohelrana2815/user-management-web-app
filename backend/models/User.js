import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  }, // unique index
  password: { type: String, required: true }, // Hashed password
  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: null },
});

const User = mongoose.model("User", userSchema);
export default User;
