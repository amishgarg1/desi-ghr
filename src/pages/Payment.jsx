import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Check, CreditCard, Smartphone, Lock, MessageCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
const OWNER_WHATSAPP = '918655205735';

// Dynamically load Razorpay checkout script
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();
  const { token } = useAuthStore();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const checkoutInfoRaw = sessionStorage.getItem('checkoutInfo');
  const customerInfo = checkoutInfoRaw ? JSON.parse(checkoutInfoRaw) : null;

  useEffect(() => {
    loadRazorpay().then(setScriptLoaded);
  }, []);

  // Build WhatsApp message for owner
  const buildOwnerMsg = (orderId) => {
    const items = cartItems.map(i => `• ${i.quantity}x ${i.name} — ₹${i.price * i.quantity}`).join('\n');
    return encodeURIComponent(
      `🍛 *New Order — Desi Ghr!*\n\n` +
      `📋 Order ID: #${orderId}\n` +
      `👤 ${customerInfo?.name} | 📞 ${customerInfo?.phone}\n\n` +
      `📦 *Items:*\n${items}\n\n` +
      `💰 *Total: ₹${total}* (PAID Online ✅)\n\n` +
      `🏠 ${customerInfo?.address}, ${customerInfo?.city} - ${customerInfo?.pincode}\n\n` +
      `⏰ Please prepare & dispatch!`
    );
  };

  const handlePayment = async () => {
    if (!customerInfo) {
      toast.error('Please fill delivery details first!');
      navigate('/checkout');
      return;
    }
    if (!scriptLoaded) {
      toast.error('Payment gateway loading... please try again.');
      return;
    }
    if (!RAZORPAY_KEY) {
      toast.error('Payment not configured. Contact support.');
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create Razorpay order on backend
      const res = await fetch(`${API}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ amount: total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Step 2: Open Razorpay checkout modal
      const options = {
        key: RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        name: 'Desi Ghr',
        description: 'Homemade Food Order',
        image: 'https://desi-ghr.vercel.app/logo.png',
        order_id: data.orderId,
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        theme: { color: '#93452B' },
        handler: async (response) => {
          // Step 3: Verify payment on backend & save order
          try {
            const verifyRes = await fetch(`${API}/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerInfo,
                items: cartItems.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
                total,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.message);

            const orderId = verifyData.order?._id?.slice(-6).toUpperCase() || 'XXXXXX';

            // Step 4: Open WhatsApp to owner
            window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${buildOwnerMsg(orderId)}`, '_blank');

            // Step 5: Clear & redirect
            clearCart();
            sessionStorage.removeItem('checkoutInfo');
            toast.success('Payment successful! Order placed 🎉', { duration: 4000 });
            setTimeout(() => navigate('/order-success'), 800);
          } catch (err) {
            toast.error('Payment done but order save failed: ' + err.message);
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            toast('Payment cancelled.', { icon: '⚠️' });
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ paddingTop: '10rem', textAlign: 'center' }} className="container">
        <h2 className="heading-lg">No active order</h2>
        <button onClick={() => navigate('/menu')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Go to Menu</button>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #FDF8F5 0%, #F5EDE6 100%)', minHeight: '100vh', paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="container">

        {/* Progress Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
          {[
            { num: <Check size={16} />, label: 'Information', done: true },
            { num: '2', label: 'Payment', active: true },
            { num: '3', label: 'Confirm', active: false },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.875rem',
                  background: step.done ? '#6ee7b7' : step.active ? 'var(--color-primary)' : 'rgba(0,0,0,0.06)',
                  color: (step.done || step.active) ? 'white' : 'var(--color-text-light)',
                }}>{step.num}</div>
                <span style={{ fontWeight: step.active ? 700 : 400, color: step.active ? 'var(--color-primary)' : step.done ? '#059669' : 'var(--color-text-light)', fontSize: '0.95rem' }}>{step.label}</span>
              </div>
              {i < 2 && <div style={{ width: '48px', height: '2px', background: i === 0 ? '#6ee7b7' : 'rgba(0,0,0,0.08)' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start', maxWidth: '900px', margin: '0 auto' }}>

          {/* Left: Summary card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', boxShadow: '0 24px 64px rgba(147,69,43,0.08)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-secondary)', marginBottom: '0.3rem' }}>
                Order <span style={{ color: 'var(--color-primary)' }}>Summary</span>
              </h2>
              <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Review your items before paying</p>
            </div>

            {/* Items list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '240px', overflowY: 'auto' }}>
              {cartItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid #f5f5f5' }}>
                  <span style={{ width: '28px', height: '28px', background: 'rgba(147,69,43,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', flexShrink: 0 }}>{item.quantity}x</span>
                  <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</span>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.9rem' }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{ background: 'var(--color-secondary)', borderRadius: '20px', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Payable</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent)', lineHeight: 1.2 }}>₹{total}</p>
              </div>
              <div style={{ textAlign: 'right', opacity: 0.5 }}>
                <ShieldCheck size={28} color="white" />
                <p style={{ fontSize: '0.65rem', color: 'white', marginTop: '4px' }}>SSL Secured</p>
              </div>
            </div>

            {/* Delivery info */}
            {customerInfo && (
              <div style={{ background: '#f9fafb', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid #eee' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#aaa', marginBottom: '0.5rem' }}>Delivering To</p>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-secondary)' }}>{customerInfo.name}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', marginTop: '0.15rem' }}>{customerInfo.address}, {customerInfo.city} - {customerInfo.pincode}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-light)' }}>📞 {customerInfo.phone}</p>
              </div>
            )}
          </motion.div>

          {/* Right: Pay button */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Online payment card */}
            <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', boxShadow: '0 24px 64px rgba(147,69,43,0.08)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>

              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(147,69,43,0.1), rgba(224,122,95,0.15))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CreditCard size={36} color="var(--color-primary)" />
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-secondary)', marginBottom: '0.4rem' }}>Pay Securely Online</h3>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', lineHeight: 1.6 }}>UPI · Cards · Net Banking · Wallets</p>
              </div>

              {/* Payment icons */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                {[
                  { label: 'UPI',         bg: '#f3f4f6', color: '#4F46E5', icon: <Smartphone size={14} /> },
                  { label: 'Cards',       bg: '#f3f4f6', color: '#0ea5e9', icon: <CreditCard size={14} /> },
                  { label: 'Net Banking', bg: '#f3f4f6', color: '#059669', icon: '🏦' },
                  { label: 'Wallets',     bg: '#f3f4f6', color: '#d97706', icon: '👛' },
                ].map(({ label, bg, color, icon }) => (
                  <span key={label} style={{ background: bg, color, padding: '0.3rem 0.7rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {icon} {label}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <Lock size={13} color="#16a34a" />
                <span style={{ fontSize: '0.76rem', fontWeight: 600, color: '#166534' }}>256-bit SSL · Powered by Razorpay</span>
              </div>
            </div>

            {/* WhatsApp note */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1rem', background: '#f0fdf4', borderRadius: '14px', border: '1px solid #bbf7d0' }}>
              <MessageCircle size={18} color="#16a34a" />
              <p style={{ fontSize: '0.82rem', color: '#166534', fontWeight: 500 }}>
                After payment, your order details will be sent to our WhatsApp automatically.
              </p>
            </div>

            {/* Pay Now button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handlePayment}
              disabled={isProcessing || !scriptLoaded}
              style={{
                padding: '1.25rem', fontSize: '1.1rem', borderRadius: '18px', width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                background: 'linear-gradient(135deg, #93452B, #E07A5F)',
                color: 'white', fontWeight: 700, border: 'none', cursor: isProcessing ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 24px rgba(147,69,43,0.35)',
                opacity: isProcessing || !scriptLoaded ? 0.75 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              {isProcessing ? (
                <>
                  <div style={{ width: '22px', height: '22px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Opening Payment...
                </>
              ) : (
                <>Pay ₹{total} Securely <ArrowRight size={20} /></>
              )}
            </motion.button>

            <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#bbb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={13} color="#059669" /> Your payment is encrypted and secure
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Payment;
