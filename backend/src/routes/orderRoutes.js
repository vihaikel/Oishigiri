import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { checkout, listOrders, getOrderDetail, advanceStatus, removeOrder } from "../controllers/orderController.js";

const router = Router();
router.use(auth);

router.post("/checkout", checkout);
router.get("/", listOrders);
router.get("/:orderId", getOrderDetail);
router.patch("/:orderId/advance", advanceStatus);
router.delete("/:orderId", removeOrder);

export default router;