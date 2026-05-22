import { Product } from "../models/index.js";
import { Op } from "sequelize";

export const getAllProducts = async (query) => {
    const options = {};

    if (query.search) {
        options.where = {
            name: {
                [Op.iLike]: `%${query}%`
            },
        };
    }

    const products = await Product.findAll(options);
    return products;
}

export const getProductById = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Produk tidak ditemukan");
    return product;
}