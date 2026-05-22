import { DataTypes } from 'sequelize';
import sequelize from "../config/db.js";

const OrderItem = sequelize.define(
    'OrderItem',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        productId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'order_items',
        timestamps: false,
    }
);

export default OrderItem;