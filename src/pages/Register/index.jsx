import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../Login/Login.module.css';
import logo1 from '../../assets/images/bangunanHalf1.png'
import logo2 from '../../assets/images/stiker awan.png'

const Register = () => {
  const { register, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Jika sudah login, redirect ke home
  if (isLoggedIn) return <Navigate to="/" replace />;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password || !confirmPassword) {
      setError('Semua field wajib diisi.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }
    if (password.length < 4) {
      setError('Password minimal 4 karakter.');
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    const result = register(username, password);
    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Left - Form Panel */}
      <div className={styles.formPanel}>
        <h1 className={styles.brand}>OISHIGIRI</h1>
        <h2 className={styles.title}>REGISTER</h2>

        <form onSubmit={handleRegister} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="username">Input Username :</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="contoh: johndoe"
              autoComplete="username"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Input Password :</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          {/* Field tambahan — struktur identik dengan field di atas */}
          <div className={styles.field}>
            <label htmlFor="confirmPassword">Konfirmasi Password :</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? 'Mendaftar...' : 'REGISTER'}
          </button>
        </form>

        <div className={styles.hint}>
          <p>📝 Sudah punya akun?</p>
          <code
            onClick={() => navigate('/login')}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Klik di sini untuk Login
          </code>
        </div>
      </div>

      {/* Right - Illustration Panel */}
      <div className={styles.illustrationPanel}>
        <svg viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg" className={styles.illustration} preserveAspectRatio='xMidYMid slice'>
          <rect width="100%" height="100%" fill="#1a2744"/>
          <circle cx="450" cy="120" r="90" fill="#F02D2D" opacity="0.95"/>
          <image href={logo2} x="350" y="250" width="400" height="300" />
          <image
            href={logo1} x="0%" y="46%" width="60%" height="60%" preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};

export default Register;