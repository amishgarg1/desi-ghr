import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, ChevronRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCartStore();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); navigate('/payment'); };

  if (cartItems.length === 0) {
    return (
      <div style={{ paddingTop: '10rem', paddingBottom: '5rem', textAlign: 'center' }} className="container">
        <ShoppingBag size={80} style={{ opacity: 0.1, margin: '0 auto 1.5rem', color: 'var(--color-primary)' }} />
        <h2 className="heading-lg">Your cart is empty</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--color-text-light)', fontSize: '1.1rem' }}>Add some delicious food before checking out!</p>
        <button onClick={() => navigate('/menu')} className="btn btn-primary">Go to Menu</button>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #FDF8F5 0%, #F5EDE6 100%)', minHeight: '100vh', paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="container">
        
        {/* Progress Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
          {[{ num: '1', label: 'Information', active: true }, { num: '2', label: 'Payment', active: false }, { num: '3', label: 'Confirm', active: false }].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.875rem',
                  background: step.active ? 'var(--color-primary)' : 'rgba(0,0,0,0.06)',
                  color: step.active ? 'white' : 'var(--color-text-light)'
                }}>{step.num}</div>
                <span style={{ fontWeight: step.active ? 700 : 400, color: step.active ? 'var(--color-primary)' : 'var(--color-text-light)', fontSize: '0.95rem' }}>{step.label}</span>
              </div>
              {i < 2 && <div style={{ width: '48px', height: '2px', background: 'rgba(0,0,0,0.08)' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '2rem', alignItems: 'start' }}>
          
          {/* Form Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'white', borderRadius: '32px', padding: '3rem', boxShadow: '0 24px 64px rgba(147,69,43,0.08)' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>
              Delivery <span style={{ color: 'var(--color-primary)' }}>Details</span>
            </h1>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '2.5rem' }}>We'll use this info to deliver your order right to your door.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Name + Phone Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#aaa' }}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                    <input required name="name" value={formData.name} onChange={handleChange} placeholder="Rahul Sharma"
                      style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#aaa' }}>Phone Number</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                    <input required name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210"
                      style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#aaa' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="rahul@example.com"
                    style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#aaa' }}>Delivery Address</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '1.1rem', color: '#ccc' }} />
                  <textarea required name="address" value={formData.address} onChange={handleChange} rows="3" placeholder="Street, Area, Colony..."
                    style={{ ...inputStyle, paddingTop: '1rem', paddingBottom: '1rem', resize: 'none', lineHeight: '1.5' }}
                    onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#aaa' }}>City</label>
                  <input required name="city" value={formData.city} onChange={handleChange} placeholder="Indore"
                    style={{ ...inputStyle, paddingLeft: '1.25rem' }} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#aaa' }}>Pincode</label>
                  <input required name="pincode" value={formData.pincode} onChange={handleChange} placeholder="452001"
                    style={{ ...inputStyle, paddingLeft: '1.25rem' }} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1.1rem', fontSize: '1rem', justifyContent: 'center', borderRadius: '16px' }}>
                Continue to Payment <ChevronRight size={20} style={{ marginLeft: '0.5rem' }} />
              </button>
            </form>
          </motion.div>

          {/* Order Summary Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            style={{ background: 'var(--color-secondary)', borderRadius: '32px', padding: '2.5rem', color: 'white', boxShadow: '0 32px 80px rgba(78,42,29,0.2)', position: 'sticky', top: '7rem', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
            
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'white', marginBottom: '2rem', fontWeight: 600 }}>
              Your <span style={{ color: 'var(--color-accent)' }}>Order</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '260px', overflowY: 'auto' }}>
              {cartItems.map(item => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                    {item.quantity}x
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Freshly made</p>
                  </div>
                  <p style={{ fontWeight: 700, color: 'var(--color-accent)', flexShrink: 0 }}>₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                <span>Subtotal</span><span style={{ color: 'white', fontWeight: 600 }}>₹{total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                <span>Delivery</span><span style={{ color: '#6ee7b7', fontWeight: 600 }}>FREE 🎉</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.2rem', color: 'white' }}>Grand Total</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-accent)' }}>₹{total}</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
              🔒 Secure Checkout &nbsp;·&nbsp; Fresh Guarantee &nbsp;·&nbsp; Fast Delivery
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  paddingLeft: '2.75rem',
  paddingRight: '1.25rem',
  paddingTop: '0.875rem',
  paddingBottom: '0.875rem',
  borderRadius: '14px',
  border: '2px solid #eee',
  background: '#FAFAFA',
  fontSize: '0.95rem',
  color: 'var(--color-text)',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  fontFamily: 'var(--font-sans)'
};

export default Checkout;
