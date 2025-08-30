
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useCartSound } from '../hooks/useCartSound';

export interface Sweet {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegan?: boolean;
  isSugarFree?: boolean;
}

export interface CartItem extends Sweet {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  customerName: string;
  setCustomerName: (name: string) => void;
  addToCart: (sweet: Sweet, sourceElement?: HTMLElement) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isAnimating: boolean;
  animationSource: HTMLElement | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSource, setAnimationSource] = useState<HTMLElement | null>(null);
  const { playCartSound } = useCartSound();

  const addToCart = useCallback((sweet: Sweet, sourceElement?: HTMLElement) => {
    // Trigger animation and sound
    if (sourceElement) {
      setAnimationSource(sourceElement);
      setIsAnimating(true);
      playCartSound();
      
      // Reset animation after a delay
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationSource(null);
      }, 1200);
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === sweet.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === sweet.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...sweet, quantity: 1 }];
    });
  }, [playCartSound]);

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCustomerName('');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      customerName,
      setCustomerName,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      isAnimating,
      animationSource
    }}>
      {children}
    </CartContext.Provider>
  );
};
