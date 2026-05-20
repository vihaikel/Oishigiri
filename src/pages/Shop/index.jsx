import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from './Shop.module.css';
import ProductCard from '../../components/Shop/ProductCard';

import paketHemat from '../../assets/images/PAKET HEMAT.png';
import original from '../../assets/images/original.png';
import okaka from '../../assets/images/okaka.png';
import mayo from '../../assets/images/tuna mayo.png';
import teriyaki from '../../assets/images/teriyaki.png';

const products = [
  { id: 1, name: 'PAKET HEMAT ONIGIRI', price: 'Rp 35.000,00', icon: paketHemat,
    description: 'Paket hemat berisi 3 onigiri pilihan dengan berbagai isian lezat.' },
  { id: 2, name: 'ONIGIRI ORIGINAL', price: 'Rp 10.000,00', icon: original,
    description: 'Onigiri klasik dengan nasi putih pulen berbentuk segitiga, dibungkus nori crispy.' },
  { id: 3, name: 'ONIGIRI OKAKA', price: 'Rp 15.000,00', icon: okaka,
    description: 'Onigiri dengan isian bonito flake yang gurih dan beraroma khas umami.' },
  { id: 4, name: 'ONIGIRI TERIYAKI', price: 'Rp 15.000,00', icon: teriyaki,
    description: 'Onigiri dengan isian ayam teriyaki manis-gurih yang juicy.' },
  { id: 5, name: 'ONIGIRI TUNA MAYO', price: 'Rp 15.000,00', icon: mayo,
    description: 'Onigiri favorit dengan isian tuna segar dicampur mayonaise Jepang yang creamy.' },
];

const Shop = () => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/shop/${product.id}`, { state: { product } });
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.shopSection}>
        <div className={styles.topCircle}></div>
        <div className={styles.leftDecor}></div>
        <div className={styles.rightDecor}></div>

        <div className={styles.container}>
          <h1 className={styles.title}>Discover Our Menu</h1>

          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;