import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

// Wrapper component
export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // {id, quantity}

  function addToCart(productId) {
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      const currentQuantity = existingItem.quantity;
      const updateCartItems = cartItems.map(item => 
        item.id === productId ? { ...item, quantity: currentQuantity + 1 } : item);
      setCartItems(updateCartItems);
    } else {
      // setCartItems(prevItems => {
      //   return [...prevItems, { id: productId, quantity: 1 }];
      // });
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }

  }

  return ( <CartContext.Provider value={{ cartItems, addToCart }}>
    { children }
  </CartContext.Provider>)
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
};