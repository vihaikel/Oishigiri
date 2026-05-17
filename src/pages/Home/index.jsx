import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import styles from './Home.module.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <p className={styles.heroSub}>🍙 Freshly Made, Authentically Japanese</p>
          <h1 className={styles.heroTitle}>Hero Banner</h1>
          <p className={styles.heroDesc}>
            Selamat datang{user ? `, ${user.name}` : ''}! Temukan berbagai onigiri lezat kami.
          </p>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary}>Lihat Menu</button>
            <button className={styles.btnSecondary}>Pesan Sekarang</button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className={styles.heroDecor}>
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <svg className={styles.onigiriSvg} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Stylized onigiri shape */}
            <path d="M100 20 C60 20, 20 60, 20 110 C20 150, 50 175, 100 175 C150 175, 180 150, 180 110 C180 60, 140 20, 100 20Z"
              fill="white" opacity="0.08"/>
            <path d="M100 30 C65 30, 30 65, 30 110 C30 148, 58 168, 100 168 C142 168, 170 148, 170 110 C170 65, 135 30, 100 30Z"
              fill="none" stroke="white" strokeWidth="1.5" opacity="0.15"/>
            {/* Nori strip */}
            <rect x="45" y="120" width="110" height="35" rx="4" fill="#1a2744" opacity="0.5"/>
            <text x="100" y="143" textAnchor="middle" fill="white" fontSize="13" opacity="0.4" fontFamily="serif">OISHIGIRI</text>
          </svg>
        </div>
      </section>

      {/* Featured Section placeholder */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2>Menu Unggulan</h2>
          <p>Produk terlaris kami minggu ini</p>
        </div>
        <div className={styles.productGrid}>
          {['Salmon Onigiri', 'Tuna Mayo', 'Umeboshi', 'Natto', 'Chicken Teriyaki', 'Kombu'].map((name, i) => (
            <div key={i} className={styles.productCard}>
              <div className={styles.cardImg}>
                <span>🍙</span>
              </div>
              <div className={styles.cardBody}>
                <h3>{name}</h3>
                <p>Rp {(15000 + i * 3000).toLocaleString('id-ID')}</p>
                <button className={styles.addBtn}>+ Tambah</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
