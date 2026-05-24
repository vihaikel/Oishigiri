import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from './Shop.module.css';
import ProductCard from '../../components/Shop/ProductCard';
import { apiFetch } from '../../services/api.js';
import { formatPrice } from '../../utils/format.js';

// const products = [
//   { id: 1, name: 'PAKET HEMAT ONIGIRI', price: 'Rp 35.000,00', icon: paketHemat,
//     description: 'Paket hemat berisi 3 onigiri pilihan dengan berbagai isian lezat.' },
//   { id: 2, name: 'ONIGIRI ORIGINAL', price: 'Rp 10.000,00', icon: original,
//     description: 'Onigiri klasik dengan nasi putih pulen berbentuk segitiga, dibungkus nori crispy.' },
//   { id: 3, name: 'ONIGIRI OKAKA', price: 'Rp 15.000,00', icon: okaka,
//     description: 'Onigiri dengan isian bonito flake yang gurih dan beraroma khas umami.' },
//   { id: 4, name: 'ONIGIRI TERIYAKI', price: 'Rp 15.000,00', icon: teriyaki,
//     description: 'Onigiri dengan isian ayam teriyaki manis-gurih yang juicy.' },
//   { id: 5, name: 'ONIGIRI TUNA MAYO', price: 'Rp 15.000,00', icon: mayo,
//     description: 'Onigiri favorit dengan isian tuna segar dicampur mayonaise Jepang yang creamy.' },
// ];

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await apiFetch('/products');
        const list = res?.data || [];

        if (!active) return;

        const mapped = list.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description || "",
          price: formatPrice(p.price),
          icon: p.imageUrl || null,
        }));
        setProducts(mapped);
      } catch (err) {
        if (!active) return;
        setError(err.message || "Failed to load products");
      } finally {
        if (active) return;
        setLoading(false);
      }
  };

  load();
  return () => { active = false; };
}, []);

const handleProductClick = (product) => {
  navigate(`/shop/${product.id}`, { state: { product } });
};

const content = useMemo(() => {
  if (loading) return <div style={{ color: "white", textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ color: "white", textAlign: "center" }}>{error}</div>;
  if (products.length === 0) return <div style={{ color: "white", textAlign: "center" }}>Produk belum tersedia.</div>;

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => handleProductClick(product)}
          style={{ cursor: "pointer" }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}, [products, loading, error]);

return (
  <div className={styles.page}>
    <Navbar />

    <section className={styles.shopSection}>
      <div className={styles.topCircle}></div>
      <div className={styles.leftDecor}></div>
      <div className={styles.rightDecor}></div>

      <div className={styles.container}>
        <h1 className={styles.title}>Discover Our Menu</h1>
        {content}
      </div>
    </section>
  </div>
)
}

export default Shop;