import { Product } from "../models/index.js";
import { Op } from "sequelize";

export const getAllProducts = async (q) => {
  const options = {};

  if (q && String(q).trim() !== "") {
    options.where = {
      name: { [Op.iLike]: `%${q}%` },
    };
  }

  return await Product.findAll(options);
};

export const getProductById = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Produk tidak ditemukan");
    return product;
}