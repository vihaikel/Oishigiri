import Navbar from '../../components/Navbar';
import styles from './Shop.module.css';
import ProductCard from '../../components/Shop/ProductCard';

import paketHemat from '../../assets/images/PAKET HEMAT.png';
import original from '../../assets/images/original.png';
import okaka from '../../assets/images/okaka.png';
import mayo from '../../assets/images/tuna mayo.png';
import teriyaki from '../../assets/images/teriyaki.png';


const products = [
  {
    name: 'PAKET HEMAT ONIGIRI',
    price: 'Rp 35.000,00',
    icon: paketHemat
  },
  {
    name: 'ONIGIRI ORIGINAL',
    price: 'Rp 10.000,00',
    icon: original
  },
  {
    name: 'ONIGIRI OKAKA',
    price: 'Rp 15.000,00',
    icon: okaka
  },
  {
    name: 'ONIGIRI TERIYAKI',
    price: 'Rp 15.000,00',
    icon: teriyaki
  },
  {
    name: 'ONIGIRI TUNA MAYO',
    price: 'Rp 15.000,00',
    icon: mayo
  }
]

const Shop = () => {
  // const { user } = useAuth();

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.shopSection}>
        {/* {Decorative} */}
        <div className={styles.topCircle}></div>
        <div className={styles.leftDecor}></div>
        <div className={styles.rightDecor}></div>

        <div className={styles.container}>
          <h1 className={styles.title}>Discover Our Menu</h1>

          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard
                key = {product.id}
                product = {product}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
  

};


export default Shop;
