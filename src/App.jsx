import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { QueueProvider } from './context/QueueContext';
import CartDrawer from './components/CartDrawer/CartDrawer';
import './styles/global.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Antrian from './pages/OrderConfirmation';
import History from './pages/History';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <>
    <CartDrawer />
    <Routes>
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about"    element={<About />} />
      <Route path="/shop"     element={<Shop />} />
      <Route path="/shop/:id" element={<ProductDetail />} />
      <Route path="/antrian"  element={<Antrian />} />

      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/history"  element={<ProtectedRoute><History /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <QueueProvider>
          <AppRoutes />
        </QueueProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;