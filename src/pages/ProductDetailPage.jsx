import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Share2, ChevronRight, Shield, Truck, RotateCcw, MessageCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { allProducts, clothProducts } from '../data/products';
import './ProductDetailPage.css';

function Stars({ rating, size=14 }) {
  return (
    <span className="detail-stars">
      {[1,2,3,4,5].map(i=>(
        <span key={i} style={{fontSize:size, color: i<=Math.floor(rating)?'var(--star)':'var(--border)'}}>★</span>
      ))}
    </span>
  );
}

const sizes = ['XS','S','M','L','XL','XXL'];
const colorOptions = ['#5C6AC4','#9B59B6','#E74C3C','#2ECC71','#F39C12'];
const specRows = [
  ['Color','Gray, Red, Blue, Black'],
  ['Material','Cotton, Wool Blend'],
  ['Weight','200g/m²'],
  ['Country of origin','Hong Kong'],
];

export default function ProductDetailPage({ onAddToCart, cartItems }) {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImg, setSelectedImg] = useState(0);

  const images = [product.image, ...allProducts.slice(0,4).map(p=>p.image)];

  const handleAddToCart = () => {
    onAddToCart && onAddToCart({ ...product, qty, size: selectedSize });
  };

  const related = allProducts.filter(p=>p.id !== product.id && p.category === product.category).slice(0,6);

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> <ChevronRight size={13}/>
          <Link to="/products">Clothing</Link> <ChevronRight size={13}/>
          <Link to="/products">Men's wear</Link> <ChevronRight size={13}/>
          <span>{product.name.slice(0,30)}...</span>
        </div>

        {/* Main product area */}
        <div className="detail-main">
          {/* Images */}
          <div className="detail-images">
            <div className="thumbs-col">
              {images.slice(0,5).map((img,i)=>(
                <button key={i} className={`thumb ${selectedImg===i?'active':''}`} onClick={()=>setSelectedImg(i)}>
                  <img src={img} alt="" onError={e=>e.target.style.display='none'}/>
                </button>
              ))}
            </div>
            <div className="main-img-wrap">
              <img src={images[selectedImg]} alt={product.name} className="main-img"
                onError={e=>{e.target.src='https://via.placeholder.com/400x400?text=No+Image';}}/>
              <button className="img-wishlist"><Heart size={18}/></button>
            </div>
          </div>

          {/* Info */}
          <div className="detail-info">
            <h1 className="detail-name">{product.name}</h1>
            <div className="detail-meta">
              <Stars rating={product.rating}/>
              <span className="detail-reviews">{product.reviews} reviews</span>
              <span className="detail-divider">|</span>
              <span className="detail-stock in-stock">In stock</span>
            </div>

            <div className="detail-pricing">
              <span className="detail-price">${product.price.toFixed(2)}</span>
              {product.oldPrice && <>
                <span className="detail-old-price">${product.oldPrice.toFixed(2)}</span>
                <span className="detail-discount">{product.badge}</span>
              </>}
            </div>

            <div className="detail-row">
              <span className="detail-label">Size:</span>
              <div className="size-options">
                {sizes.map(s=>(
                  <button key={s} className={`size-btn ${selectedSize===s?'active':''}`} onClick={()=>setSelectedSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="detail-row">
              <span className="detail-label">Color:</span>
              <div className="color-options">
                {colorOptions.map((c,i)=>(
                  <button key={i} className={`color-dot ${selectedColor===i?'active':''}`}
                    style={{background:c}} onClick={()=>setSelectedColor(i)}/>
                ))}
              </div>
            </div>

            <div className="detail-row">
              <span className="detail-label">Quantity:</span>
              <div className="qty-control">
                <button className="qty-btn" onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
                <input type="number" value={qty} min={1} readOnly className="qty-input"/>
                <button className="qty-btn" onClick={()=>setQty(q=>q+1)}>+</button>
              </div>
              <span className="qty-stock">Only {product.reviews > 100 ? 12 : 5} items left!</span>
            </div>

            <div className="detail-actions">
              <button className="btn btn-primary detail-cart-btn" onClick={handleAddToCart}>
                Add to cart
              </button>
              <button className="btn btn-outline detail-buy-btn">Buy now</button>
              <button className="detail-wish-btn"><Heart size={18}/></button>
            </div>

            {/* Shipping info */}
            <div className="detail-shipping">
              <div className="shipping-row">
                <Truck size={15}/>
                <span><strong>Free Delivery</strong> &nbsp; Enter your postal code for delivery availability</span>
              </div>
              <div className="shipping-row">
                <RotateCcw size={15}/>
                <span><strong>Return Delivery</strong> &nbsp; Free 30 Days returns. <a href="#">Details</a></span>
              </div>
            </div>
          </div>

          {/* Seller card */}
          <div className="seller-card">
            <div className="seller-header">
              <div className="seller-avatar">R</div>
              <div>
                <p className="seller-name">Supplier name</p>
                <Stars rating={4} size={12}/>
              </div>
            </div>
            <div className="seller-stats">
              <div><span>92%</span><small>Positive feedback</small></div>
              <div><span>3,500</span><small>Total orders</small></div>
            </div>
            <button className="btn btn-outline" style={{width:'100%',justifyContent:'center',marginBottom:8}}>
              <MessageCircle size={14}/> Contact supplier
            </button>
            <button className="btn" style={{width:'100%',justifyContent:'center',background:'var(--bg)',border:'1px solid var(--border)'}}>
              <Shield size={14}/> View profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="detail-tabs-section">
          <div className="detail-tabs">
            {['description','reviews','shipping','about'].map(t=>(
              <button key={t} className={`detail-tab-btn ${activeTab===t?'active':''}`}
                onClick={()=>setActiveTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
          <div className="detail-tab-content">
            {activeTab==='description' && (
              <div className="description-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <table className="spec-table">
                  <tbody>
                    {specRows.map(([k,v])=>(
                      <tr key={k}>
                        <td className="spec-key">{k}</td>
                        <td className="spec-val">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab==='reviews' && (
              <p style={{color:'var(--text-secondary)', padding:'20px 0'}}>No reviews yet. Be the first to review this product.</p>
            )}
            {activeTab==='shipping' && (
              <p style={{color:'var(--text-secondary)', padding:'20px 0'}}>Free standard shipping on orders over $50. Delivery in 5-7 business days.</p>
            )}
            {activeTab==='about' && (
              <p style={{color:'var(--text-secondary)', padding:'20px 0'}}>Trusted supplier with 10+ years of experience in quality goods.</p>
            )}
          </div>
        </div>

        {/* Related products */}
        <div className="related-section">
          <div className="section-header">
            <span className="section-title">Related products</span>
            <Link to="/products">View all</Link>
          </div>
          <div className="related-grid">
            {related.slice(0,6).map(p=><ProductCard key={p.id} product={p} onAddToCart={onAddToCart}/>)}
          </div>
        </div>

        {/* Discount banner */}
        <div className="discount-banner">
          <div className="discount-banner-left">
            <h3>Super discount on more than 100 USD</h3>
            <p>Have you ever finally decided to buy one of the things</p>
          </div>
          <button className="btn btn-orange">Shop now</button>
        </div>
      </div>
    </div>
  );
}
