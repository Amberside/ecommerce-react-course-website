import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();


  useEffect(() => {
    const foundProduct = getProductById(id);
    
    if(!foundProduct) {
      navigate('/'); // Redirect to home if product not found
      return;
    }
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const cartItem = cartItems.find(item => item.id === product.id);

  return (
    <div className='page'>
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className="product-detail-content">
            <h1 className='product-detail-name'>{product?.name}</h1>
            <p className='product-detail-price'> Price: ${product?.price.toFixed(2)}</p>
            <p className='product-detail-description'>{product?.description}</p>
            <button className='btn btn-primary' onClick={() => addToCart(product.id)}>
              Add to Cart {cartItem && `(${cartItem.quantity})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;
