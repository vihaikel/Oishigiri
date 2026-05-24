import { useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useQueue } from '../../context/QueueContext';
import styles from './History.module.css';

const formatTime = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const STATUS_LABEL = { order: 'Order', proses: 'Proses', done: 'Done' };
const STATUS_COLOR = { order: '#e63946', proses: '#ffc107', done: '#4caf50' };

const History = () => {
  const { user } = useAuth();
  const { orders, refreshOrders, loadingOrders } = useQueue();

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) return;
    refreshOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const todayOrders = useMemo(() => {
    if (!isAdmin) return [];

    const today = new Date().toDateString();
    return (orders || []).filter((o) => {
      const orderDate = o?.timestamps?.order;
      if (!orderDate) return false;
      return new Date(orderDate).toDateString() === today;
    });
  }, [orders, isAdmin]);

  const totalPesanan = todayOrders.length;
  const totalPemasukan = todayOrders.reduce((sum, o) => sum + Number(o.totalPrice || 0), 0);
  const totalPelanggan = new Set(todayOrders.map((o) => o.customerName)).size;
  const totalSelesai = todayOrders.filter((o) => o.status === 'done').length;

  const topItems = useMemo(() => {
    if (!isAdmin) return [];

    const itemCount = {};
    todayOrders.forEach((o) => {
      const items = Array.isArray(o.items) ? o.items : [];
      items.forEach((item) => {
        itemCount[item.name] = (itemCount[item.name] || 0) + Number(item.qty || 0);
      });
    });
    return Object.entries(itemCount).sort((a, b) => b[1] - a[1]);
  }, [todayOrders, isAdmin]);

  // return guard taruh di bawah hooks
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <h1 className={styles.title}>History</h1>
            <span className={styles.dateLabel}>{formatDate(new Date())}</span>
          </div>

          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>🧾</span>
              <span className={styles.statValue}>{totalPesanan}</span>
              <span className={styles.statLabel}>Total Pesanan</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>💰</span>
              <span className={styles.statValue}>Rp {totalPemasukan.toLocaleString('id-ID')}</span>
              <span className={styles.statLabel}>Total Pemasukan</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>👥</span>
              <span className={styles.statValue}>{totalPelanggan}</span>
              <span className={styles.statLabel}>Total Pelanggan</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>✅</span>
              <span className={styles.statValue}>{totalSelesai}</span>
              <span className={styles.statLabel}>Pesanan Selesai</span>
            </div>
          </div>

          <div className={styles.bottomGrid}>
            <div className={styles.tableWrap}>
              <h2 className={styles.sectionTitle}>Pesanan Hari Ini</h2>

              {loadingOrders ? (
                <div className={styles.empty}>Loading...</div>
              ) : todayOrders.length === 0 ? (
                <div className={styles.empty}>Belum ada pesanan hari ini.</div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Pelanggan</th>
                      <th>Kasir</th>
                      <th>Item</th>
                      <th>Total</th>
                      <th>Bayar</th>
                      <th>Waktu</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayOrders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.number}</td>
                        <td>{order.customerName}</td>
                        <td>{order.kasirName || '-'}</td>
                        <td>{(order.items || []).map((i) => `${i.name} x${i.qty}`).join(', ')}</td>
                        <td>Rp {Number(order.totalPrice || 0).toLocaleString('id-ID')}</td>
                        <td>{order.payment || '-'}</td>
                        <td>{formatTime(order?.timestamps?.order)}</td>
                        <td>
                          <span
                            className={styles.badge}
                            style={{
                              background: (STATUS_COLOR[order.status] || '#999') + '22',
                              color: STATUS_COLOR[order.status] || '#999',
                            }}
                          >
                            {STATUS_LABEL[order.status] || order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className={styles.topItems}>
              <h2 className={styles.sectionTitle}>Item Terlaris</h2>

              {loadingOrders ? (
                <div className={styles.empty}>Loading...</div>
              ) : topItems.length === 0 ? (
                <div className={styles.empty}>Belum ada data.</div>
              ) : (
                <div className={styles.itemList}>
                  {topItems.map(([name, qty], i) => (
                    <div key={name} className={styles.itemRow}>
                      <div className={styles.itemLeft}>
                        <span className={styles.itemRank}>#{i + 1}</span>
                        <span className={styles.itemName}>{name}</span>
                      </div>
                      <span className={styles.itemQty}>{qty} terjual</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;