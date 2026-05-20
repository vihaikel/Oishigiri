import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useQueue } from '../../context/QueueContext';
import styles from './Checkout.module.css';

const KASIR_LIST = ['Stevi', 'Yoan', 'Fahreza', 'Aldo'];

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, totalPrice, closeCart, clearCart } = useCart();
  const { addOrder, orders } = useQueue();

  const isKasir = user?.role === 'admin';

  const [customerName, setCustomerName] = useState('');
  const [kasirName, setKasirName] = useState('');
  const [payment, setPayment] = useState('');

  const nextNumber = orders.length > 0 ? Math.max(...orders.map(o => o.number)) + 1 : 1;

  const handleSubmit = () => {
    // Validasi kasir
    if (isKasir && !customerName.trim()) {
      alert('Mohon isi nama pelanggan!');
      return;
    }
    if (isKasir && !kasirName) {
      alert('Mohon pilih kasir!');
      return;
    }
    if (!payment) {
      alert('Mohon pilih metode pembayaran!');
      return;
    }
    if (cartItems.length === 0) {
      alert('Keranjang kosong!');
      return;
    }

    addOrder({
      customerName: isKasir ? customerName.trim() : user?.name,
      kasirName: isKasir ? kasirName : '-',
      payment,
      items: cartItems,
      totalPrice,
    });

    closeCart();
    clearCart();
    navigate('/antrian');
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.checkoutSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Checkout</h1>

          <div className={styles.card}>
            {/* Nomor Antrian */}
            <div className={styles.queueNumber}>
              <span className={styles.queueLabel}>Nomor Antrian</span>
              <span className={styles.queueValue}>#{nextNumber}</span>
            </div>

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

            <button className={styles.submitBtn} onClick={handleSubmit}>
              Konfirmasi Pesanan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;