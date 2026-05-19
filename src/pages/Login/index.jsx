import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';
import logo1 from '../../assets/images/bangunanHalf1.png'
import logo2 from '../../assets/images/stiker awan.png'

const Login = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Jika sudah login, redirect ke home
  if (isLoggedIn) return <Navigate to="/" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Username dan password wajib diisi.');
      return;
    }
    setLoading(true);
    // Simulasi delay seperti API call
    await new Promise((res) => setTimeout(res, 600));
    const result = login(username, password);
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
        <h2 className={styles.title}>LOGIN</h2>

        <form onSubmit={handleLogin} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="username">Input Username :</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="contoh: admin"
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
              autoComplete="current-password"
            />
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? 'Masuk...' : 'LOGIN'}
          </button>
        </form>

        {/* Hint akun dummy */}
        <div className={styles.hint}>
          <p>🔑 Dummy accounts:</p>
          <code>admin / 1234 &nbsp;|&nbsp; kasir / 1234 &nbsp;|&nbsp; user / 1234</code>
        </div>
      </div>

      {/* Right - Illustration Panel */}
      <div className={styles.illustrationPanel}>
        {/* Japanese night scene SVG */}
        <svg viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg" className={styles.illustration} preserveAspectRatio='xMidYMid slice'>
          {/* Sky */}
          <rect width="100%" height="100%" fill="#1a2744"/>
          
          {/* Stars */}
          {/* {[
            [80, 60], [160, 120], [240, 40], [320, 90], [420, 55], [500, 130],
            [550, 80], [50, 200], [130, 180], [450, 170], [540, 210],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2" fill="white" opacity="0.6"/>
          ))} */}

          {/* Red Moon */}
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

export default Login;
