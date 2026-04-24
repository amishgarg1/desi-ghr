import { useState } from 'react';
import { Coffee, Utensils, Award, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const menuData = {
  "Breakfast & Snacks": [
    "Poha", "Dal-Pakwan", "Appe", "Upma", "Sandwich", "Idli", "Uttapam", "Kanda bhaji", 
    "Paratha (Aaloo-Pyaz, Paneer, Gobhi, Simple, Desi Ghee Paratha)", "Lassi", "Chach", 
    "Thandai", "Dry-fruit Milk", "Kadhi-kachori", "Pyaaz Kachori", "Chewda", "Dry Bhel", 
    "Dahi Papdi Chaat", "Sev Puri", "Coffee", "Kulhad Chai"
  ],
  "Chutney": ["Lehsun", "Corriander", "Imli", "Coconut", "Aaloo", "Pyaaz", "Kachcha aam"],
  "Roti": ["Lehsun Chutney - Bajre ki Roti", "Makke Ki Roti", "Mitti Tawa Roti", "Jawar ki Roti"],
  "Raita": ["Boondi", "Aaloo", "Fruit", "Loki", "Kaddu", "Kheera", "Pudina", "Paalak", "Dahi Fry"],
  "Rice": ["Mix Veg Pulao", "Jeera Pulao", "Steam Rice"],
  "Sweet": ["Aaloo Halwa", "Sheera", "Kheer (Makhane-Dry Fruit, Sewai, Rice, Sabudana)", "Choorma (Besann, Aata, bajra)", "Panjiri (Aata, Panjiri)"],
  "Sabji": ["Tamatar Mirchi", "Gatte Ki sabji", "Kadhi", "Mix Veg", "Baingan Bharta", "Bhindi Fry", "Masala Bahrwa Bhindi", "Masala Bharwa Baingan", "Gawar ki fali", "Aaloo Pyaz ki Sabji"]
};

const combos = [
  ["Dal", "Baati", "Choorma", "Masala baati", "Chaach", "Lehsun Chutney", "Tipode", "Green Chutney", "Boondi raita", "Salad", "Aachaar"],
  ["Kadhi", "baingan ka bharta", "Masala Bhindi", "Dahi Fry", "Mitti Tawa Roti", "Lehsun Chutney", "Mirchi ka Aachaar"],
  ["Kadhi Chawal", "Green Chutney", "Lehsun Chutney", "Aachaar", "Salad"],
  ["Chole Chawal"],
  ["Rajma Chawal"]
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const addToCart = useCartStore(state => state.addToCart);

  const categories = ["All", ...Object.keys(menuData), "Combos"];

  const handleAddToCart = (item, type = 'item') => {
    addToCart({ name: item });
    toast.success(`${item} added to cart!`);
  };

  return (
    <div className="pt-32 pb-12">
      {/* Page Header */}
      <div className="container text-center mb-10">
        <h1 className="heading-xl">Our <span className="text-primary">Menu</span></h1>
        <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
          Discover the authentic taste of homemade Indian cuisine. From fulfilling breakfast to elaborate combos, we have something to delight every palate.
        </p>
      </div>

      {/* Category Filter */}
      <div className="container mb-6">
        <div className="flex flex-wrap justify-center gap-1" style={{ marginBottom: '3rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`badge ${activeCategory === cat ? 'badge-primary' : ''}`}
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.9rem',
                border: activeCategory === cat ? 'none' : '1px solid rgba(0,0,0,0.1)',
                background: activeCategory === cat ? 'var(--color-primary)' : 'transparent',
                color: activeCategory === cat ? 'white' : 'var(--color-text)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="menu-sections">
          {(activeCategory === "All" || activeCategory !== "Combos") && Object.entries(menuData).map(([category, items]) => {
            if (activeCategory !== "All" && activeCategory !== category) return null;
            
            return (
              <motion.div 
                key={category} 
                className="menu-category"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-1 mb-4 border-b border-gray-200 pb-2">
                  <Utensils className="text-primary" size={24} />
                  <h2 className="heading-md" style={{ margin: 0 }}>{category}</h2>
                </div>
                <div className="menu-grid">
                  {items.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="menu-item group"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ padding: '1.25rem 1rem' }}
                    >
                      <span style={{ fontWeight: '500', fontSize: '1rem', flex: 1, paddingRight: '1rem' }}>{item}</span>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex-shrink-0"
                      >
                        <Plus size={20} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Combos */}
          {(activeCategory === "All" || activeCategory === "Combos") && (
            <motion.div 
              className="menu-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-1 mb-4 border-b border-gray-200 pb-2">
                <Award className="text-primary" size={24} />
                <h2 className="heading-md" style={{ margin: 0 }}>Special Combos</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {combos.map((combo, index) => (
                  <motion.div 
                    key={index} 
                    className="card combo-card"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="heading-sm text-primary mb-2">Combo {index + 1}</h3>
                    <p className="text-sm flex-1">A perfect, fulfilling meal to satisfy your hunger.</p>
                    <ul>
                      {combo.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => handleAddToCart(`Combo ${index + 1}`)}
                      className="btn btn-outline mt-4 w-full justify-center"
                      style={{ padding: '0.5rem' }}
                    >
                      <Plus size={16} /> Add to Order
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
