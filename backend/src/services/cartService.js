import { Cart, CartItem, Product } from "../models/index.js";
import sequelize from "../config/db.js";

export const getCart = async (userId) => {
    const cart = await Cart.findOne({
        where: { userId },
        include: [
            {
                model: CartItem,
                include: [Product],
            },
        ],
        order: [[CartItem, 'id', 'ASC']],
    });
    return cart;
};

export const addItemToCart = async (userId, productId, quantity) => {
  if (!Number.isInteger(quantity) || quantity === 0) {
    throw new Error("quantity harus berupa integer dan tidak boleh 0");
  }

  return await sequelize.transaction(async (t) => {
    const product = await Product.findByPk(productId, { transaction: t });
    if (!product) throw new Error("Produk tidak ditemukan");

    let cart = await Cart.findOne({ where: { userId }, transaction: t });
    if (!cart) cart = await Cart.create({ userId }, { transaction: t });

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
      transaction: t,
    });

    if (!cartItem) {
      if (quantity < 0) {
        return { deleted: true, noop: true };
      }

      cartItem = await CartItem.create(
        { cartId: cart.id, productId, quantity },
        { transaction: t }
      );

      const fullItem = await CartItem.findByPk(cartItem.id, {
        include: [Product],
        transaction: t,
      });
      return fullItem;
    }

    const newQty = cartItem.quantity + quantity;

    if (newQty <= 0) {
      await cartItem.destroy({ transaction: t });
      return { deleted: true };
    }

    cartItem.quantity = newQty;
    await cartItem.save({ transaction: t });

    const fullItem = await CartItem.findByPk(cartItem.id, {
      include: [Product],
      transaction: t,
    });
    return fullItem;
  });
};

export const removeItemFromCart = async (userId, cartItemId) => {
    return await sequelize.transaction(async (t) => {
        const cart = await Cart.findOne({ where: { userId }, transaction: t });
        if (!cart) {
            throw new Error("Cart tidak ditemukan");
        }

        const cartItem = await CartItem.findOne({ where: { id: cartItemId, cartId: cart.id }, transaction: t });
        if (!cartItem) {
            throw new Error("Item tidak ditemukan di keranjang");
        }

        await cartItem.destroy({ transaction: t });
        return { success: true };
    });
};