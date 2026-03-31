import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import './Auth.css';

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      // Simulate login
      onLogin({ name: 'John Doe', email: form.email });
      setLoading(false);
      navigate('/');
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/assets/Layout/Brand/logo-colored.png" alt="Zentra"
            onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='block';}}/>
          <span style={{display:'none'}} className="auth-logo-text">Zentra</span>
        </div>
        <h1 className="auth-title">Sign in to your account</h1>
        <p className="auth-sub">Welcome back! Please enter your details.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email address</label>
            <div className="auth-input-wrap">
              <Mail size={16} className="auth-input-icon"/>
              <input type="email" placeholder="you@example.com" value={form.email}
                onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
            </div>
          </div>
          <div className="auth-field">
            <div className="auth-field-header">
              <label>Password</label>
              <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
            </div>
            <div className="auth-input-wrap">
              <Lock size={16} className="auth-input-icon"/>
              <input type={showPass?'text':'password'} placeholder="Enter your password"
                value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))}/>
              <button type="button" className="show-pass" onClick={()=>setShowPass(v=>!v)}>
                {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
              </button>
            </div>
          </div>

          <label className="auth-remember">
            <input type="checkbox"/> <span>Remember me for 30 days</span>
          </label>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>
        <div className="social-auth">
          <button className="social-btn">🔵 Google</button>
          <button className="social-btn">🔷 Facebook</button>
        </div>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}
