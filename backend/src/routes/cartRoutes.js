import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { addItem, getCartContents, removeItem } from "../controllers/cartController.js";

const router = Router();

router.use(auth);

router.get("/", getCartContents);
router.post("/items", addItem);
router.delete("/items/:cartItemId", removeItem);

export default router;