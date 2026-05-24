import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useQueue } from '../../context/QueueContext';
import { checkoutOrder } from '../../services/orderApi.js';
import styles from './Checkout.module.css';

const KASIR_LIST = ['Stevi', 'Yoan', 'Fahreza', 'Aldo'];

const Checkout = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { cartItems, totalPrice, refreshCart, closeCart, clearCart } = useCart();
  const { refreshOrders } = useQueue();

  const isKasir = user?.role === 'admin';

  const [customerName, setCustomerName] = useState('');
  const [kasirName, setKasirName] = useState('');
  const [payment, setPayment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!token) return alert("Silahkan login terlebih dahulu");
    if (!payment) return alert("Mohon pilih metode pembayaran!");

    if (cartItems.length === 0) return alert("Keranjang kosong!");

    if (isKasir) {
      if (!customerName.trim()) return alert("Mohon isi nama pelanggan!");
      if (!kasirName) return alert("Mohon pilih kasir!");
    }

    try {
      setLoading(true);

      await checkoutOrder({
        token,
        customerName: isKasir ? customerName.trim() : undefined,
        kasirName: isKasir ? kasirName : undefined,
        payment,
      });

      await refreshCart();
      await refreshOrders();
      closeCart();
      navigate('/antrian');
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.checkoutSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Checkout</h1>

          <div className={styles.card}>
            {/* Nomor Antrian */}

            <div className={styles.form}>
              {isKasir ? (
                // KASIR: isi manual
                <>
                  <div className={styles.field}>
                    <label>Nama Pelanggan</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama pelanggan"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.field}>
                    <label>Kasir</label>
                    <div className={styles.optionGroup}>
                      {KASIR_LIST.map((k) => (
                        <button
                          key={k}
                          className={`${styles.optionBtn} ${kasirName === k ? styles.optionActive : ''}`}
                          onClick={() => setKasirName(k)}
                          type="button"
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                // USER: nama otomatis dari akun
                <div className={styles.userInfo}>
                  <span className={styles.userInfoLabel}>Pelanggan</span>
                  <span className={styles.userInfoValue}>{user?.name}</span>
                </div>
              )}

              {/* Payment — semua role */}
              <div className={styles.field}>
                <label>Pembayaran</label>
                <div className={styles.optionGroup}>
                  {['Cash', 'QRIS'].map((p) => (
                    <button
                      key={p}
                      className={`${styles.optionBtn} ${payment === p ? styles.optionActive : ''}`}
                      onClick={() => setPayment(p)}
                      type="button"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className={styles.summary}>
              <h3 className={styles.summaryTitle}>Ringkasan Pesanan</h3>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <span>{item.name} x{item.qty}</span>
                  <span>{item.price}</span>
                </div>
              ))}
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')},00</span>
              </div>
            </div>

            <button className={styles.submitBtn} onClick={handleCheckout} disabled={loading}>
              Konfirmasi Pesanan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;