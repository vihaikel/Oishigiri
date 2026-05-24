import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import styles from './ItemDetail.module.css';
import { apiFetch } from '../../services/api.js';
import { formatPrice } from '../../utils/format.js';

const ItemDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(state?.product || null);
  const [loading, setLoading] = useState(!state?.product);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDetail = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await apiFetch(`/products/${id}`);
        const p = res?.data;

        if (!active) return;

        const mapped = {
          id: p.id,
          name: p.name,
          description: p.description || "",
          price: formatPrice(p.price),
          icon: p.imageUrl || null,
        };
        setProduct(mapped);
      } catch (err) {
        if (!active) return;
        setError(err.message || "Produk tidak ditemukan");
        setProduct(null);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };

    if (!product && id) {
      loadDetail();
    }

    return () => { active = false; };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.notFound}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.notFound}>
          <p>{error || "Produk tidak ditemukan."}</p>
          <button onClick={() => navigate('/shop')} className={styles.backBtn}>← Kembali ke Shop</button>
        </div>
      </div>
    );
  }

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
