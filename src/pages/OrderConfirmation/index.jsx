import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../context/QueueContext';
import styles from './Antrian.module.css';

const STATUS_LABEL = { order: 'Order', proses: 'Proses', done: 'Done' };
const STATUS_NEXT = { order: 'Mulai Proses', proses: 'Selesai' };

const formatTime = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

const Antrian = () => {
  const { user } = useAuth();
  const [updatingId, setUpdatingId] = useState(null);
  const { activeOrders, doneOrders, advanceStatus, removeOrder, refreshOrders, loadingOrders } = useQueue();
  const isKasir = user?.role === 'admin';

  const handleAdvance = async (orderId) => {
    try {
      setUpdatingId(orderId);
      await advanceStatus(orderId);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (orderId) => {
    try {
      setUpdatingId(orderId);
      await removeOrder(orderId);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  const safeItems = (order) => Array.isArray(order?.items) ? order.items : [];
  const safeTimestamps = (order) => order?.timestamps || {};

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.layout}>
        {/* KIRI: Antrian Aktif */}
        <section className={styles.queueSection}>
          <h1 className={styles.title}>Antrian</h1>

          {loadingOrders ? (
            <div className={styles.empty}>Loading...</div>
          ) : activeOrders.length === 0 ? (
            <div className={styles.empty}>Belum ada antrian.</div>
          ) : (
            <div className={styles.orderList}>
              {activeOrders.map((order) => {
                const items = safeItems(order);
                const ts = safeTimestamps(order);

                return (
                  <div key={order.id} className={`${styles.orderCard} ${styles[order.status]}`}>
                    <div className={styles.orderHeader}>
                      <span className={styles.orderNumber}>#{order.number}</span>
                      <span className={`${styles.statusBadge} ${styles[`badge_${order.status}`]}`}>
                        {STATUS_LABEL[order.status] || order.status}
                      </span>

                    {isKasir && (
                      <div className={styles.actions}>
                        {order.status === 'order' && (
                          <button
                            className={styles.processBtn}
                            onClick={() => handleAdvance(order.id)}
                            type="button"
                            disabled={updatingId === order.id}
                          >
                            {updatingId === order.id ? 'Memproses...' : 'Mulai Proses'}
                          </button>
                        )}

                        {order.status === 'proses' && (
                          <button
                            className={styles.doneBtn}
                            onClick={() => handleAdvance(order.id)}
                            type="button"
                            disabled={updatingId === order.id}
                          >
                            {updatingId === order.id ? 'Menyelesaikan...' : 'Selesai'}
                          </button>
                        )}
                      </div>
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
                      {items.map((item) => (
                        <span key={`${order.id}-${item.id}-${item.name}`} className={styles.itemChip}>
                          {item.name} x{item.qty}
                        </span>
                      ))}
                    </div>

                    <div className={styles.orderFooter}>
                      <span className={styles.orderTotal}>
                        Rp {Number(order.totalPrice || 0).toLocaleString('id-ID')},00
                      </span>
                      <div className={styles.timestamps}>
                        <span>🕐 Order: {formatTime(ts.order)}</span>
                        {ts.proses && <span>🔧 Proses: {formatTime(ts.proses)}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* KANAN: Done / Bisa Diambil */}
        <aside className={styles.donePanel}>
          <h2 className={styles.doneTitle}>🍙 Siap Diambil</h2>

          {loadingOrders ? (
            <div className={styles.doneEmpty}>Loading...</div>
          ) : doneOrders.length === 0 ? (
            <div className={styles.doneEmpty}>Belum ada pesanan selesai.</div>
          ) : (
            <div className={styles.doneList}>
              {doneOrders.map((order) => {
                const items = safeItems(order);
                const ts = safeTimestamps(order);

                return (
                  <div key={order.id} className={styles.doneCard}>
                    <div className={styles.doneHeader}>
                      <span className={styles.doneNumber}>#{order.number}</span>
                      <span className={styles.doneName}>{order.customerName}</span>
                    </div>

                    <div className={styles.doneItems}>
                      {items.map((item) => (
                        <p key={`${order.id}-${item.id}-${item.name}`}>{item.name} x{item.qty}</p>
                      ))}
                    </div>

                    <div className={styles.doneTimes}>
                      <span>🕐 Order: {formatTime(ts.order)}</span>
                      <span>🔧 Proses: {formatTime(ts.proses)}</span>
                      <span>✅ Selesai: {formatTime(ts.done)}</span>
                    </div>

                    <div className={styles.doneFooter}>
                      <span>Rp {Number(order.totalPrice || 0).toLocaleString('id-ID')},00</span>
                      {/* Tombol sudah diambil HANYA kasir */}
                      {isKasir && (
                        <button
                          className={styles.takenBtn}
                          onClick={() => handleRemove(order.id)}
                          disabled={updatingId === order.id}
                          type="button"
                        >
                          {updatingId === order.id ? 'Menghapus...' : 'Sudah Diambil'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Antrian;