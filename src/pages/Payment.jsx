import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Banknote, ShieldCheck, ArrowRight, Lock, Check } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Order Placed Successfully!");
      clearCart();
      navigate('/order-success');
    }, 3000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-40 pb-12 container text-center">
        <h2 className="heading-lg">No Active Order</h2>
        <button onClick={() => navigate('/menu')} className="btn btn-primary mt-6 px-8">Return to Menu</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#FAF7F2] min-h-screen">
      <div className="container max-w-4xl">
        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 text-green-600 font-bold">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm"><Check size={16} /></div>
            <span>Information</span>
          </div>
          <div className="w-12 h-[2px] bg-green-600"></div>
          <div className="flex items-center gap-2 text-primary font-bold">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</div>
            <span>Payment</span>
          </div>
          <div className="w-12 h-[2px] bg-gray-200"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">3</div>
            <span>Success</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Payment Methods */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[32px] p-8 shadow-xl shadow-primary/5"
            >
              <h2 className="heading-sm mb-6">Payment <span className="text-primary">Method</span></h2>
              
              <div className="space-y-4">
                {[
                  { id: 'upi', icon: <Smartphone />, title: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm' },
                  { id: 'card', icon: <CreditCard />, title: 'Card Payment', desc: 'Visa, Mastercard, RuPay' },
                  { id: 'cod', icon: <Banknote />, title: 'Cash on Delivery', desc: 'Pay when food arrives' }
                ].map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-primary/20'}`}
                  >
                    <div className={`p-3 rounded-xl ${selectedMethod === method.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${selectedMethod === method.id ? 'text-secondary' : 'text-gray-600'}`}>{method.title}</h3>
                      <p className="text-xs text-gray-400">{method.desc}</p>
                    </div>
                    {selectedMethod === method.id && (
                      <motion.div layoutId="check" className="text-primary">
                        <CheckCircle2Icon size={24} />
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-secondary rounded-[32px] text-white flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-white/60">Total Amount</p>
                <p className="text-3xl font-serif italic text-primary-light font-bold">₹{total}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Secure Transaction</p>
                <div className="flex gap-2 justify-end opacity-50 grayscale hover:grayscale-0 transition-all">
                  <CreditCard size={20} />
                  <Smartphone size={20} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Payment Detail Details */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {selectedMethod === 'card' ? (
                <motion.div 
                  key="card-details"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[32px] p-8 shadow-xl shadow-primary/5 space-y-6"
                >
                  {/* Virtual Card Visual */}
                  <div className="aspect-[1.6/1] w-full bg-gradient-to-br from-secondary to-primary p-8 rounded-2xl text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-8 bg-yellow-400/80 rounded-md opacity-80"></div>
                      <ShieldCheck size={28} className="opacity-50" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs tracking-[4px] uppercase text-white/50">Card Number</p>
                      <p className="text-2xl font-mono tracking-widest">{cardData.number || 'XXXX XXXX XXXX XXXX'}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] uppercase text-white/50">Card Holder</p>
                        <p className="font-bold uppercase tracking-wider">{cardData.name || 'FULL NAME'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase text-white/50">Expires</p>
                        <p className="font-bold">{cardData.expiry || 'MM/YY'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 ml-1">Card Holder Name</label>
                      <input 
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none transition-all"
                        placeholder="John Doe"
                        onChange={(e) => setCardData({...cardData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 ml-1">Card Number</label>
                      <input 
                        className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none transition-all"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        onChange={(e) => setCardData({...cardData, number: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 ml-1">Expiry</label>
                        <input 
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none transition-all"
                          placeholder="MM/YY"
                          onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 ml-1">CVV</label>
                        <input 
                          className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none transition-all"
                          placeholder="000"
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="other-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white rounded-[32px] p-8 shadow-xl shadow-primary/5 text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {selectedMethod === 'upi' ? <Smartphone size={40} className="text-primary" /> : <Banknote size={40} className="text-primary" />}
                  </div>
                  <h3 className="text-xl font-bold">
                    {selectedMethod === 'upi' ? 'Pay via UPI' : 'Cash on Delivery'}
                  </h3>
                  <p className="text-gray-500">
                    {selectedMethod === 'upi' 
                      ? 'You will be redirected to your UPI app to complete the payment.' 
                      : 'Please keep exactly ₹' + total + ' ready to pay our delivery partner.'}
                  </p>
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-center justify-center gap-3">
                    <Lock size={16} className="text-green-600" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">End-to-End Encrypted</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="btn btn-primary w-full py-5 rounded-2xl text-lg relative overflow-hidden group"
            >
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Confirm Order</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle2Icon = ({ size }) => (
  <div style={{ width: size, height: size }} className="bg-primary rounded-full flex items-center justify-center text-white">
    <Check size={size * 0.6} strokeWidth={4} />
  </div>
);

export default Payment;
