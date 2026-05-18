import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styles from '../../pages/Shop/Shop.module.css';

const ProductCard = ({ product }) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className={styles.productCard}>
            <button 
                type="fav" 
                className={styles.heartButton} 
                onClick={() => setLiked(!liked)}
            >
                {liked ? (
                    <FaHeart className={styles.heartActive} />
                ) : (
                    <FaRegHeart className={styles.heartIcon} />
                )}
            </button>

            <div 
                className={styles.productImage}
            >
                <img 
                    src={product.icon}
                    alt={product.name}
                />
            </div>

            <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
            </div>

        </div>
    );
};

export default ProductCard;