import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../context/QueueContext';
import styles from './Antrian.module.css';

const STATUS_LABEL = { order: 'Order', proses: 'Proses', done: 'Done' };
const STATUS_NEXT  = { order: 'Mulai Proses', proses: 'Selesai' };

const formatTime = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

const Antrian = () => {
  const { user } = useAuth();
  const { activeOrders, doneOrders, advanceStatus, removeOrder } = useQueue();
  const isKasir = user?.role === 'admin';

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.layout}>
        {/* KIRI: Antrian Aktif */}
        <section className={styles.queueSection}>
          <h1 className={styles.title}>Antrian</h1>

          {activeOrders.length === 0 ? (
            <div className={styles.empty}>Belum ada antrian.</div>
          ) : (
            <div className={styles.orderList}>
              {activeOrders.map((order) => (
                <div key={order.id} className={`${styles.orderCard} ${styles[order.status]}`}>
                  <div className={styles.orderHeader}>
                    <span className={styles.orderNumber}>#{order.number}</span>
                    <span className={`${styles.statusBadge} ${styles[`badge_${order.status}`]}`}>
                      {STATUS_LABEL[order.status]}
                    </span>
                    {/* Tombol advance HANYA kasir */}
                    {isKasir && order.status !== 'done' && (
                      <button className={styles.advanceBtn} onClick={() => advanceStatus(order.id)}>
                        {STATUS_NEXT[order.status]}
                      </button>
                    )}
                  </div>

                  <div className={styles.orderMeta}>
                    <div className={styles.metaBlock}>
                      <span className={styles.metaLabel}>Pelanggan</span>
                      <span className={styles.metaValue}>{order.customerName}</span>
                    </div>
                    <div className={styles.metaBlock}>
                      <span className={styles.metaLabel}>Kasir</span>
                      <span className={styles.metaValue}>{order.kasirName}</span>
                    </div>
                    {order.payment && (
                      <div className={styles.metaBlock}>
                        <span className={styles.metaLabel}>Bayar</span>
                        <span className={styles.metaValue}>{order.payment}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.orderItems}>
                    {order.items.map((item) => (
                      <span key={item.id} className={styles.itemChip}>
                        {item.name} x{item.qty}
                      </span>
                    ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <span className={styles.orderTotal}>
                      Rp {order.totalPrice.toLocaleString('id-ID')},00
                    </span>
                    <div className={styles.timestamps}>
                      <span>🕐 Order: {formatTime(order.timestamps.order)}</span>
                      {order.timestamps.proses && (
                        <span>🔧 Proses: {formatTime(order.timestamps.proses)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* KANAN: Done / Bisa Diambil */}
        <aside className={styles.donePanel}>
          <h2 className={styles.doneTitle}>🍙 Siap Diambil</h2>

          {doneOrders.length === 0 ? (
            <div className={styles.doneEmpty}>Belum ada pesanan selesai.</div>
          ) : (
            <div className={styles.doneList}>
              {doneOrders.map((order) => (
                <div key={order.id} className={styles.doneCard}>
                  <div className={styles.doneHeader}>
                    <span className={styles.doneNumber}>#{order.number}</span>
                    <span className={styles.doneName}>{order.customerName}</span>
                  </div>

                  <div className={styles.doneItems}>
                    {order.items.map((item) => (
                      <p key={item.id}>{item.name} x{item.qty}</p>
                    ))}
                  </div>

                  <div className={styles.doneTimes}>
                    <span>🕐 Order: {formatTime(order.timestamps.order)}</span>
                    <span>🔧 Proses: {formatTime(order.timestamps.proses)}</span>
                    <span>✅ Selesai: {formatTime(order.timestamps.done)}</span>
                  </div>

                  <div className={styles.doneFooter}>
                    <span>Rp {order.totalPrice.toLocaleString('id-ID')},00</span>
                    {/* Tombol sudah diambil HANYA kasir */}
                    {isKasir && (
                      <button className={styles.takenBtn} onClick={() => removeOrder(order.id)}>
                        Sudah Diambil
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Antrian;