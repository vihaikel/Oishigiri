import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

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
        <svg viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg" className={styles.illustration}>
          {/* Sky */}
          <rect width="600" height="700" fill="#1a2744"/>
          
          {/* Stars */}
          {[
            [80, 60], [160, 120], [240, 40], [320, 90], [420, 55], [500, 130],
            [550, 80], [50, 200], [130, 180], [450, 170], [540, 210],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2" fill="white" opacity="0.6"/>
          ))}

          {/* Red Moon */}
          <circle cx="450" cy="120" r="90" fill="#e63946" opacity="0.95"/>

          {/* Red Clouds */}
          <g fill="#e63946" opacity="0.85">
            {/* Cloud right */}
            <ellipse cx="510" cy="310" rx="55" ry="30"/>
            <ellipse cx="550" cy="295" rx="40" ry="25"/>
            <ellipse cx="475" cy="300" rx="35" ry="22"/>
            {/* Decorative curl */}
            <ellipse cx="545" cy="340" rx="20" ry="14"/>
          </g>

          {/* Pagoda - main tower */}
          {/* Base */}
          <rect x="220" y="560" width="160" height="140" fill="#2a5f65"/>
          {/* Tier 3 */}
          <rect x="210" y="490" width="180" height="80" fill="#2a5f65"/>
          <rect x="195" y="485" width="210" height="12" fill="#1a4045"/>
          {/* Tier 2 */}
          <rect x="230" y="420" width="140" height="80" fill="#2a5f65"/>
          <rect x="215" y="415" width="170" height="12" fill="#1a4045"/>
          {/* Tier 1 */}
          <rect x="250" y="370" width="100" height="58" fill="#2a5f65"/>
          <rect x="235" y="365" width="130" height="12" fill="#1a4045"/>
          {/* Roof top */}
          <polygon points="300,320 380,370 220,370" fill="#1a4045"/>
          {/* Spire */}
          <rect x="296" y="285" width="8" height="38" fill="#1a4045"/>

          {/* Windows / Lanterns */}
          {[
            [270, 440], [310, 440], [350, 440],
            [275, 510], [325, 510],
            [285, 580], [315, 580],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="20" height="16" fill="#fff" rx="2" opacity="0.85"/>
          ))}

          {/* Red accent stripes on pagoda */}
          <rect x="210" y="488" width="180" height="4" fill="#e63946" opacity="0.6"/>
          <rect x="215" y="418" width="170" height="4" fill="#e63946" opacity="0.6"/>
          <rect x="235" y="368" width="130" height="4" fill="#e63946" opacity="0.6"/>
        </svg>
      </div>
    </div>
  );
};

export default Login;
