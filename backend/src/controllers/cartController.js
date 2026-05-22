import * as cartService from "../services/cartService.js";

export const getCartContents = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.user.id);
        res.status(200).json({ data: cart || { cartItems: [] } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addItem = async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ message: "productId dan quantity wajib diisi" });
    }

    try {
        const item = await cartService.addItemToCart(req.user.id, productId, quantity);
        res.status(201).json({ message: "Item berhasil ditambahkan ke keranjang", data: item });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const removeItem = async (req, res) => {
    const { cartItemId } = req.params;
    try {
        await cartService.removeItemFromCart(req.user.id, cartItemId);
        res.status(200).json({ message: "Item dihapus dari keranjang" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};