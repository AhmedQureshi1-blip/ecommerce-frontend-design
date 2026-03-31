import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, ChevronDown, ChevronRight, Grid, List, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { allProducts } from '../data/products';
import './ProductListPage.css';

const brands = ['Samsung','Apple','Huawei','Pocco','Lenovo'];
const features = ['Metallic','Plastic cover','8GB Ram','Super power','Large Memory'];
const conditions = ['Any','Refurbished','Brand new','Old items'];
const ratings = [5,4,3,2,1];

function Stars({ count }) {
  return (
    <span className="filter-stars">
      {[1,2,3,4,5].map(i => <span key={i} className={i <= count ? 'star-on' : 'star-off'}>★</span>)}
    </span>
  );
}

function ProductListItem({ product }) {
  return (
    <div className="list-product-item">
      <div className="list-product-img">
        <img src={product.image} alt={product.name} onError={e=>{e.target.src='https://via.placeholder.com/200x200?text=No+Image';}}/>
        {product.badge && <span className="list-badge">{product.badge}</span>}
      </div>
      <div className="list-product-info">
        <Link to={`/product/${product.id}`} className="list-product-name">{product.name}</Link>
        <div className="list-product-rating">
          <Stars count={Math.floor(product.rating)} />
          <span>{product.reviews} reviews</span>
        </div>
        <div className="list-product-tags">
          {product.freeShipping && <span className="tag-green">Free Shipping</span>}
          <span className="tag-blue">In stock</span>
        </div>
        <p className="list-product-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip.</p>
      </div>
      <div className="list-product-action">
        <div className="list-product-pricing">
          <span className="list-price">${product.price.toFixed(2)}</span>
          {product.oldPrice && <span className="list-old-price">${product.oldPrice.toFixed(2)}</span>}
        </div>
        <Link to={`/product/${product.id}`} className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>View details</Link>
        <button className="wishlist-btn-sm"><Heart size={14}/> Save for later</button>
      </div>
    </div>
  );
}

export default function ProductListPage({ onAddToCart }) {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState('list');
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 9;

  const q = searchParams.get('q') || '';

  const filtered = useMemo(() => {
    let res = allProducts;
    if (q) res = res.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
    res = res.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedBrands.length > 0) res = res.filter(p => selectedBrands.some(b => p.name.toLowerCase().includes(b.toLowerCase())));
    if (sort === 'price-asc') res = [...res].sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') res = [...res].sort((a,b) => b.price - a.price);
    if (sort === 'rating') res = [...res].sort((a,b) => b.rating - a.rating);
    return res;
  }, [q, priceRange, selectedBrands, sort]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageItems = filtered.slice((page-1)*perPage, page*perPage);

  const toggleBrand = (b) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x=>x!==b) : [...prev, b]);

  return (
    <div className="product-list-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link> <ChevronRight size={13}/> <Link to="/products">Clothing</Link> <ChevronRight size={13}/> <span>Women's clothing</span>
        </div>

        <div className="list-layout">
          {/* Sidebar Filters */}
          <aside className="filter-sidebar">
            <div className="filter-section">
              <h4 className="filter-title">Category</h4>
              <ul className="filter-list">
                {['Mobile accessory','Electronics','Smartphones','Modern tech'].map(c => (
                  <li key={c}><Link to="/products" className="filter-link">{c}</Link></li>
                ))}
              </ul>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Brands</h4>
              <ul className="filter-list">
                {brands.map(b => (
                  <li key={b}>
                    <label className="filter-checkbox">
                      <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)}/>
                      <span>{b}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <button className="see-more-btn">See all <ChevronDown size={12}/></button>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Features</h4>
              <ul className="filter-list">
                {features.map(f => (
                  <li key={f}>
                    <label className="filter-checkbox">
                      <input type="checkbox"/>
                      <span>{f}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <button className="see-more-btn">See all <ChevronDown size={12}/></button>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Price range</h4>
              <div className="price-inputs">
                <input type="number" value={priceRange[0]} onChange={e=>setPriceRange([+e.target.value, priceRange[1]])} className="price-input" placeholder="Min"/>
                <span>–</span>
                <input type="number" value={priceRange[1]} onChange={e=>setPriceRange([priceRange[0], +e.target.value])} className="price-input" placeholder="Max"/>
              </div>
              <button className="btn btn-primary" style={{width:'100%', marginTop:8, justifyContent:'center'}} onClick={()=>setPage(1)}>Apply</button>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Condition</h4>
              <ul className="filter-list">
                {conditions.map(c => (
                  <li key={c}>
                    <label className="filter-checkbox">
                      <input type="radio" name="condition"/>
                      <span>{c}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Ratings</h4>
              <ul className="filter-list">
                {ratings.map(r => (
                  <li key={r}>
                    <label className="filter-checkbox">
                      <input type="radio" name="rating"/>
                      <Stars count={r}/> <span>&amp; up</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-section">
              <h4 className="filter-title">Manufacturer</h4>
              <ul className="filter-list">
                {['Samsung','Apple','Huawei','Poco'].map(m => (
                  <li key={m}><label className="filter-checkbox"><input type="checkbox"/><span>{m}</span></label></li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <div className="list-main">
            {/* Toolbar */}
            <div className="list-toolbar">
              <div className="list-toolbar-left">
                <span className="results-count">{filtered.length} items in <strong>Mobile accessory</strong></span>
              </div>
              <div className="list-toolbar-right">
                <label className="sort-label">
                  Verified only
                  <input type="checkbox" style={{marginLeft:4}}/>
                </label>
                <select value={sort} onChange={e=>{setSort(e.target.value); setPage(1);}} className="sort-select">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <div className="view-btns">
                  <button className={`view-btn ${view==='grid'?'active':''}`} onClick={()=>setView('grid')}><Grid size={16}/></button>
                  <button className={`view-btn ${view==='list'?'active':''}`} onClick={()=>setView('list')}><List size={16}/></button>
                </div>
              </div>
            </div>

            {/* Active filters */}
            <div className="active-filters">
              {['iPhone','Samsung','Headphone','Red color','Large size','In stock'].map(f => (
                <span key={f} className="active-filter">{f} <button onClick={()=>{}} className="remove-filter">×</button></span>
              ))}
              <button className="clear-all">Clear all filters</button>
            </div>

            {/* Products */}
            {view === 'list' ? (
              <div className="list-products">
                {pageItems.map(p => <ProductListItem key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="grid-products">
                {pageItems.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart}/>)}
              </div>
            )}

            {/* Pagination */}
            <div className="pagination">
              <button className="page-btn" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
              {Array.from({length: totalPages}, (_,i) => i+1).map(n => (
                <button key={n} className={`page-btn ${page===n?'active':''}`} onClick={()=>setPage(n)}>{n}</button>
              ))}
              <button className="page-btn" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
