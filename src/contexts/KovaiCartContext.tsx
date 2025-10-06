import React, { createContext, useContext, useState, useEffect } from 'react';

export interface KovaiCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  gst_percentage: number;
}

interface KovaiCartContextType {
  items: KovaiCartItem[];
  addItem: (item: Omit<KovaiCartItem, 'quantity'>, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getGSTAmount: () => number;
  getTotal: () => number;
}

const KovaiCartContext = createContext<KovaiCartContextType | undefined>(undefined);

export const KovaiCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<KovaiCartItem[]>(() => {
    const saved = localStorage.getItem('kovai-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kovai-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<KovaiCartItem, 'quantity'>, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getGSTAmount = () => {
    return items.reduce((sum, item) => {
      const itemTotal = item.price * item.quantity;
      const gst = (itemTotal * item.gst_percentage) / 100;
      return sum + gst;
    }, 0);
  };

  const getTotal = () => {
    return getSubtotal() + getGSTAmount();
  };

  return (
    <KovaiCartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getSubtotal,
        getGSTAmount,
        getTotal,
      }}
    >
      {children}
    </KovaiCartContext.Provider>
  );
};

export const useKovaiCart = () => {
  const context = useContext(KovaiCartContext);
  if (!context) {
    throw new Error('useKovaiCart must be used within KovaiCartProvider');
  }
  return context;
};
