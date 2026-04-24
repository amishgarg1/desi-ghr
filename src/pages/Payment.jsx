import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Banknote, ShieldCheck, ArrowRight, Check, Lock } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Order Placed Successfully! 🎉');
      clearCart();
      navigate('/order-success');
    }, 3000);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ paddingTop: '10rem', textAlign: 'center' }} className="container">
        <h2 className="heading-lg">No active order</h2>
        <button onClick={() => navigate('/menu')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Go to Menu</button>
      </div>
    );
  }

  const methods = [
    { id: 'upi', icon: <Smartphone size={22} />, title: 'UPI Payment', desc: 'Google Pay · PhonePe · Paytm' },
    { id: 'card', icon: <CreditCard size={22} />, title: 'Card Payment', desc: 'Visa · Mastercard · RuPay' },
    { id: 'cod', icon: <Banknote size={22} />, title: 'Cash on Delivery', desc: 'Pay when food arrives' },
  ];

  return (
    <div style={{ background: 'linear-gradient(135deg, #FDF8F5 0%, #F5EDE6 100%)', minHeight: '100vh', paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="container">
        
        {/* Progress Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
          {[
            { num: <Check size={16} />, label: 'Information', done: true },
            { num: '2', label: 'Payment', active: true },
            { num: '3', label: 'Confirm', active: false }
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.875rem',
                  background: step.done ? '#6ee7b7' : step.active ? 'var(--color-primary)' : 'rgba(0,0,0,0.06)',
                  color: (step.done || step.active) ? 'white' : 'var(--color-text-light)'
                }}>{step.num}</div>
                <span style={{ fontWeight: step.active ? 700 : 400, color: step.active ? 'var(--color-primary)' : step.done ? '#059669' : 'var(--color-text-light)', fontSize: '0.95rem' }}>{step.label}</span>
              </div>
              {i < 2 && <div style={{ width: '48px', height: '2px', background: i === 0 ? '#6ee7b7' : 'rgba(0,0,0,0.08)' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Left: Payment Methods */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', boxShadow: '0 24px 64px rgba(147,69,43,0.08)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-secondary)', marginBottom: '0.3rem' }}>
                Choose <span style={{ color: 'var(--color-primary)' }}>Payment</span>
              </h2>
              <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Select your preferred payment method</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {methods.map(method => (
                <div key={method.id} onClick={() => setSelectedMethod(method.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.25rem',
                    borderRadius: '16px', border: `2px solid ${selectedMethod === method.id ? 'var(--color-primary)' : '#eee'}`,
                    background: selectedMethod === method.id ? 'rgba(147,69,43,0.04)' : 'white',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: selectedMethod === method.id ? 'var(--color-primary)' : '#f5f5f5',
                    color: selectedMethod === method.id ? 'white' : '#aaa', flexShrink: 0
                  }}>
                    {method.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem', color: selectedMethod === method.id ? 'var(--color-secondary)' : '#333' }}>{method.title}</p>
                    <p style={{ fontSize: '0.8rem', color: '#aaa' }}>{method.desc}</p>
                  </div>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    border: `2.5px solid ${selectedMethod === method.id ? 'var(--color-primary)' : '#ddd'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {selectedMethod === method.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-primary)' }} />}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Box */}
            <div style={{ background: 'var(--color-secondary)', borderRadius: '20px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Payable</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent)', lineHeight: 1.2 }}>₹{total}</p>
              </div>
              <div style={{ textAlign: 'right', opacity: 0.5 }}>
                <ShieldCheck size={28} color="white" />
                <p style={{ fontSize: '0.65rem', color: 'white', marginTop: '4px' }}>SSL Secured</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Payment Detail Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AnimatePresence mode="wait">
              {selectedMethod === 'card' ? (
                <motion.div key="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', boxShadow: '0 24px 64px rgba(147,69,43,0.08)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Virtual Card */}
                  <div style={{
                    background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)',
                    borderRadius: '20px', padding: '1.75rem', color: 'white',
                    aspectRatio: '1.7 / 1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(78,42,29,0.3)'
                  }}>
                    <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', bottom: '-60px', left: '-30px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                      <div style={{ width: '44px', height: '30px', background: 'rgba(255,215,0,0.7)', borderRadius: '6px' }} />
                      <ShieldCheck size={22} style={{ opacity: 0.4 }} />
                    </div>
                    <div style={{ position: 'relative' }}>
                      <p style={{ fontSize: '0.65rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '4px' }}>Card Number</p>
                      <p style={{ fontFamily: 'monospace', fontSize: '1.3rem', letterSpacing: '4px', fontWeight: 600 }}>
                        {cardData.number || 'XXXX XXXX XXXX XXXX'}
                      </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                      <div>
                        <p style={{ fontSize: '0.6rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Card Holder</p>
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>{cardData.name || 'FULL NAME'}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.6rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Expires</p>
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>{cardData.expiry || 'MM/YY'}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input placeholder="Card Holder Name" onChange={e => setCardData({...cardData, name: e.target.value})}
                      style={fieldStyle} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                    <input placeholder="0000 0000 0000 0000" maxLength={19} onChange={e => setCardData({...cardData, number: e.target.value})}
                      style={fieldStyle} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <input placeholder="MM / YY" onChange={e => setCardData({...cardData, expiry: e.target.value})}
                        style={fieldStyle} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                      <input placeholder="CVV" type="password" maxLength={3}
                        style={fieldStyle} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="other" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  style={{ background: 'white', borderRadius: '32px', padding: '3rem', boxShadow: '0 24px 64px rgba(147,69,43,0.08)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ width: '90px', height: '90px', background: 'rgba(147,69,43,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                    {selectedMethod === 'upi' ? <Smartphone size={40} /> : <Banknote size={40} />}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-secondary)' }}>
                    {selectedMethod === 'upi' ? 'Pay via UPI' : 'Cash on Delivery'}
                  </h3>
                  <p style={{ color: 'var(--color-text-light)', maxWidth: '280px', lineHeight: 1.7 }}>
                    {selectedMethod === 'upi'
                      ? 'You will be redirected to your UPI app to complete the payment securely.'
                      : `Please keep ₹${total} ready to pay our delivery partner at your door.`}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#f9fafb', borderRadius: '12px' }}>
                    <Lock size={14} color="#059669" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '1.5px' }}>256-bit SSL Encrypted</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={handlePayment} disabled={isProcessing}
              className="btn btn-primary"
              style={{ padding: '1.25rem', fontSize: '1.05rem', borderRadius: '18px', width: '100%', justifyContent: 'center', opacity: isProcessing ? 0.8 : 1 }}>
              {isProcessing ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '22px', height: '22px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Processing Payment...
                </div>
              ) : (
                <>Confirm & Place Order <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} /></>
              )}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#bbb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={14} color="#059669" /> Secure, encrypted transaction
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const fieldStyle = {
  width: '100%',
  padding: '0.9rem 1.25rem',
  borderRadius: '14px',
  border: '2px solid #eee',
  background: '#FAFAFA',
  fontSize: '0.95rem',
  color: 'var(--color-text)',
  outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: 'var(--font-sans)'
};

export default Payment;
