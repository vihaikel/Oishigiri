import { apiFetch } from './api.js';

export const fetchCart = async ({ token }) => {
    return apiFetch('/cart', { token });
};

export const addCartItem = async ({ token, productId, quantity = 1 }) => {
    return apiFetch('/cart/items', {
        token,
        method: 'POST',
        body: { productId, quantity }
    });
};

export const deleteCartItem = async ({ token, cartItemId }) => {
    return apiFetch(`/cart/items/${cartItemId}`, {
        token,
        method: 'DELETE',
    });
};