import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { advanceOrderStatus, fetchOrders, removeOrder as apiRemoveOrder } from '../services/orderApi.js';

const QueueContext = createContext(null);

export const QueueProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const isKasir = user?.role === 'admin';

  const refreshOrders = async () => {
    if (!token) {
      setOrders([]);
      return;
    }
    setLoadingOrders(true);
    try {
      const res = await fetchOrders({ token });
      setOrders(res?.data || []);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, [token, user?.role]);

  const activeOrders = useMemo(
    () => orders.filter(o => o.status !== 'done'),
    [orders]
  );

  const doneOrders = useMemo(
    () => orders.filter(o => o.status === 'done'),
    [orders]
  );

  const advanceStatus = async (orderId) => {
    if (!token) throw new Error("Silahkan login terlebih dahulu");
    if (!isKasir) throw new Error("Forbidden");

    await advanceOrderStatus({ token, orderId });
    await refreshOrders();
  };

  const removeOrder = async (orderId) => {
    if (!token) throw new Error("Silahkan login terlebih dahulu");
    if (!isKasir) throw new Error("Forbidden");

    await apiRemoveOrder({ token, orderId });
    await refreshOrders();
  };

  return (
    <QueueContext.Provider value={{
      orders,
      loadingOrders,
      refreshOrders,
      activeOrders,
      doneOrders,
      advanceStatus,
      removeOrder,
    }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const ctx = useContext(QueueContext);
  if (!ctx) throw new Error('useQueue must be used within QueueProvider');
  return ctx;
};