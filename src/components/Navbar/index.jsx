import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const Navbar = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const { openCart, totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isKasir = user?.role === 'admin';

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Antrian', path: '/antrian' },
    { label: 'About', path: '/about' },
    // History hanya muncul untuk kasir
    ...(isKasir ? [{ label: 'History', path: '/history' }] : []),
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoCircle}>
          <span>Logo</span>
        </div>
        <span className={styles.brandName}>OISHIGIRI</span>
      </Link>

      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.navRight}>
        <button className={styles.iconBtn} aria-label="Search">
          <SearchIcon />
        </button>

        <button className={styles.iconBtn} aria-label="Cart" onClick={openCart} style={{ position: 'relative' }}>
          <CartIcon />
          {totalItems > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', right: '-4px',
              background: 'var(--color-primary)', color: 'white',
              fontSize: '0.65rem', fontWeight: '700', borderRadius: '50%',
              width: '16px', height: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {totalItems}
            </span>
          )}
        </button>

        <div className={styles.divider} />

        {isLoggedIn ? (
          <div className={styles.userArea}>
            <span className={styles.userName}>👋 {user.name}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>LOGOUT</button>
          </div>
        ) : (
          <>
            <Link to="/login" className={styles.loginBtn}>LOGIN</Link>
            <Link to="/register" className={styles.registerBtn}>REGISTER</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;