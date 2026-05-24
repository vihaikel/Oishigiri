import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { fetchCart, addCartItem, deleteCartItem } from '../services/cartApi.js';

const CartContext = createContext(null);

const normalizeCart = (cartData) => {
  if (!cartData) return [];

  const rawItems =
    cartData.CartItems ||
    cartData.cartitems ||
    cartData.cart_items ||
    cartData.items ||
    [];

  return rawItems.map((ci) => {
    const p = ci.product || ci.Product || {};
    const priceNumber = Number(p.price ?? ci.price ?? 0);

    return {
      id: p.id ?? ci.productId,
      cartItemId: ci.id,
      name: p.name ?? ci.productName ?? 'Unknown Product',
      priceNumber,
      price:
        typeof p.price === 'number'
          ? `Rp ${p.price.toLocaleString('id-ID')},00`
          : `Rp ${Number(ci.price ?? 0).toLocaleString('id-ID')},00`,
      icon: p.imageUrl ?? ci.productImage ?? null,
      qty: ci.quantity ?? ci.qty ?? 1,
      description: p.description ?? '',
    };
  });
};

export const CartProvider = ({ children }) => {
  const { token } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const refreshCart = async () => {
    if (!token) {
      setCartItems([]);
      return;
    }
    setLoadingCart(true);
    try {
      const res = await fetchCart({ token });
      const cart = res?.data;
      setCartItems(normalizeCart(cart));
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addToCart = async (product) => {
    if (!token) throw new Error('Silahkan login terlebih dahulu');
  
    try {
      await addCartItem({ token, productId: product.id, quantity: 1 });
      openCart();
    } finally {
      await refreshCart();
    }
  };

  const removeFromCart = async (id) => {
    if (!token) throw new Error('Silahkan login terlebih dahulu');

    const item = cartItems.find((ci) => ci.id === id);
    if (!item) return;

    await deleteCartItem({ token, cartItemId: item.cartItemId });
    await refreshCart();
  };

  const increaseQty = async (id) => {
    if (!token) throw new Error('Silahkan login terlebih dahulu');

    const item = cartItems.find((ci) => ci.id === id);
    if (!item) return;

    try {
      await addCartItem({ token, productId: item.id, quantity: 1 });
    } catch (e) {
      console.error('increaseQty failed:', e?.message || e);
    } finally {
      await refreshCart();
    }
  };

  const decreaseQty = async (id) => {
    if (!token) throw new Error('Silahkan login terlebih dahulu');

    const item = cartItems.find((ci) => ci.id === id);
    if (!item) return;

    // kalau qty sudah 0 (harusnya tidak mungkin tampil), stop
    if ((item.qty ?? 0) <= 0) return;

    try {
      await addCartItem({ token, productId: item.id, quantity: -1 });
    } catch (e) {
      // Jangan crash app. Log saja.
      console.error('decreaseQty failed:', e?.message || e);
    } finally {
      await refreshCart();
    }
  };

  const clearCart = async () => {
    if (!token) {
      setCartItems([]);
      return;
    }

    for (const item of cartItems) {
      await deleteCartItem({ token, cartItemId: item.cartItemId });
    }
    await refreshCart();
  };

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.priceNumber * item.qty, 0),
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loadingCart,
        isCartOpen,
        openCart,
        closeCart,
        refreshCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};