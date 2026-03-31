import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './ProductCard.css';

function Stars({ rating }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`star ${i <= Math.floor(rating) ? 'filled' : i - 0.5 <= rating ? 'half' : ''}`}>★</span>
      ))}
    </div>
  );
}

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-card-img-wrap">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="product-card-img"
            onError={e => { e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'; }} />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="product-wishlist"><Heart size={15}/></button>
      </div>
      <div className="product-card-body">
        <Link to={`/product/${product.id}`} className="product-card-name">{product.name}</Link>
        <div className="product-card-rating">
          <Stars rating={product.rating} />
          <span className="product-card-reviews">({product.reviews})</span>
        </div>
        <div className="product-card-pricing">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          {product.oldPrice && <span className="product-card-old">${product.oldPrice.toFixed(2)}</span>}
        </div>
        {product.freeShipping && <span className="free-shipping">Free Shipping</span>}
      </div>
    </div>
  );
}
