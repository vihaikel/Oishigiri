import styles from '../../pages/Shop/Shop.module.css';

const ProductCard = ({ product }) => {
    return (
        <div className={styles.productCard}>
            <div className={styles.productImage}>
                <img src={product.icon} alt={product.name} />
            </div>
            <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;