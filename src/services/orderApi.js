import { apiFetch } from './api.js';

export const checkoutOrder = async ({ token, customerName, kasirName, payment }) => {
    return apiFetch('/orders/checkout', {
        token,
        method: 'POST',
        body: { customerName, kasirName, payment },
    });
};

export const fetchOrders = async ({ token }) => {
    return apiFetch('/orders', { token });
};

export const fetchOrderDetail = async ({ token, orderId }) => {
    return apiFetch(`/orders/${orderId}`, { token });
};

export const advanceOrderStatus = async ({ token, orderId }) => {
    return apiFetch(`/orders/${orderId}/advance`, {
        token,
        method: 'PATCH',
    });
};

export const removeOrder = async ({ token, orderId }) => {
    return apiFetch(`/orders/${orderId}`, {
        token,
        method: 'DELETE',
    });
};