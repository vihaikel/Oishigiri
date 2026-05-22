import { getAllProducts, getProductById } from "../services/productService.js";

export const listProducts = async (req, res) => {
    const { q } = req.query;
    try {
        const products = await getAllProducts(q);
        return res.status(200).json({ data: products });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export const getProductDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        return res.status(200).json({ data: product });
    } catch (err) {
        if (err.message === "Produk tidak ditemukan") {
            return res.status(404).json({ message: err.message });
        }
        return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};