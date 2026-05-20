import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import styles from './ItemDetail.module.css';

const ItemDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = state?.product;

  if (!product) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.notFound}>
          <p>Produk tidak ditemukan.</p>
          <button onClick={() => navigate('/shop')} className={styles.backBtn}>← Kembali ke Shop</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product); // ← drawer otomatis terbuka
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.detailSection}>
        <div className={styles.container}>
          <button className={styles.closeBtn} onClick={() => navigate('/shop')}>✕</button>
          <h2 className={styles.pageTitle}>{product.name}</h2>

          <div className={styles.detailGrid}>
            {/* Kiri: Foto Produk */}
            <div className={styles.imageWrapper}>
              <div className={styles.imageBox}>
                {product.icon ? (
                  <img src={product.icon} alt={product.name} className={styles.productImage} />
                ) : (
                  <span className={styles.imagePlaceholder}>🍙</span>
                )}
              </div>
            </div>

            {/* Kanan: Info Produk */}
            <div className={styles.infoBox}>
              <h1 className={styles.productName}>{product.name}</h1>
              <p className={styles.productPrice}>{product.price}</p>
              <p className={styles.productDesc}>{product.description}</p>

              <div className={styles.actions}>
                <button className={styles.btnCart} onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemDetail;
