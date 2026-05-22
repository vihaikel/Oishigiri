import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define(
    'Order',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kasirName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '-',
        },
        payment: {
            type: DataTypes.ENUM('Cash', 'QRIS'),
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('order', 'proses', 'done'),
            allowNull: false,
            defaultValue: 'order',
        },
        orderedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        processedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        doneAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'orders',
        timestamps: true,
    }
);

export default Order;