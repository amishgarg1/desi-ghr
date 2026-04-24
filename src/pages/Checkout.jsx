import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, ArrowRight, ShoppingBag, ChevronRight, CreditCard } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCartStore();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-40 pb-12 container text-center">
        <ShoppingBag size={80} className="text-primary opacity-10 mb-6 mx-auto" />
        <h2 className="heading-lg">Your cart is empty</h2>
        <p className="text-lg mb-8 text-gray-500">Add some delicious homemade food before checking out!</p>
        <button onClick={() => navigate('/menu')} className="btn btn-primary px-12">Go to Menu</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#FAF7F2] min-h-screen">
      <div className="container">
        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 text-primary font-bold">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</div>
            <span>Information</span>
          </div>
          <div className="w-12 h-[2px] bg-gray-200"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">2</div>
            <span>Payment</span>
          </div>
          <div className="w-12 h-[2px] bg-gray-200"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">3</div>
            <span>Success</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-primary/5"
            >
              <div className="mb-10">
                <h1 className="heading-md mb-2">Delivery <span className="text-primary">Details</span></h1>
                <p className="text-gray-500">Please provide your contact and delivery information.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Full Name</label>
                    <div className="relative group">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                      <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Phone Number</label>
                    <div className="relative group">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                      <input 
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="johndoe@example.com"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Delivery Address</label>
                  <div className="relative group">
                    <MapPin size={18} className="absolute left-4 top-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <textarea 
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Flat, House no., Building, Company, Apartment"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-300 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">City</label>
                    <input 
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your City"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Pincode</label>
                    <input 
                      required
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="000000"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full py-5 rounded-2xl text-lg group"
                >
                  Continue to Payment 
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>

          {/* Side Summary Area */}
          <div className="lg:col-span-5 sticky top-32">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-secondary rounded-[32px] p-8 md:p-10 text-white shadow-2xl shadow-secondary/20 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              
              <h3 className="heading-sm text-white mb-8">Order <span className="text-primary-light">Summary</span></h3>
              
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.name} className="flex justify-between items-start group">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-white/50">Fresh & Homemade</p>
                      </div>
                    </div>
                    <p className="font-bold text-primary-light">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{total}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Delivery Charge</span>
                  <span className="text-green-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center text-2xl pt-4 border-t border-white/10 font-serif">
                  <span className="font-normal italic">Grand Total</span>
                  <span className="text-primary-light font-bold">₹{total}</span>
                </div>
              </div>

              <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <CreditCard className="text-primary-light" size={24} />
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Your order is protected by our <span className="text-white font-bold">Freshness Guarantee</span>. If you're not satisfied, we'll make it right.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); borderRadius: 10px; }
      `}</style>
    </div>
  );
};

export default Checkout;
