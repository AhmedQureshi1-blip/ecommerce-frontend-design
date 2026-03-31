import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ChevronRight, MessageSquare, Shield, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { techProducts } from '../data/products';
import './CartPage.css';

export default function CartPage({ cartItems, setCartItems }) {
  const [coupon, setCoupon] = useState('');
  const [selectedAll, setSelectedAll] = useState(false);

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
  };

  const removeItem = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.oldPrice || item.price) - item.price) * item.qty, 0);
  const shipping = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> <ChevronRight size={13}/> <span>My cart</span>
        </div>

        <h1 className="cart-title">My cart ({cartItems.length})</h1>

        <div className="cart-layout">
          {/* Cart items */}
          <div className="cart-main">
            {/* Cart table header */}
            <div className="cart-table-header">
              <label className="cart-check-all">
                <input type="checkbox" checked={selectedAll} onChange={e=>setSelectedAll(e.target.checked)}/>
                <span>Select all items</span>
              </label>
              <button className="remove-selected-btn"><Trash2 size={14}/> Remove selected</button>
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty.</p>
                <Link to="/" className="btn btn-primary">Continue shopping</Link>
              </div>
            ) : (
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-left">
                      <input type="checkbox" checked={selectedAll} readOnly className="cart-item-check"/>
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.name} onError={e=>e.target.style.display='none'}/>
                      </div>
                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.name}</p>
                        <p className="cart-item-meta">Color: <span>{item.color}</span> &nbsp; Size: <span>{item.size}</span></p>
                        <div className="cart-item-actions-sm">
                          <button className="cart-action-sm"><Trash2 size={13}/> Remove</button>
                          <button className="cart-action-sm">Save for later</button>
                        </div>
                      </div>
                    </div>
                    <div className="cart-item-right">
                      <div className="cart-qty-control">
                        <button onClick={()=>updateQty(item.id, item.qty-1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={()=>updateQty(item.id, item.qty+1)}>+</button>
                      </div>
                      <div className="cart-item-pricing">
                        <span className="cart-item-price">${(item.price * item.qty).toFixed(2)}</span>
                        {item.oldPrice && <span className="cart-item-old">${(item.oldPrice * item.qty).toFixed(2)}</span>}
                      </div>
                      <button className="cart-remove-btn" onClick={()=>removeItem(item.id)}>
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Shipping info */}
            <div className="cart-shipping-info">
              <div className="shipping-feature">
                <MessageSquare size={18} color="var(--primary)"/>
                <div>
                  <p className="shipping-feature-title">Buyer Protection</p>
                  <p className="shipping-feature-desc">Get full refund if the item is not as described or if is not delivered</p>
                </div>
              </div>
              <div className="shipping-feature">
                <Shield size={18} color="var(--primary)"/>
                <div>
                  <p className="shipping-feature-title">Eligible for Free Delivery</p>
                  <p className="shipping-feature-desc">Get free delivery on all items in this store</p>
                </div>
              </div>
              <div className="shipping-feature">
                <Truck size={18} color="var(--primary)"/>
                <div>
                  <p className="shipping-feature-title">Fast delivery to you</p>
                  <p className="shipping-feature-desc">Get items in as fast as 2 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3 className="summary-title">Have a coupon?</h3>
              <div className="coupon-row">
                <input type="text" placeholder="Add coupon" value={coupon} onChange={e=>setCoupon(e.target.value)} className="coupon-input"/>
                <button className="btn btn-primary">Apply</button>
              </div>
            </div>

            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal ({cartItems.reduce((s,i)=>s+i.qty,0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="summary-row savings">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-text">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary checkout-btn">Proceed to Checkout</Link>
              <Link to="/" className="continue-shopping">← Continue Shopping</Link>
            </div>
          </div>
        </div>

        {/* Saved for later / Recommended */}
        <div className="saved-section">
          <div className="section-header">
            <span className="section-title">Saved for later</span>
            <Link to="/products">View all</Link>
          </div>
          <div className="saved-grid">
            {techProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p}/>)}
          </div>
        </div>

        {/* Discount banner */}
        <div className="discount-banner">
          <div>
            <h3>Super discount on more than 100 USD</h3>
            <p>Have you ever finally decided to buy one of the things</p>
          </div>
          <button className="btn btn-orange">Shop now</button>
        </div>
      </div>
    </div>
  );
}
