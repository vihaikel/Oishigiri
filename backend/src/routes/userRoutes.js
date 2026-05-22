import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { register, login, getProfile } from "../controllers/userController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getProfile);
export default router;