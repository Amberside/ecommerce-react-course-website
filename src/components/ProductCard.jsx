import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useCart();
  const cartItem = cartItems.find(item => item.id === product.id);
  return (
    <div className="product-card">
      <img src={product.image} className="product-card-image" alt={product.name}/>
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${product.price}</p>
        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-secondary">View Details</Link>
          <button className="btn btn-primary" onClick={() => addToCart(product.id)}>
            Add to Cart {cartItem && `(${cartItem.quantity})`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
