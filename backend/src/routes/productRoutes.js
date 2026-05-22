import { Router } from "express";
import { listProducts, getProductDetail } from "../controllers/productController.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductDetail);

export default router;