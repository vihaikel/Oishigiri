import styles from '../../pages/Shop/Shop.module.css';

const ProductCard = ({ product }) => {
    const imgSrc = product.icon || '';

    return (
        <div className={styles.productCard}>
            <div className={styles.productImage}>
                { imgSrc ? (
                    <img src={imgSrc} alt={product.name} />
                ) : (
                    <span style={{ fontSize: '3rem', opacity: 0.6 }}>🍙</span>
                )}
            </div>
            <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;