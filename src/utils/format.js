export const formatPrice = (price) => {
    const n = typeof price === 'number' ? price : Number(price || 0);
    return `Rp ${n.toLocaleString('id-ID')},00`;
};