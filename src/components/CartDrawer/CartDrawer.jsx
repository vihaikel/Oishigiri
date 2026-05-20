import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.css';

const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart, increaseQty, decreaseQty, totalPrice } = useCart();
  const navigate = useNavigate();

  const handlePay = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && <div className={styles.overlay} onClick={closeCart} />}

      {/* Drawer */}
      <div className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span>CART</span>
          </div>
          <button className={styles.closeBtn} onClick={closeCart}>✕</button>
        </div>

        <div className={styles.divider} />

        {/* Item List */}
        <div className={styles.itemList}>
          {cartItems.length === 0 ? (
            <div className={styles.empty}>
              <p>Keranjang kamu kosong.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImg}>
                  {item.icon
                    ? <img src={item.icon} alt={item.name} />
                    : <span>🍙</span>
                  }
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice}>{item.price}</p>
                  <div className={styles.qtyControl}>
                    <button onClick={() => decreaseQty(item.id)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>
                <button className={styles.deleteBtn} onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.total}>
            <span>JUMLAH HARGA TOTAL</span>
            <span className={styles.totalPrice}>
              Rp {totalPrice.toLocaleString('id-ID')},00
            </span>
          </div>
          <button
            className={styles.payBtn}
            onClick={handlePay}
            disabled={cartItems.length === 0}
          >
            PAY
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
