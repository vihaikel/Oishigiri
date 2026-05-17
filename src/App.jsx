import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/global.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

// Route guard: halaman yang butuh login
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login"    element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/about"    element={<About />} />
    <Route path="/shop"     element={<Shop />} />

    {/* Protected routes */}
    <Route path="/" element={
      <ProtectedRoute><Home /></ProtectedRoute>
    }/>
    <Route path="/wishlist" element={
      <ProtectedRoute><Wishlist /></ProtectedRoute>
    }/>
    <Route path="/product/:id" element={
      <ProtectedRoute><ProductDetail /></ProtectedRoute>
    }/>
    <Route path="/cart" element={
      <ProtectedRoute><Cart /></ProtectedRoute>
    }/>
    <Route path="/checkout" element={
      <ProtectedRoute><Checkout /></ProtectedRoute>
    }/>
    <Route path="/order-confirmation" element={
      <ProtectedRoute><OrderConfirmation /></ProtectedRoute>
    }/>

    {/* Catch-all */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
