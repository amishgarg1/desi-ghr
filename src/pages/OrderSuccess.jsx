import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Utensils, Truck } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-24 container text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="max-w-xl mx-auto card"
      >
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={64} className="text-green-600" />
          </div>
        </div>
        
        <h1 className="heading-lg mb-2">Order <span className="text-primary">Success!</span></h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for ordering with <span className="font-bold text-secondary">Desi Ghr</span>. 
          Your food is being prepared with love and will reach you shortly.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/5 p-3 rounded-full">
              <CheckCircle size={20} className="text-primary" />
            </div>
            <p className="text-xs font-bold uppercase">Placed</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/5 p-3 rounded-full">
              <Utensils size={20} className="text-primary" />
            </div>
            <p className="text-xs font-bold uppercase">Preparing</p>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="bg-primary/5 p-3 rounded-full">
              <Truck size={20} className="text-primary" />
            </div>
            <p className="text-xs font-bold uppercase">Delivery</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-outline gap-2"
          >
            <Home size={18} /> Back to Home
          </button>
          <button 
            onClick={() => navigate('/menu')} 
            className="btn btn-primary gap-2"
          >
            Order More <Utensils size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
