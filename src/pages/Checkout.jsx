import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, ArrowRight, ShoppingBag } from 'lucide-react';
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
    // Save info or just navigate to payment
    navigate('/payment');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-12 container text-center">
        <ShoppingBag size={64} className="text-primary opacity-20 mb-4 mx-auto" />
        <h2 className="heading-md">Your cart is empty</h2>
        <p className="mb-6">Add some delicious food before checking out!</p>
        <button onClick={() => navigate('/menu')} className="btn btn-primary">Go to Menu</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="heading-md mb-8 flex items-center gap-2">
            <User className="text-primary" /> Delivery Information
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                    placeholder="Rahul Sharma"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                  placeholder="rahul@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Delivery Address</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                <textarea 
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                  placeholder="Street name, Apartment, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">City</label>
                <input 
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                  placeholder="Indore"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Pincode</label>
                <input 
                  required
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                  placeholder="452001"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-6 w-full justify-center gap-2">
              Continue to Payment <ArrowRight size={20} />
            </button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-6"
        >
          <div className="card bg-gray-50 border-none">
            <h3 className="heading-sm mb-6">Order Summary</h3>
            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 mb-6">
              {cartItems.map(item => (
                <div key={item.name} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-primary">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-2 pt-4 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>
          </div>
          
          <div className="card glass flex items-center gap-4 py-4" style={{ border: '1px dashed var(--color-primary)' }}>
            <div className="bg-primary/10 p-2 rounded-full">
              <ShoppingBag className="text-primary" size={24} />
            </div>
            <p className="text-sm">
              <span className="font-bold">Trust Desi Ghr:</span> We guarantee fresh, homemade quality with every single order.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
