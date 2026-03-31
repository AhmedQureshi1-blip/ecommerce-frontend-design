import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="newsletter-bar">
        <div className="container newsletter-inner">
          <div className="newsletter-text">
            <h3>Subscribe on our newsletter</h3>
            <p>Get daily news on upcoming offers from many suppliers all over the world</p>
          </div>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Email" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/assets/Layout/Brand/logo-colored.png" alt="Zentra" className="footer-logo" onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='block';}}/>
            <span style={{display:'none'}} className="footer-logo-text">Zentra</span>
            <p>Zentra is your global marketplace for electronics, clothing, home decor, and more.</p>
            <div className="social-links">
              <a href="#"><Facebook size={16}/></a>
              <a href="#"><Twitter size={16}/></a>
              <a href="#"><Linkedin size={16}/></a>
              <a href="#"><Youtube size={16}/></a>
              <a href="#"><Instagram size={16}/></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <ul>
              {['About Us','Find store','Categories','Blogs'].map(l=><li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Partnership</h4>
            <ul>
              {['About Us','Find store','Categories','Blogs'].map(l=><li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Information</h4>
            <ul>
              {['Help Center','Money Refund','Shipping Info','Refunds'].map(l=><li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>For users</h4>
            <ul>
              {['Login','Register','Settings','My Orders'].map(l=><li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get app</h4>
            <img src="/assets/Layout/Misc/market-button.png" alt="App Store" className="app-badge" onError={e=>e.target.style.display='none'}/>
            <div className="app-buttons">
              <a href="#" className="store-btn">
                <span>🍎</span><span>App Store</span>
              </a>
              <a href="#" className="store-btn">
                <span>▶</span><span>Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2025 Zentra. All rights reserved.</span>
          <div className="footer-flags">
            {['US','GB','DE','FR','IT','RU','CN','AE'].map(f=>(
              <img key={f} src={`/assets/Layout1/Image/flags/${f}@2x.png`} alt={f} className="flag-sm" onError={e=>e.target.style.display='none'}/>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
