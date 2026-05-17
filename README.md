# 🍙 OISHIGIRI — Sistem Pemesanan Onigiri

Aplikasi web untuk sistem pemesanan onigiri. Dibuat dengan React + React Router + CSS Modules.

---

## 📁 Struktur Folder

```
oishigiri/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── assets/
│   │   ├── images/             # Foto produk, banner, dll
│   │   └── icons/              # Icon SVG custom
│   │
│   ├── components/             # Komponen reusable
│   │   ├── Navbar/
│   │   │   ├── index.jsx
│   │   │   └── Navbar.module.css
│   │   ├── HeroBanner/         # (TODO)
│   │   ├── ProductCard/        # (TODO)
│   │   └── Footer/             # (TODO)
│   │
│   ├── context/
│   │   └── AuthContext.jsx     # Auth state global (login/logout)
│   │
│   ├── hooks/                  # Custom hooks (useCart, useProducts, dll)
│   │
│   ├── pages/
│   │   ├── Home/               # ✅ Sudah dibuat
│   │   ├── Login/              # ✅ Sudah dibuat (dummy auth)
│   │   ├── Register/           # 🔧 TODO
│   │   ├── Shop/               # 🔧 TODO
│   │   ├── Wishlist/           # 🔧 TODO
│   │   ├── About/              # 🔧 TODO
│   │   ├── ProductDetail/      # 🔧 TODO
│   │   ├── Cart/               # 🔧 TODO
│   │   ├── Checkout/           # 🔧 TODO
│   │   └── OrderConfirmation/  # 🔧 TODO
│   │
│   ├── services/               # API calls ke backend (nanti)
│   │   └── api.js              # Axios instance, endpoint functions
│   │
│   ├── utils/                  # Helper functions
│   │
│   ├── styles/
│   │   └── global.css          # CSS variables & reset global
│   │
│   ├── App.jsx                 # Router utama
│   └── index.js                # Entry point React
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Cara Menjalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Jalankan development server
```bash
npm start
```
Buka di browser: `http://localhost:3000`

---

## 🔐 Akun Dummy (sementara)

| Username | Password | Role  |
|----------|----------|-------|
| admin    | 1234     | Admin/Kasir |
| kasir    | 1234     | Admin/Kasir |
| user     | 1234     | Customer    |

> ⚠️ Akun dummy ini nanti diganti dengan API backend. Lihat `src/context/AuthContext.jsx`.

---

## 📤 Cara Upload ke GitHub

### Pertama kali (init repo baru):
```bash
# Di dalam folder oishigiri/
git init
git add .
git commit -m "feat: initial project structure + Login & Home page"

# Buat repo di GitHub dulu, lalu:
git remote add origin https://github.com/USERNAME/oishigiri.git
git branch -M main
git push -u origin main
```

### Update setelah ada perubahan:
```bash
git add .
git commit -m "feat: tambah halaman Shop"
git push
```

---

## 🧩 Pembagian Tugas Tim (Referensi File)

| Anggota | Halaman / File yang Dikerjakan |
|---------|-------------------------------|
| UI/UX Designer | Buat mockup di Figma, konsultasikan warna ke `global.css` |
| Home & Hero Banner | `src/pages/Home/`, `src/components/HeroBanner/` |
| Katalog Produk | `src/pages/Shop/`, `src/components/ProductCard/` |
| Detail Produk & Cart | `src/pages/ProductDetail/`, `src/pages/Cart/` |
| Login & Register | `src/pages/Login/`, `src/pages/Register/` |
| Checkout & Konfirmasi | `src/pages/Checkout/`, `src/pages/OrderConfirmation/` |
| Database & Data Dummy | `src/services/api.js`, data dummy di context |
| Backend API | Sambungkan ke `src/services/api.js` |
| Konten & Aset Visual | `src/assets/images/`, teks di setiap halaman |

---

## 🎨 Tech Stack

- **React 18** — UI framework
- **React Router v6** — routing / navigasi halaman
- **CSS Modules** — styling per komponen (tidak pakai Tailwind/Bootstrap, sudah cukup)
- **Context API** — state management auth (nanti bisa upgrade ke Zustand jika perlu)

### Kenapa CSS Modules, bukan Bootstrap/Tailwind?
- Lebih ringan, tidak ada class yang konflik antar anggota tim
- Setiap file `.module.css` terisolasi per komponen
- Mudah dipelajari untuk pemula
- Cocok untuk proyek tim kecil

---

## 📦 Build untuk Production

```bash
npm run build
```
Output ada di folder `/build` — bisa di-deploy ke Vercel, Netlify, atau server sendiri.
