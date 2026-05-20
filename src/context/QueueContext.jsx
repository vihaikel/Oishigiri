import { createContext, useContext, useState } from 'react';

const QueueContext = createContext(null);

const STORAGE_KEY = 'oishigiri_queue';

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (orders) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const QueueProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => loadFromStorage());

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
    saveToStorage(newOrders);
  };

  const addOrder = ({ customerName, kasirName, payment, items, totalPrice }) => {
    const current = loadFromStorage();
    const nextNumber = current.length > 0 ? Math.max(...current.map(o => o.number)) + 1 : 1;
    const newOrder = {
      id: Date.now(),
      number: nextNumber,
      customerName,
      kasirName,
      payment,
      items,
      totalPrice,
      status: 'order',
      timestamps: {
        order: new Date(),
        proses: null,
        done: null,
      },
    };
    const updated = [...current, newOrder];
    updateOrders(updated);
    return newOrder;
  };

  const advanceStatus = (id) => {
    const updated = orders.map((o) => {
      if (o.id !== id) return o;
      const next = o.status === 'order' ? 'proses' : o.status === 'proses' ? 'done' : 'done';
      return { ...o, status: next, timestamps: { ...o.timestamps, [next]: new Date() } };
    });
    updateOrders(updated);
  };

  const removeOrder = (id) => {
    const removed = orders.find(o => o.id === id);
    const updated = orders
      .filter(o => o.id !== id)
      .map(o => o.number > removed.number ? { ...o, number: o.number - 1 } : o);
    updateOrders(updated);
  };

  const doneOrders = orders.filter(o => o.status === 'done');
  const activeOrders = orders.filter(o => o.status !== 'done');

  return (
    <QueueContext.Provider value={{
      orders,
      activeOrders,
      doneOrders,
      addOrder,
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