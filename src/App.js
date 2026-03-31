import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import { cartItems as initialCart } from './data/products';

export default function App() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + (product.qty || 1) } : i);
      }
      return [...prev, { ...product, qty: product.qty || 1, color: product.color || 'Default', size: product.size || 'M' }];
    });
  };

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} user={user} onLogout={() => setUser(null)} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
          <Route path="/products" element={<ProductListPage onAddToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage onAddToCart={addToCart} cartItems={cartItems} />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/signup" element={<SignupPage onLogin={setUser} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
