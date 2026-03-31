import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, ShoppingCart, Heart, User, ChevronDown,
  Menu, X, Bell, MessageSquare, LogOut, Package, Settings
} from 'lucide-react';
import { navCategories } from '../data/categories';
import './Header.css';

const languages = [
  { code: 'EN', flag: '/assets/Layout1/Image/flags/GB@2x.png', label: 'English, USD' },
  { code: 'DE', flag: '/assets/Layout1/Image/flags/DE@2x.png', label: 'Germany' },
  { code: 'FR', flag: '/assets/Layout1/Image/flags/FR@2x.png', label: 'France' },
  { code: 'US', flag: '/assets/Layout1/Image/flags/US@2x.png', label: 'United States' },
];

export default function Header({ cartCount = 0, user, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCat, setSearchCat] = useState('All categories');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownTimer = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false); setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
  };

  const openDropdown = (label) => { clearTimeout(dropdownTimer.current); setActiveDropdown(label); };
  const closeDropdown = () => { dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150); };
  const isActive = (to) => location.pathname === to;

  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-inner">
          <Link to="/" className="logo">
            <img src="/assets/Layout/Brand/logo-colored.png" alt="Zentra"
              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
            <span className="logo-fallback">Zentra</span>
          </Link>

          <form className="search-bar" onSubmit={handleSearch}>
            <select className="search-cat" value={searchCat} onChange={e => setSearchCat(e.target.value)}>
              {['All categories','Electronics','Clothing','Home & Interior','Sports','Beauty'].map(c=>(
                <option key={c}>{c}</option>
              ))}
            </select>
            <div className="search-divider" />
            <input type="text" className="search-input" placeholder="Search anything..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <button type="submit" className="search-btn"><Search size={18} /></button>
          </form>

          <div className="header-actions" ref={userMenuRef}>
            <div className="action-item user-action" onClick={() => setUserMenuOpen(v=>!v)}>
              <User size={20} />
              <div className="action-text">
                {user ? (
                  <><span className="action-top">Hi, {user.name.split(' ')[0]}</span><span className="action-bot">Account <ChevronDown size={11}/></span></>
                ) : (
                  <><span className="action-top">Sign in</span><span className="action-bot">Account <ChevronDown size={11}/></span></>
                )}
              </div>
              {userMenuOpen && (
                <div className="user-dropdown">
                  {user ? (
                    <>
                      <div className="user-dropdown-header">
                        <div className="user-avatar">{user.name[0]}</div>
                        <div><p className="ud-name">{user.name}</p><p className="ud-email">{user.email}</p></div>
                      </div>
                      <div className="user-dropdown-divider"/>
                      <Link to="/account/orders" className="ud-link"><Package size={14}/> My Orders</Link>
                      <Link to="/account" className="ud-link"><Settings size={14}/> Account Settings</Link>
                      <Link to="/wishlist" className="ud-link"><Heart size={14}/> Wishlist</Link>
                      <div className="user-dropdown-divider"/>
                      <button className="ud-link ud-logout" onClick={onLogout}><LogOut size={14}/> Sign Out</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="ud-auth-btn primary" onClick={()=>setUserMenuOpen(false)}>Sign In</Link>
                      <Link to="/signup" className="ud-auth-btn outline" onClick={()=>setUserMenuOpen(false)}>Create Account</Link>
                      <div className="user-dropdown-divider"/>
                      <Link to="/account/orders" className="ud-link"><Package size={14}/> Track Orders</Link>
                      <Link to="/wishlist" className="ud-link"><Heart size={14}/> Wishlist</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="#" className="action-item hide-mobile">
              <MessageSquare size={20} />
              <div className="action-text"><span className="action-top">Message</span><span className="action-bot">Contact us</span></div>
            </Link>

            <Link to="#" className="action-item hide-mobile">
              <div className="notif-wrap"><Bell size={20} /><span className="notif-dot" /></div>
              <div className="action-text"><span className="action-top">Notifications</span><span className="action-bot">Updates</span></div>
            </Link>

            <Link to="/cart" className="action-item cart-action">
              <div className="cart-wrap">
                <ShoppingCart size={20} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
              <div className="action-text">
                <span className="action-top">Cart</span>
                <span className="action-bot">{cartCount} item{cartCount!==1?'s':''}</span>
              </div>
            </Link>

            <button className="mobile-toggle" onClick={() => setMobileOpen(v=>!v)}>
              {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <div className="container header-nav-inner">
          <div className="all-cat-btn"
            onMouseEnter={() => openDropdown('__mega')}
            onMouseLeave={closeDropdown}>
            <Menu size={15}/><span>All Categories</span><ChevronDown size={13}/>
            {activeDropdown === '__mega' && (
              <div className="mega-menu"
                onMouseEnter={() => openDropdown('__mega')}
                onMouseLeave={closeDropdown}>
                {navCategories.find(n=>n.megaMenu)?.megaMenu.map(col=>(
                  <div key={col.title} className="mega-col">
                    <p className="mega-col-title">{col.icon} {col.title}</p>
                    {col.items.map(item=>(
                      <Link key={item.label} to={item.to} className="mega-link">{item.label}</Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="nav-links">
            {navCategories.map(nav=>(
              <div key={nav.label} className="nav-item"
                onMouseEnter={() => nav.dropdown && openDropdown(nav.label)}
                onMouseLeave={() => nav.dropdown && closeDropdown()}>
                <Link to={nav.to} className={`nav-link ${isActive(nav.to)?'active':''}`}>
                  {nav.label}
                  {nav.dropdown && <ChevronDown size={12} className="nav-chevron"/>}
                </Link>
                {nav.dropdown && activeDropdown===nav.label && (
                  <div className="nav-dropdown"
                    onMouseEnter={() => openDropdown(nav.label)}
                    onMouseLeave={closeDropdown}>
                    {nav.dropdown.map(item=>(
                      <Link key={item.label} to={item.to} className="nav-dropdown-link">{item.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="lang-selector" onClick={() => setLangMenuOpen(v=>!v)}>
            <img src={selectedLang.flag} alt={selectedLang.code} className="flag-img" onError={e=>e.target.style.display='none'}/>
            <span>{selectedLang.label}</span><ChevronDown size={12}/>
            {langMenuOpen && (
              <div className="lang-dropdown">
                {languages.map(l=>(
                  <button key={l.code} className="lang-option" onClick={()=>{setSelectedLang(l);setLangMenuOpen(false);}}>
                    <img src={l.flag} alt={l.code} className="flag-img" onError={e=>e.target.style.display='none'}/>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          {navCategories.map(nav=>(
            <Link key={nav.label} to={nav.to} className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>{nav.label}</Link>
          ))}
          <div className="mobile-menu-divider"/>
          {user ? (
            <button className="mobile-nav-link" onClick={()=>{onLogout();setMobileOpen(false);}}>Sign Out</button>
          ) : (
            <>
              <Link to="/login" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>Sign In</Link>
              <Link to="/signup" className="mobile-nav-link" onClick={()=>setMobileOpen(false)}>Create Account</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
