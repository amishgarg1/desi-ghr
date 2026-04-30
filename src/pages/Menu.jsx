import { useState } from 'react';
import { Utensils, Award, Plus, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

// ── Menu data extracted from the official Desi Ghr menu card ──────────────────
const menuData = {
  "Comfort Meals": [
    { name: "Dal Bati (Desi Ghee)", price: 289 },
    { name: "Dal Bati Combo (2 Sabji + Chutney + Salad + Churma + Raita)", price: 390 },
    { name: "Kadhi Rice", price: 150 },
    { name: "Dal Rice", price: 150 },
    { name: "Kadhi Khichdi", price: 170 },
    { name: "Dal Khichdi Tadka", price: 170 },
  ],
  "Parathas": [
    { name: "Desi Ghee Paratha (Plain)", price: 25 },
    { name: "Aloo Paratha", price: 89 },
    { name: "Gobhi Paratha", price: 120 },
    { name: "Paneer Paratha", price: 158 },
  ],
  "Snacks & Light Bites": [
    { name: "Poha", price: 75 },
    { name: "Appe (8 Piece)", price: 100 },
    { name: "Dal Pakwan", price: 90 },
  ],
  "Sweet Treats (Desi Ghee)": [
    { name: "Thandai", price: 70 },
    { name: "Kesar Rice Kheer", price: 70 },
    { name: "Makhana Kheer", price: 120 },
    { name: "Halwa", price: 80 },
    { name: "Churma (Desi Ghee)", price: 129 },
    { name: "Bajra Churma (Desi Ghee)", price: 135 },
  ],
  "Raita & Sides": [
    { name: "Masala Chach", price: 30 },
    { name: "Lauki Raita", price: 90 },
    { name: "Dahi Fry", price: 90 },
    { name: "Palak Raita", price: 90 },
    { name: "Boondi Raita", price: 60 },
    { name: "Veg Raita", price: 90 },
  ],
  "Breads (Roti)": [
    { name: "Sada Roti", price: 15 },
    { name: "Missi Roti", price: 20 },
    { name: "Bajra Roti", price: 35 },
    { name: "Makka Roti", price: 35 },
  ],
  "Sides & Accompaniments": [
    { name: "Baingan Ka Bharta", price: 150 },
    { name: "Lahsun Chutney", price: 50 },
    { name: "Aalu Chutney", price: 50 },
    { name: "Pyaz Chutney", price: 50 },
    { name: "Tamatar Chutney", price: 50 },
  ],
};

const combos = [
  {
    title: "Dal Bati Combo",
    description: "The ultimate Rajasthani thali experience.",
    price: 390,
    items: ["Dal", "Baati", "Choorma", "Masala Baati", "Chaach", "Lehsun Chutney", "Green Chutney", "Boondi Raita", "Salad", "Aachaar"],
  },
  {
    title: "Kadhi Special Combo",
    description: "A hearty Rajasthani meal bursting with flavours.",
    price: 249,
    items: ["Kadhi", "Baingan Ka Bharta", "Masala Bhindi", "Dahi Fry", "Mitti Tawa Roti", "Lehsun Chutney", "Mirchi ka Aachaar"],
  },
  {
    title: "Kadhi Chawal Combo",
    description: "Light, comforting & packed with homemade love.",
    price: 199,
    items: ["Kadhi Chawal", "Green Chutney", "Lehsun Chutney", "Aachaar", "Salad"],
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const addToCart = useCartStore(state => state.addToCart);
  const setCartOpen = useCartStore(state => state.setCartOpen);

  const categories = ["All", ...Object.keys(menuData), "Combos"];

  const handleAddToCart = (item) => {
    addToCart(item);
    setCartOpen(true);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="pt-32 pb-12">
      {/* Page Header */}
      <div className="container text-center mb-10">
        <h1 className="heading-xl">Our <span className="text-primary">Menu</span></h1>
        <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
          Ghar Jaisa Swaad, Dil Se Banaa — Pure Ingredients, Desi Taste, Real Happiness.
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
                color: activeCategory === cat ? 'white' : 'var(--color-text)',
                cursor: 'pointer',
                borderRadius: '999px',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Item Sections */}
        <div className="menu-sections">
          {(activeCategory === "All" || activeCategory !== "Combos") &&
            Object.entries(menuData).map(([category, items]) => {
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
                    <Flame className="text-primary" size={22} />
                    <h2 className="heading-md" style={{ margin: 0 }}>{category}</h2>
                  </div>

                  <div className="menu-grid">
                    {items.map((item, index) => (
                      <motion.div
                        key={index}
                        className="menu-item group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        style={{ padding: '1rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}
                      >
                        <div style={{ flex: 1 }}>
                          <span style={{ fontWeight: '500', fontSize: '1rem' }}>{item.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                          <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>
                            ₹{item.price}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                            title={`Add ${item.name} to cart`}
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

          {/* Combos Section */}
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
                    <h3 className="heading-sm text-primary mb-1">{combo.title}</h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--color-text-light)' }}>{combo.description}</p>
                    <ul style={{ marginBottom: '0.75rem' }}>
                      {combo.items.map((item, i) => (
                        <li key={i} style={{ fontSize: '0.875rem' }}>• {item}</li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-primary)' }}>₹{combo.price}</span>
                      <button
                        onClick={() => handleAddToCart({ name: combo.title, price: combo.price })}
                        className="btn btn-outline justify-center"
                        style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
                      >
                        <Plus size={15} /> Add to Order
                      </button>
                    </div>
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
