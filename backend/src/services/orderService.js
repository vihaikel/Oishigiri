import { Cart, CartItem, Order, OrderItem, Product, User } from "../models/index.js";
import sequelize from "../config/db.js";

const syncToFeOrder = (orderInstance) => {
    const o = orderInstance.toJSON();

    const items = (o.OrderItems || o.order_items || o.OrderItem || o.items || []).map((it) => ({
        id: it.productId,
        name: it.productName,
        qty: it.quantity,
        price: `Rp ${Number(it.price).toLocaleString("id-ID")},00`,
    }));

    return {
        id: o.id,
        number: o.number,
        customerName: o.customerName,
        kasirName: o.kasirName,
        payment: o.payment,
        items,
        totalPrice: o.totalPrice,
        status: o.status,
        timestamps: {
            order: o.orderedAt,
            proses: o.processedAt,
            done: o.doneAt,
        },
    };
};

const assertAdmin = async (userId) => {
    const user = await User.findByPk(userId);
    console.log("assertAdmin check:", { userId, dbRole: user?.role, email: user?.email, name: user?.name });
    if (!user || user.role !== "admin")
        throw new Error("Forbidden");
};

export const checkout = async ({ userId, customerName, kasirName, payment }) => {
    return await sequelize.transaction(async (t) => {
        const cart = await Cart.findOne({ where: { userId }, transaction: t });
        if (!cart)
            throw new Error("Cart not found");

        const cartItems = await CartItem.findAll({ where: { cartId: cart.id }, include: Product, transaction: t });

        if (cartItems.length === 0)
            throw new Error("Cart is empty");

        let totalPrice = 0;
        for (const item of cartItems) {
            totalPrice += item.quantity * item.Product.price;
        }

        const maxNumber = await Order.max("number", { transaction: t });
        const nextNumber = (maxNumber || 0) + 1;

        const order = await Order.create({ userId, number: nextNumber, customerName, kasirName: kasirName || "-", payment, totalPrice, status: "order", orderedAt: new Date(), processedAt: null, doneAt: null }, { transaction: t });

        for (const item of cartItems) {
            await OrderItem.create(
                {
                    orderId: order.id,
                    productId: item.productId,
                    productName: item.Product.name,
                    quantity: item.quantity,
                    price: item.Product.price,
                    subtotal: item.quantity * item.Product.price,
                }, 
                { transaction: t }
            );
        }

        await CartItem.destroy({ where: { cartId: cart.id }, transaction: t });

        const full = await Order.findByPk(order.id, {
            include: [{ model: OrderItem }],
            transaction: t,
        });
        return syncToFeOrder(full);
    });
};

export const getAllOrders = async () => {
    const orders = await Order.findAll({
        include: [{
            model: OrderItem,
        }],
        order: [["createdAt", "ASC"]],
    });
    return orders.map(syncToFeOrder);
};

export const getUserOrders = async (userId) => {
    const orders = await Order.findAll({
        where: { userId },
        include: [{
            model: OrderItem,
        }],
        order: [["createdAt", "DESC"]],
    });
    return orders.map(syncToFeOrder);
};

export const getOrderDetail = async (orderId, userId) => {
    const user = await User.findByPk(userId);
    if (!user)
        throw new Error("User not found");

    const where = user.role === "admin" ? { id: orderId } : { id: orderId, userId };
    const order = await Order.findOne({
        where,
        include: [
            {
                model: OrderItem,
            },
        ],
    });
    if (!order)
        throw new Error("Order not found");
    return syncToFeOrder(order);
};

export const advanceStatus = async (orderId, userId) => {
    await assertAdmin(userId);

    const order = await Order.findByPk(orderId, { include: [{ model: OrderItem }] });
    if (!order)
        throw new Error("Order not found");

    if (order.status === "done") return syncToFeOrder(order);

    if (order.status === "order") {
        order.status = "proses";
        order.processedAt = new Date();
    } else if (order.status === "proses") {
        order.status = "done";
        order.doneAt = new Date();
    } else {
        throw new Error("Invalid order status");
    }

    await order.save();

    return syncToFeOrder(order);
};

export const removeOrder = async (orderId, userId) => {
    await assertAdmin(userId);

    const order = await Order.findByPk(orderId);
    if (!order)
        throw new Error("Order not found");

    await order.destroy();
    return { success: true };
}
