import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Register.module.css';

const Register = () => {
  const { register, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

const handleRegister = async (e) => {
  e.preventDefault();
  setError('');

  const { name, username, email, password } = form;

  if (!name || !username || !email || !password) {
    setError('Semua field wajib diisi.');
    return;
  }

  setLoading(true);

  const result = await register(username, email, password);

  if (result.success) {
    navigate('/login', { replace: true });
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
        <h2 className={styles.title}>DAFTAR</h2>

        <form onSubmit={handleRegister} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="name">Nama Lengkap :</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              autoComplete="name"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="username">Username :</label>
            <input
              id="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              autoComplete="username"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email :</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password :</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <button type="submit" className={styles.registerBtn} disabled={loading}>
            {loading ? 'Mendaftar...' : 'DAFTAR'}
          </button>
        </form>

        <p className={styles.loginLink}>
          Sudah punya akun? <Link to="/login">Login di sini</Link>
        </p>
      </div>

      {/* Right - Illustration */}
      <div className={styles.illustrationPanel}>
        <svg viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg" className={styles.illustration}>
          <rect width="600" height="700" fill="#1a2744"/>
          {[[80,60],[160,120],[240,40],[320,90],[420,55],[500,130],[550,80],[50,200],[130,180],[450,170],[540,210]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="2" fill="white" opacity="0.6"/>
          ))}
          <circle cx="150" cy="120" r="90" fill="#e63946" opacity="0.95"/>
          <g fill="#e63946" opacity="0.85">
            <ellipse cx="90" cy="310" rx="55" ry="30"/>
            <ellipse cx="50" cy="295" rx="40" ry="25"/>
            <ellipse cx="125" cy="300" rx="35" ry="22"/>
            <ellipse cx="55" cy="340" rx="20" ry="14"/>
          </g>
          <rect x="220" y="560" width="160" height="140" fill="#2a5f65"/>
          <rect x="210" y="490" width="180" height="80" fill="#2a5f65"/>
          <rect x="195" y="485" width="210" height="12" fill="#1a4045"/>
          <rect x="230" y="420" width="140" height="80" fill="#2a5f65"/>
          <rect x="215" y="415" width="170" height="12" fill="#1a4045"/>
          <rect x="250" y="370" width="100" height="58" fill="#2a5f65"/>
          <rect x="235" y="365" width="130" height="12" fill="#1a4045"/>
          <polygon points="300,320 380,370 220,370" fill="#1a4045"/>
          <rect x="296" y="285" width="8" height="38" fill="#1a4045"/>
          {[[270,440],[310,440],[350,440],[275,510],[325,510],[285,580],[315,580]].map(([x,y],i) => (
            <rect key={i} x={x} y={y} width="20" height="16" fill="#fff" rx="2" opacity="0.85"/>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Register;