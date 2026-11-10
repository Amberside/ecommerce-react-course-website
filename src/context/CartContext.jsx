import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products";

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

  function getCartItemWithProducts(){
    return cartItems.map(item => ({
      ...item,
      product: getProductById(item.id)
    })).filter(item => item.product);
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter(item => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: quantity } : item
    ));
  }

  function getCartTotal() {
    const total = cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
    console.log(typeof(total));
    return total.toFixed(2);
  }

  function clearCart() {
    setCartItems([]);
  }

  return ( <CartContext.Provider value={{ cartItems, addToCart, getCartItemWithProducts, removeFromCart, updateQuantity, getCartTotal, clearCart }}>
    { children }
  </CartContext.Provider>)
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
};