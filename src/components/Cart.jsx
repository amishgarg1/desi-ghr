import { useCartStore } from '../store/cartStore';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Cart = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();
  
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    toast.success("Order placed successfully! We'll start preparing your food.", {
      icon: '🍳',
      duration: 4000
    });
    setTimeout(() => {
      clearCart();
      toggleCart();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
              zIndex: 9999
            }}
          />
          
          {/* Cart Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: '400px',
              background: 'var(--color-surface)',
              zIndex: 10000, display: 'flex', flexDirection: 'column',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.1)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="heading-sm" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag className="text-primary" /> Your Order
              </h2>
              <button onClick={toggleCart} style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.05)', borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--color-text-light)', marginTop: '2rem' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                  <p>Your cart is empty.</p>
                  <button onClick={toggleCart} className="btn btn-outline mt-4">Browse Menu</button>
                </div>
              ) : (
                cartItems.map(item => (
                  <motion.div layout key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px dashed rgba(0,0,0,0.05)' }}>
                    <div>
                      <h4 style={{ fontWeight: 600, fontSize: '1rem' }}>{item.name}</h4>
                      <p style={{ color: 'var(--color-primary)', fontWeight: 500 }}>₹{item.price}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-background)', borderRadius: '20px', padding: '0.25rem' }}>
                      <button onClick={() => updateQuantity(item.name, -1)} style={{ padding: '0.25rem' }}><Minus size={14} /></button>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.name, 1)} style={{ padding: '0.25rem' }}><Plus size={14} /></button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'var(--color-background)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 600, fontSize: '1.2rem' }}>
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="btn btn-primary" 
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>Checkout</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
