import * as orderService from "../services/orderService.js";

export const checkout = async (req, res) => {
    try {
        const { customerName, kasirName, payment } = req.body;
        if (!payment)
            return res.status(400).json({ message: "Mohon pilih metode pembayaran!" });

        const isKasir = req.user?.role === "admin";

        const finalCustomerName = isKasir ? (customerName || "").trim() : (req.user?.name || "").trim();
        if (!finalCustomerName)
            return res.status(400).json({ message: "Mohon isi nama customer!" });

        if (isKasir && !kasirName)
            return res.status(400).json({ message: "Mohon pilih kasir!" });

        const order = await orderService.checkout({
            userId: req.user.id,
            customerName: finalCustomerName,
            kasirName: isKasir ? kasirName : "-",
            payment,
        });
        res.status(201).json({ message: "Checkout berhasil", data: order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const listOrders = async (req, res) => {
  try {
    const isKasir = req.user?.role === "admin";
    const data = isKasir
      ? await orderService.getAllOrders()     // <-- semua
      : await orderService.getUserOrders(req.user.id); // <-- milik user

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrderDetail = async (req, res) => {
  const { orderId } = req.params;
  try {
    const isKasir = req.user?.role === "admin";
    const order = await orderService.getOrderDetail(
      orderId,
      isKasir ? null : req.user.id
    );
    return res.status(200).json({ data: order });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const advanceStatus = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await orderService.advanceStatus(orderId, req.user.id);
        return res.status(200).json({ message: "Status updated", data: order });
    } catch (error) {
        const status = error.message === "Forbidden" ? 403 : 400;
        return res.status(status).json({ message: error.message });
    }
};

export const removeOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        await orderService.removeOrder(orderId, req.user.id);
        return res.status(200).json({ message: "Order removed" });
    } catch (error) {
        const status = error.message === "Forbidden" ? 403 : 400;
        return res.status(status).json({ message: error.message });
    }
};