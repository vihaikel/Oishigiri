import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const CartItem = sequelize.define(
    "CartItem",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        cartId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "carts",
                key: "id",
            },
        },
        productId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "products",
                key: "id",
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        tableName: "cart_items",
        timestamps: false,
    }
);

export default CartItem;