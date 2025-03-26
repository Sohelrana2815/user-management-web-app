import { Router } from "express";
import {
  register,
  login,
  getAllUsers,
  updateStatus,
  deleteUsers,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { blockCheckMiddleware } from "../middlewares/blockCheckMiddleware.js";
const router = Router();

// PUBLIC ROUTES

router.post("/register", register); // POST /api/users/register
router.post("/login", login); // POST /api/users/login
// PROTECTED ROUTES
router.get("/", authMiddleware, blockCheckMiddleware, getAllUsers);
router.patch(
  "/update-status",
  authMiddleware,
  blockCheckMiddleware,
  updateStatus
);
router.delete("/delete", authMiddleware, blockCheckMiddleware, deleteUsers);
export default router;
