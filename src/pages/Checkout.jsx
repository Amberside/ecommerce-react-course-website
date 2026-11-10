import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { getCartItemWithProducts, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const cartItems = getCartItemWithProducts();
  const cartTotal = Number(getCartTotal());
  console.log(typeof(cartTotal));

  function placeOrder(){
    alert('Order placed successfully!');
    clearCart();
  }

  return (
    <div className='page'>
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {
              cartItems.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="checkout-item-image" 
                  />
                  <h3 className="checkout-item-name">{item.product.name}</h3>
                  <p className="checkout-item-price">${item.product.price.toFixed(2)} each</p>
                  <div className="checkout-item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="checkout-item-total">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <button className="btn btn-secondary btn-small" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="checkout-summary">
            <h2 className="checkout-section-title">Total</h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value">${cartTotal.toFixed(2)}</p>             
            </div>
            <div className="Checkout-total">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value checkout-total-final">${cartTotal.toFixed(2)}</p> 
            </div>
            <button className="btn btn-primary btn-large btn-block" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;