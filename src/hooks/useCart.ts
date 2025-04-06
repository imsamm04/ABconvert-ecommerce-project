import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Update localStorage whenever cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (item: { id: string; [key: string]: any }) => {
    setCart((prevCart: { id: string }[]) => [...prevCart, item]);
  };

  const removeItemFromCart = (itemId: string) => {
    setCart((prevCart: { id: string }[]) => prevCart.filter(item => item.id !== itemId));
  };

  return {
    cart,
    addItemToCart,
    removeItemFromCart,
  };
} 