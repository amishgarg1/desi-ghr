import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Banknote, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment Successful!");
      clearCart();
      navigate('/order-success');
    }, 2500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-12 container text-center">
        <CheckCircle2 size={64} className="text-primary opacity-20 mb-4 mx-auto" />
        <h2 className="heading-md">Looking for your order?</h2>
        <p className="mb-6">Your cart is currently empty. Start ordering some fresh food!</p>
        <button onClick={() => navigate('/menu')} className="btn btn-primary">Go to Menu</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 container max-w-2xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="text-center mb-8">
          <h1 className="heading-md mb-2">Payment <span className="text-primary">Options</span></h1>
          <p className="text-gray-500">Amount to pay: <span className="font-bold text-secondary text-xl">₹{total}</span></p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          {/* UPI */}
          <div 
            onClick={() => setSelectedMethod('upi')}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/30'}`}
          >
            <div className="bg-primary/10 p-3 rounded-lg">
              <Smartphone className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">UPI Payment</h3>
              <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'upi' ? 'border-primary' : 'border-gray-300'}`}>
              {selectedMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </div>

          {/* Card */}
          <div 
            onClick={() => setSelectedMethod('card')}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/30'}`}
          >
            <div className="bg-primary/10 p-3 rounded-lg">
              <CreditCard className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Credit / Debit Card</h3>
              <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'card' ? 'border-primary' : 'border-gray-300'}`}>
              {selectedMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </div>

          {/* Cash */}
          <div 
            onClick={() => setSelectedMethod('cod')}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/30'}`}
          >
            <div className="bg-primary/10 p-3 rounded-lg">
              <Banknote className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Cash on Delivery</h3>
              <p className="text-sm text-gray-500">Pay when you receive your order</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'cod' ? 'border-primary' : 'border-gray-300'}`}>
              {selectedMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
            </div>
          </div>
        </div>

        {selectedMethod === 'card' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-col gap-4 mb-8 p-4 bg-gray-50 rounded-xl"
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-gray-500">Card Number</label>
              <input className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary" placeholder="XXXX XXXX XXXX XXXX" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-500">Expiry Date</label>
                <input className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary" placeholder="MM/YY" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-500">CVV</label>
                <input className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary" placeholder="XXX" type="password" />
              </div>
            </div>
          </motion.div>
        )}

        <button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="btn btn-primary w-full py-4 justify-center gap-2 relative overflow-hidden"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            <>Complete Payment <ArrowRight size={20} /></>
          )}
        </button>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <ShieldCheck size={16} className="text-green-600" />
          Secure 256-bit SSL encrypted payment
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;
