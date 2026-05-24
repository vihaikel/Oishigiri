import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import styles from './Home.module.css';
import bgHero from '../../assets/images/trialbanner.png';

const Home = () => {
  const { user, isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      try {
        const res = await apiFetch('/products'); // BE: { data: [...] }
        setFeatured(res?.data || []);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const handleLihatMenu = () => navigate('/shop');

  const handlePesanSekarang = () => {
    if (!isLoggedIn) return navigate('/login');
    return navigate('/shop');
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.heroBanner} style={{ backgroundImage: `url(${bgHero})` }}>
        <div className={styles.heroContent}>
          <p className={styles.heroSub}>🍙 Experience the taste of authentic Japanese onigiri</p>
          <h1 className={styles.heroTitle}>Ready for a Bite?</h1>
          <p className={styles.heroDesc}>
            Hungry yet{user ? `, ${user.name}` : ''}? Let’s make your day better with fresh onigiri.
          </p>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} onClick={handleLihatMenu}>
              Lihat Menu
            </button>
            <button className={styles.btnSecondary} onClick={handlePesanSekarang}>
              Pesan Sekarang
            </button>
          </div>
        </div>

        <div className={styles.heroDecor}>
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2>Menu Unggulan</h2>
          <p>Produk terlaris kami minggu ini</p>
        </div>

        <div className={styles.productGrid}>
          {loading ? (
            <div>Loading...</div>
          ) : featured.length === 0 ? (
            <div>Belum ada produk.</div>
          ) : (
            featured.map((p) => (
              <div key={p.id} className={styles.productCard}>
                <div className={styles.cardImg}>
                  <span>🍙</span>
                </div>
                <div className={styles.cardBody}>
                  <h3>{p.name}</h3>
                  <p>Rp {Number(p.price || 0).toLocaleString('id-ID')}</p>
                  <button
                    className={styles.addBtn}
                    onClick={(e) => {
                      e.stopPropagation?.(); // aman kalau card bisa di-click
                      if (!isLoggedIn) return navigate('/login');
                      addToCart(p);
                    }}
                    title="Tambah ke keranjang"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;