import { Router } from "express";
import { register } from "../controllers/userController.js";
const router = Router();

// PUBLIC ROUTES

router.post("/register", register); // POST /api/users - Register

export default router;
