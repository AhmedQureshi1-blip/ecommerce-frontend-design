import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, Headphones, RotateCcw, Tag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { techProducts, clothProducts, interiorProducts } from '../data/products';
import './HomePage.css';

const heroCategories = [
  'Automobiles', 'Clothes and wear', 'Home interiors', 'Computer and tech',
  'Tools, equipments', 'Sports and outdoor', 'Animal and pets', 'Machinery tools', 'More category'
];

const dealTabs = [
  { label: 'All items' },
  { label: 'Watches' },
  { label: 'Laptops' },
  { label: 'Cameras' },
  { label: 'Headphones' },
];

const categoryGrid = [
  { name: 'Soft drinks, juice', sub: 'Visit now', img: '/assets/Image/backgrounds/image 98.png' },
  { name: 'Vegetables', sub: '24 items', img: '/assets/Image/interior/1.png' },
  { name: 'Meat & Fish', sub: '48 items', img: '/assets/Image/interior/3.png' },
  { name: 'Active garden', sub: '9 items', img: '/assets/Image/interior/6.png' },
  { name: 'Coffee table', sub: '23 items', img: '/assets/Image/interior/7.png' },
  { name: 'Clocks watches', sub: '12 items', img: '/assets/Image/tech/image 32.png' },
  { name: 'Laptops & PC', sub: '19 items', img: '/assets/Image/tech/image 34.png' },
  { name: 'SmartPhones', sub: '34 items', img: '/assets/Image/tech/image 23.png' },
  { name: 'Headphones', sub: '17 items', img: '/assets/Image/tech/image 85.png' },
  { name: 'Canon camera', sub: '11 items', img: '/assets/Image/tech/image 33.png' },
];

const categoryTabs = [
  { label: 'Home and interior', products: interiorProducts },
  { label: 'Consumer electronics', products: techProducts },
  { label: 'Clothing and apparel', products: clothProducts },
  { label: 'Jewellery and watches', products: techProducts.slice(0, 5) },
];

const consumerCategories = [
  { name: 'Smart watches', img: '/assets/Image/tech/image 32.png' },
  { name: 'Laptops', img: '/assets/Image/tech/image 34.png' },
  { name: 'GoPro cameras', img: '/assets/Image/tech/image 33.png' },
  { name: 'Headphones', img: '/assets/Image/tech/image 85.png' },
  { name: 'Canon cameras', img: '/assets/Image/tech/8.png' },
];

const services = [
  { icon: <Truck size={28}/>, title: 'Source from Industry Hubs', desc: '' },
  { icon: <Shield size={28}/>, title: 'Customize Your Products', desc: '' },
  { icon: <Tag size={28}/>, title: 'Fast, reliable shipping by ocean or air', desc: '' },
  { icon: <RotateCcw size={28}/>, title: 'Product Monitoring and After-sales Support', desc: '' },
];

const suppliers = [
  { name: 'Arabic Emirates', flag: '/assets/Layout1/Image/flags/AE@2x.png' },
  { name: 'Australia', flag: '/assets/Layout1/Image/flags/GB@2x.png' },
  { name: 'United States', flag: '/assets/Layout1/Image/flags/US@2x.png' },
  { name: 'Russia', flag: '/assets/Layout1/Image/flags/RU@2x.png' },
  { name: 'Italy', flag: '/assets/Layout1/Image/flags/IT@2x.png' },
  { name: 'Denmark', flag: '/assets/Layout1/Image/flags/DK@2x.png' },
  { name: 'France', flag: '/assets/Layout1/Image/flags/FR@2x.png' },
  { name: 'China', flag: '/assets/Layout1/Image/flags/CN@2x.png' },
  { name: 'Great Britain', flag: '/assets/Layout1/Image/flags/GB@2x.png' },
  { name: 'Germany', flag: '/assets/Layout1/Image/flags/DE@2x.png' },
];

export default function HomePage({ onAddToCart }) {
  const [activeDealTab, setActiveDealTab] = useState(0);
  const [activeCatTab, setActiveCatTab] = useState(0);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-inner">
          {/* Sidebar categories */}
          <aside className="hero-sidebar">
            <ul>
              {heroCategories.map(cat => (
                <li key={cat}>
                  <Link to="/products" className="hero-sidebar-link">
                    {cat} <ChevronRight size={14}/>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Hero banner */}
          <div className="hero-banner">
            <div className="hero-banner-content">
              <p className="hero-sub">Latest trending</p>
              <h1 className="hero-title">Electronic<br/>Items</h1>
              <Link to="/products" className="btn btn-outline hero-btn">Learn more</Link>
            </div>
            <img src="/assets/Image/backgrounds/Group 969.png" alt="Electronics" className="hero-banner-img"
              onError={e => { e.target.style.display='none'; }} />
          </div>

          {/* Hero sidebar right */}
          <div className="hero-right">
            <div className="hero-user-card">
              <p className="hero-user-greeting">Hi, user</p>
              <p className="hero-user-sub">Let's get started</p>
              <div className="hero-user-links">
                <a href="#">Join now</a>
                <span>|</span>
                <a href="#">Log in</a>
              </div>
            </div>
            <div className="hero-promo-cards">
              <div className="promo-card orange">
                <p>Get US $10 off</p>
                <span>with a new supplier</span>
              </div>
              <div className="promo-card blue">
                <p>Send quotes with</p>
                <span>buyer app for free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deals and offers */}
      <section className="section">
        <div className="container">
          <div className="deals-header">
            <div>
              <div className="section-title">Deals and offers</div>
              <p className="section-sub">Hygiene equipments</p>
            </div>
            <div className="deal-tabs">
              {dealTabs.map((t, i) => (
                <button key={i} className={`deal-tab ${activeDealTab === i ? 'active' : ''}`} onClick={() => setActiveDealTab(i)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="countdown">
              <span className="countdown-label">Offer ends in:</span>
              <div className="countdown-boxes">
                <div className="countdown-box"><span>04</span><small>Hours</small></div>
                <div className="countdown-box"><span>13</span><small>Mins</small></div>
                <div className="countdown-box"><span>34</span><small>Secs</small></div>
              </div>
            </div>
          </div>
          <div className="deals-grid">
            {techProducts.slice(0, 5).map(p => (
              <Link to={`/product/${p.id}`} key={p.id} className="deal-item">
                <img src={p.image} alt={p.name} onError={e=>e.target.style.display='none'}/>
                <p className="deal-name">{p.name.slice(0,18)}</p>
                <span className="deal-badge">{p.badge}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category sections */}
      <section className="section">
        <div className="container cat-sections">
          {/* Home & Interior */}
          <div className="cat-panel">
            <div className="cat-panel-header">
              <span className="cat-panel-title">Home and interior</span>
              <Link to="/products" className="cat-panel-link">Source now</Link>
            </div>
            <div className="cat-panel-grid">
              {interiorProducts.slice(0,4).map(p => (
                <Link to={`/product/${p.id}`} key={p.id} className="cat-panel-item">
                  <img src={p.image} alt={p.name} onError={e=>e.target.style.display='none'}/>
                  <span>{p.name.slice(0,16)}</span>
                  <small>From ${p.price}</small>
                </Link>
              ))}
            </div>
          </div>

          {/* Consumer electronics */}
          <div className="cat-panel">
            <div className="cat-panel-header">
              <span className="cat-panel-title">Consumer electronics</span>
              <Link to="/products" className="cat-panel-link">Source now</Link>
            </div>
            <div className="cat-panel-grid">
              {techProducts.slice(0,4).map(p => (
                <Link to={`/product/${p.id}`} key={p.id} className="cat-panel-item">
                  <img src={p.image} alt={p.name} onError={e=>e.target.style.display='none'}/>
                  <span>{p.name.slice(0,16)}</span>
                  <small>From ${p.price}</small>
                </Link>
              ))}
            </div>
          </div>

          {/* Clothing */}
          <div className="cat-panel">
            <div className="cat-panel-header">
              <span className="cat-panel-title">Clothing and apparel</span>
              <Link to="/products" className="cat-panel-link">Source now</Link>
            </div>
            <div className="cat-panel-grid">
              {clothProducts.slice(0,4).map(p => (
                <Link to={`/product/${p.id}`} key={p.id} className="cat-panel-item">
                  <img src={p.image} alt={p.name} onError={e=>e.target.style.display='none'}/>
                  <span>{p.name.slice(0,16)}</span>
                  <small>From ${p.price}</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blue request banner */}
      <section className="request-banner">
        <div className="container request-inner">
          <div className="request-left">
            <h2>An easy way to send<br/>requests to all suppliers</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod tempor incididunt</p>
            <Link to="#" className="btn btn-primary">Get started</Link>
            <img src="/assets/Image/backgrounds/Group 982.png" alt="" className="request-img" onError={e=>e.target.style.display='none'}/>
          </div>
          <div className="request-right">
            <h3>Send quote to suppliers</h3>
            <p>What item you need?</p>
            <input type="text" placeholder="What item you need?" className="quote-input"/>
            <p>What type?</p>
            <input type="text" placeholder="Item type" className="quote-input"/>
            <button className="btn btn-primary" style={{width:'100%',marginTop:8}}>Send inquiry</button>
          </div>
        </div>
      </section>

      {/* Recommended items */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-title">Recommended items</span>
            <Link to="/products">View all</Link>
          </div>
          <div className="products-grid-4">
            {[...techProducts, ...clothProducts].slice(0, 10).map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Extra services */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-title">Our extra services</span>
          </div>
          <div className="services-grid">
            {[
              { title: 'Source from Industry Hubs', img: '/assets/Image/backgrounds/image 106.png' },
              { title: 'Customize Your Products', img: '/assets/Image/backgrounds/image 107.png' },
              { title: 'Fast, reliable shipping by ocean or air', img: '/assets/Image/backgrounds/Mask group.png' },
              { title: 'Product Monitoring and After-sales Support', img: '/assets/Image/backgrounds/Mask group (1).png' },
            ].map((s, i) => (
              <div key={i} className="service-card">
                <img src={s.img} alt={s.title} onError={e=>e.target.style.display='none'}/>
                <p>{s.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers by region */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-title">Suppliers by region</span>
            <Link to="#">View all</Link>
          </div>
          <div className="suppliers-grid">
            {suppliers.map((s, i) => (
              <div key={i} className="supplier-item">
                <img src={s.flag} alt={s.name} className="supplier-flag" onError={e=>e.target.style.display='none'}/>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
