import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from './About.module.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <Navbar />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Tentang Oishigiri</p>
          <h1 className={styles.title}>Onigiri fresh, cepat, dan nyaman untuk semua.</h1>
          <p className={styles.subtitle}>
            Oishigiri adalah aplikasi pemesanan onigiri yang fokus pada kualitas bahan, proses yang rapi,
            dan pengalaman order yang sederhana.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Cerita Singkat</h2>
          <p className={styles.text}>
            Kami terinspirasi dari onigiri sebagai comfort food yang praktis: sederhana, mengenyangkan,
            dan bisa dinikmati kapan saja. Di Oishigiri, kami menjaga rasa dan konsistensi—mulai dari
            nasi yang pulen, nori yang pas, sampai isian yang dibuat fresh.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Kontak</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>hello@oishigiri.local</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Instagram</span>
              <span className={styles.contactValue}>@oishigiri</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Jam Operasional</span>
              <span className={styles.contactValue}>10:00 - 21:00</span>
            </div>
          </div>

          <div className={styles.ctaBox}>
            <div>
              <h3 className={styles.ctaTitle}>Siap pesan sekarang?</h3>
              <p className={styles.text}>Langsung cek menu dan buat pesanan pertamamu.</p>
            </div>
            <button className={styles.primaryBtn} onClick={() => navigate('/shop')}>
              Pesan Sekarang
            </button>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Oishigiri</span>
      </footer>
    </div>
  );
};

export default About;