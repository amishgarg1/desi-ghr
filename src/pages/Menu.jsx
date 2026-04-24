import { useState } from 'react';
import { Coffee, Utensils, Award } from 'lucide-react';

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

  const categories = ["All", ...Object.keys(menuData), "Combos"];

  return (
    <div className="pt-24 pb-12">
      {/* Page Header */}
      <div className="container text-center mb-6">
        <h1 className="heading-xl">Our <span className="text-primary">Menu</span></h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
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
              <div key={category} className="menu-category animate-fade-in">
                <div className="flex items-center gap-1 mb-4 border-b border-gray-200 pb-2">
                  <Utensils className="text-primary" size={24} />
                  <h2 className="heading-md" style={{ margin: 0 }}>{category}</h2>
                </div>
                <div className="menu-grid">
                  {items.map((item, index) => (
                    <div key={index} className="menu-item">
                      <span style={{ fontWeight: '500', fontSize: '1.1rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Combos */}
          {(activeCategory === "All" || activeCategory === "Combos") && (
            <div className="menu-category animate-fade-in delay-100">
              <div className="flex items-center gap-1 mb-4 border-b border-gray-200 pb-2">
                <Award className="text-primary" size={24} />
                <h2 className="heading-md" style={{ margin: 0 }}>Special Combos</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {combos.map((combo, index) => (
                  <div key={index} className="card combo-card">
                    <h3 className="heading-sm text-primary mb-2">Combo {index + 1}</h3>
                    <p className="text-sm flex-1">A perfect, fulfilling meal to satisfy your hunger.</p>
                    <ul>
                      {combo.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
