import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import './Auth.css';

export default function SignupPage({ onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    setTimeout(() => {
      onLogin({ name: form.name, email: form.email });
      setLoading(false);
      navigate('/');
    }, 800);
  };

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/assets/Layout/Brand/logo-colored.png" alt="Zentra"
            onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='block';}}/>
          <span style={{display:'none'}} className="auth-logo-text">Zentra</span>
        </div>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Join thousands of buyers and sellers worldwide.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Full name</label>
            <div className="auth-input-wrap">
              <User size={16} className="auth-input-icon"/>
              <input type="text" placeholder="John Doe" value={form.name} onChange={set('name')}/>
            </div>
          </div>
          <div className="auth-field">
            <label>Email address</label>
            <div className="auth-input-wrap">
              <Mail size={16} className="auth-input-icon"/>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')}/>
            </div>
          </div>
          <div className="auth-field">
            <label>Password</label>
            <div className="auth-input-wrap">
              <Lock size={16} className="auth-input-icon"/>
              <input type={showPass?'text':'password'} placeholder="Min. 6 characters"
                value={form.password} onChange={set('password')}/>
              <button type="button" className="show-pass" onClick={()=>setShowPass(v=>!v)}>
                {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
              </button>
            </div>
          </div>
          <div className="auth-field">
            <label>Confirm password</label>
            <div className="auth-input-wrap">
              <Lock size={16} className="auth-input-icon"/>
              <input type="password" placeholder="Repeat your password"
                value={form.confirm} onChange={set('confirm')}/>
            </div>
          </div>

          <label className="auth-remember">
            <input type="checkbox" required/>
            <span>I agree to the <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link></span>
          </label>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider"><span>or sign up with</span></div>
        <div className="social-auth">
          <button className="social-btn">🔵 Google</button>
          <button className="social-btn">🔷 Facebook</button>
        </div>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
