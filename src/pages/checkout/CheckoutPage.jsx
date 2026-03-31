import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, CreditCard, CheckCircle, Lock, Truck } from 'lucide-react';
import './CheckoutPage.css';

const STEPS = ['Shipping', 'Payment', 'Confirmation'];

function StepIndicator({ current }) {
  return (
    <div className="step-indicator">
      {STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div className={`step-item ${i < current ? 'done' : i === current ? 'active' : ''}`}>
            <div className="step-circle">
              {i < current ? <CheckCircle size={16}/> : <span>{i + 1}</span>}
            </div>
            <span className="step-label">{step}</span>
          </div>
          {i < STEPS.length - 1 && <div className={`step-line ${i < current ? 'done' : ''}`}/>}
        </React.Fragment>
      ))}
    </div>
  );
}

function ShippingStep({ data, onChange, onNext }) {
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (!data.firstName) e.firstName = 'Required';
    if (!data.lastName) e.lastName = 'Required';
    if (!data.email) e.email = 'Required';
    if (!data.address) e.address = 'Required';
    if (!data.city) e.city = 'Required';
    if (!data.zip) e.zip = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const next = () => { if (validate()) onNext(); };

  const Field = ({ label, name, type='text', placeholder, half }) => (
    <div className={`co-field ${half?'half':''}`}>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} value={data[name]||''}
        onChange={e=>onChange(name, e.target.value)}
        className={errors[name]?'error':''}/>
      {errors[name] && <span className="field-error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="checkout-step">
      <h2 className="step-title"><MapPin size={18}/> Shipping Address</h2>
      <div className="co-form">
        <div className="co-row">
          <Field label="First name" name="firstName" placeholder="John" half/>
          <Field label="Last name" name="lastName" placeholder="Doe" half/>
        </div>
        <Field label="Email address" name="email" type="email" placeholder="you@example.com"/>
        <Field label="Phone number" name="phone" type="tel" placeholder="+1 (555) 000-0000"/>
        <Field label="Street address" name="address" placeholder="123 Main Street"/>
        <Field label="Apartment, suite, etc. (optional)" name="address2" placeholder="Apt 4B"/>
        <div className="co-row">
          <Field label="City" name="city" placeholder="New York" half/>
          <Field label="ZIP / Postal code" name="zip" placeholder="10001" half/>
        </div>
        <div className="co-field">
          <label>Country</label>
          <select value={data.country||'US'} onChange={e=>onChange('country',e.target.value)}>
            {['US','GB','DE','FR','AE','PK','CN','IT'].map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="co-field">
          <label>Shipping method</label>
          <div className="shipping-options">
            {[
              { id:'standard', label:'Standard Shipping', detail:'5–7 business days', price:'Free' },
              { id:'express', label:'Express Shipping', detail:'2–3 business days', price:'$9.99' },
              { id:'overnight', label:'Overnight Shipping', detail:'Next business day', price:'$19.99' },
            ].map(opt=>(
              <label key={opt.id} className={`shipping-opt ${(data.shipping||'standard')===opt.id?'selected':''}`}>
                <input type="radio" name="shipping" value={opt.id}
                  checked={(data.shipping||'standard')===opt.id}
                  onChange={()=>onChange('shipping',opt.id)}/>
                <div className="shipping-opt-info">
                  <div className="shipping-opt-left">
                    <Truck size={15}/>
                    <div><p className="so-label">{opt.label}</p><p className="so-detail">{opt.detail}</p></div>
                  </div>
                  <span className="so-price">{opt.price}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="step-actions">
        <Link to="/cart" className="btn-back">← Back to Cart</Link>
        <button className="btn btn-primary step-next-btn" onClick={next}>Continue to Payment →</button>
      </div>
    </div>
  );
}

function PaymentStep({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const validate = () => {
    const e = {};
    if (!data.cardName) e.cardName = 'Required';
    if (!data.cardNumber || data.cardNumber.replace(/\s/g,'').length < 16) e.cardNumber = 'Invalid card number';
    if (!data.expiry) e.expiry = 'Required';
    if (!data.cvv || data.cvv.length < 3) e.cvv = 'Invalid CVV';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const next = () => { if (validate()) onNext(); };

  const formatCard = (val) => val.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g,'').slice(0,4);
    return clean.length>2 ? clean.slice(0,2)+'/'+clean.slice(2) : clean;
  };

  return (
    <div className="checkout-step">
      <h2 className="step-title"><CreditCard size={18}/> Payment Details</h2>
      <div className="secure-badge"><Lock size={13}/> Secured by 256-bit SSL encryption</div>

      <div className="payment-methods">
        {['Credit Card','PayPal','Bank Transfer'].map(m=>(
          <label key={m} className={`pay-method ${(data.method||'Credit Card')===m?'selected':''}`}>
            <input type="radio" name="method" value={m} checked={(data.method||'Credit Card')===m}
              onChange={()=>onChange('method',m)}/>
            <span>{m}</span>
          </label>
        ))}
      </div>

      {(data.method||'Credit Card')==='Credit Card' && (
        <div className="co-form">
          <div className="co-field">
            <label>Name on card</label>
            <input placeholder="John Doe" value={data.cardName||''}
              onChange={e=>onChange('cardName',e.target.value)}
              className={errors.cardName?'error':''}/>
            {errors.cardName && <span className="field-error">{errors.cardName}</span>}
          </div>
          <div className="co-field">
            <label>Card number</label>
            <input placeholder="1234 5678 9012 3456" value={data.cardNumber||''}
              onChange={e=>onChange('cardNumber',formatCard(e.target.value))}
              className={errors.cardNumber?'error':''}/>
            {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
          </div>
          <div className="co-row">
            <div className="co-field half">
              <label>Expiry date</label>
              <input placeholder="MM/YY" value={data.expiry||''}
                onChange={e=>onChange('expiry',formatExpiry(e.target.value))}
                className={errors.expiry?'error':''}/>
              {errors.expiry && <span className="field-error">{errors.expiry}</span>}
            </div>
            <div className="co-field half">
              <label>CVV</label>
              <input placeholder="123" value={data.cvv||''}
                onChange={e=>onChange('cvv',e.target.value.replace(/\D/g,'').slice(0,4))}
                className={errors.cvv?'error':''}/>
              {errors.cvv && <span className="field-error">{errors.cvv}</span>}
            </div>
          </div>
          <label className="auth-remember">
            <input type="checkbox" onChange={e=>onChange('saveCard',e.target.checked)}/>
            <span>Save card for future purchases</span>
          </label>
        </div>
      )}

      {(data.method)==='PayPal' && (
        <div className="paypal-info">
          <p>You will be redirected to PayPal to complete your payment securely.</p>
        </div>
      )}

      <div className="step-actions">
        <button className="btn-back" onClick={onBack}>← Back to Shipping</button>
        <button className="btn btn-primary step-next-btn" onClick={next}>Place Order →</button>
      </div>
    </div>
  );
}

function ConfirmationStep({ shipping, cartItems }) {
  const subtotal = cartItems.reduce((s,i)=>s+i.price*i.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const orderNum = Math.floor(Math.random() * 900000 + 100000);

  return (
    <div className="checkout-step confirmation-step">
      <div className="confirm-icon"><CheckCircle size={56} color="var(--green)"/></div>
      <h2 className="confirm-title">Order Confirmed!</h2>
      <p className="confirm-sub">Thank you for your purchase. Your order <strong>#{orderNum}</strong> has been placed.</p>
      <div className="confirm-email-note">
        A confirmation email has been sent to <strong>{shipping.email}</strong>
      </div>

      <div className="confirm-details">
        <div className="confirm-section">
          <h4>Shipping to</h4>
          <p>{shipping.firstName} {shipping.lastName}</p>
          <p>{shipping.address}{shipping.address2?', '+shipping.address2:''}</p>
          <p>{shipping.city}, {shipping.zip}, {shipping.country}</p>
        </div>
        <div className="confirm-section">
          <h4>Order summary</h4>
          {cartItems.map(item=>(
            <div key={item.id} className="confirm-item">
              <span>{item.name.slice(0,30)}... × {item.qty}</span>
              <span>${(item.price*item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="confirm-item total-row">
            <span>Total (incl. tax)</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="confirm-actions">
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        <Link to="/account/orders" className="btn btn-outline">Track My Order</Link>
      </div>
    </div>
  );
}

export default function CheckoutPage({ cartItems }) {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({});
  const [payment, setPayment] = useState({});

  const updateShipping = (k,v) => setShipping(s=>({...s,[k]:v}));
  const updatePayment = (k,v) => setPayment(p=>({...p,[k]:v}));

  const items = cartItems?.length > 0 ? cartItems : [
    { id:1, name:'iPhone 14 Plus 256GB Starlight', price:998, qty:1 },
    { id:2, name:"Men's Long Sleeve T-shirt Cotton Base Layer", price:24.50, qty:2 },
  ];

  const subtotal = items.reduce((s,i)=>s+i.price*i.qty,0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> <ChevronRight size={13}/>
          <Link to="/cart">Cart</Link> <ChevronRight size={13}/>
          <span>Checkout</span>
        </div>
        <h1 className="checkout-title">Checkout</h1>

        <StepIndicator current={step}/>

        <div className="checkout-layout">
          <div className="checkout-main">
            {step === 0 && <ShippingStep data={shipping} onChange={updateShipping} onNext={()=>setStep(1)}/>}
            {step === 1 && <PaymentStep data={payment} onChange={updatePayment} onNext={()=>setStep(2)} onBack={()=>setStep(0)}/>}
            {step === 2 && <ConfirmationStep shipping={shipping} cartItems={items}/>}
          </div>

          {step < 2 && (
            <div className="checkout-summary">
              <div className="summary-card">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-items">
                  {items.map(item=>(
                    <div key={item.id} className="summary-item">
                      <span className="si-name">{item.name.slice(0,28)}...</span>
                      <span className="si-price">${(item.price*item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-divider"/>
                <div className="summary-rows">
                  <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="summary-row"><span>Shipping</span><span className="free-text">Free</span></div>
                  <div className="summary-row"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
                </div>
                <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <div className="trust-badges">
                <div className="trust-badge"><Lock size={14}/> SSL Secure Checkout</div>
                <div className="trust-badge"><Truck size={14}/> Free Returns</div>
                <div className="trust-badge"><CheckCircle size={14}/> Buyer Protection</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
