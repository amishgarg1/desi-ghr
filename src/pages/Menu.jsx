import { useState } from 'react';
import { Plus, Award, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const CATEGORIES = [
  { key: 'All',                      emoji: '🍽️' },
  { key: 'Comfort Meals',            emoji: '🫕' },
  { key: 'Parathas',                 emoji: '🫓' },
  { key: 'Snacks & Light Bites',     emoji: '🥘' },
  { key: 'Sweet Treats (Desi Ghee)', emoji: '🍮' },
  { key: 'Raita & Sides',            emoji: '🥛' },
  { key: 'Breads (Roti)',            emoji: '🫔' },
  { key: 'Sides & Accompaniments',   emoji: '🌿' },
  { key: 'Combos',                   emoji: '⭐' },
];

const menuData = {
  'Comfort Meals': [
    { name: 'Dal Bati (Desi Ghee)', price: 289 },
    { name: 'Dal Bati Combo (2 Sabji + Chutney + Salad + Churma + Raita)', price: 390 },
    { name: 'Kadhi Rice', price: 150 },
    { name: 'Dal Rice', price: 150 },
    { name: 'Kadhi Khichdi', price: 170 },
    { name: 'Dal Khichdi Tadka', price: 170 },
  ],
  'Parathas': [
    { name: 'Desi Ghee Paratha (Plain)', price: 25 },
    { name: 'Aloo Paratha', price: 89 },
    { name: 'Gobhi Paratha', price: 120 },
    { name: 'Paneer Paratha', price: 158 },
  ],
  'Snacks & Light Bites': [
    { name: 'Poha', price: 75 },
    { name: 'Appe (8 Piece)', price: 100 },
    { name: 'Dal Pakwan', price: 90 },
  ],
  'Sweet Treats (Desi Ghee)': [
    { name: 'Thandai', price: 70 },
    { name: 'Kesar Rice Kheer', price: 70 },
    { name: 'Makhana Kheer', price: 120 },
    { name: 'Halwa', price: 80 },
    { name: 'Churma (Desi Ghee)', price: 129 },
    { name: 'Bajra Churma (Desi Ghee)', price: 135 },
  ],
  'Raita & Sides': [
    { name: 'Masala Chach', price: 30 },
    { name: 'Lauki Raita', price: 90 },
    { name: 'Dahi Fry', price: 90 },
    { name: 'Palak Raita', price: 90 },
    { name: 'Boondi Raita', price: 60 },
    { name: 'Veg Raita', price: 90 },
  ],
  'Breads (Roti)': [
    { name: 'Sada Roti', price: 15 },
    { name: 'Missi Roti', price: 20 },
    { name: 'Bajra Roti', price: 35 },
    { name: 'Makka Roti', price: 35 },
  ],
  'Sides & Accompaniments': [
    { name: 'Baingan Ka Bharta', price: 150 },
    { name: 'Lahsun Chutney', price: 50 },
    { name: 'Aalu Chutney', price: 50 },
    { name: 'Pyaz Chutney', price: 50 },
    { name: 'Tamatar Chutney', price: 50 },
  ],
};

const combos = [
  {
    title: 'Dal Bati Combo',
    description: 'The ultimate Rajasthani thali experience.',
    price: 390,
    items: ['Dal', 'Baati', 'Choorma', 'Masala Baati', 'Chaach', 'Lehsun Chutney', 'Green Chutney', 'Boondi Raita', 'Salad', 'Aachaar'],
  },
  {
    title: 'Kadhi Special Combo',
    description: 'A hearty Rajasthani meal bursting with flavours.',
    price: 249,
    items: ['Kadhi', 'Baingan Ka Bharta', 'Masala Bhindi', 'Dahi Fry', 'Mitti Tawa Roti', 'Lehsun Chutney', 'Mirchi ka Aachaar'],
  },
  {
    title: 'Kadhi Chawal Combo',
    description: 'Light, comforting & packed with homemade love.',
    price: 199,
    items: ['Kadhi Chawal', 'Green Chutney', 'Lehsun Chutney', 'Aachaar', 'Salad'],
  },
];

// per-category gradient accent colours
const ACCENTS = {
  'Comfort Meals':            { bg: 'rgba(147,69,43,0.07)',  border: 'rgba(147,69,43,0.25)',  dot: '#93452B' },
  'Parathas':                 { bg: 'rgba(224,122,95,0.08)', border: 'rgba(224,122,95,0.3)',  dot: '#E07A5F' },
  'Snacks & Light Bites':     { bg: 'rgba(108,122,70,0.07)', border: 'rgba(108,122,70,0.25)', dot: '#6C7A46' },
  'Sweet Treats (Desi Ghee)': { bg: 'rgba(202,138,4,0.08)',  border: 'rgba(202,138,4,0.3)',   dot: '#CA8A04' },
  'Raita & Sides':            { bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.2)',  dot: '#3B82F6' },
  'Breads (Roti)':            { bg: 'rgba(147,69,43,0.05)',  border: 'rgba(147,69,43,0.2)',   dot: '#93452B' },
  'Sides & Accompaniments':   { bg: 'rgba(108,122,70,0.06)', border: 'rgba(108,122,70,0.22)', dot: '#6C7A46' },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.35, ease: 'easeOut' } }),
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const addToCart  = useCartStore(s => s.addToCart);
  const setCartOpen = useCartStore(s => s.setCartOpen);

  const handleAdd = (item) => {
    addToCart(item);
    setCartOpen(true);
    toast.success(`${item.name} added!`, { icon: '🛒' });
  };

  const emoji = (key) => CATEGORIES.find(c => c.key === key)?.emoji ?? '🍽️';

  return (
    <div style={{ paddingTop: '88px', paddingBottom: '4rem', background: 'var(--color-background)', minHeight: '100vh' }}>

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #4E2A1D 0%, #93452B 55%, #E07A5F 100%)',
        padding: '3.5rem 2rem 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '2.5rem',
      }}>
        {/* decorative blobs */}
        <div style={{ position:'absolute', top:'-60px', left:'-60px', width:'220px', height:'220px', borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
        <div style={{ position:'absolute', bottom:'-80px', right:'-40px', width:'280px', height:'280px', borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <span style={{
            display:'inline-block', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)',
            color:'#fff', padding:'0.35rem 1.1rem', borderRadius:'999px',
            fontSize:'0.8rem', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase',
            marginBottom:'1rem', border:'1px solid rgba(255,255,255,0.2)',
          }}>Cloud Kitchen · Pure Desi Ghee</span>

          <h1 style={{ fontFamily:'var(--font-serif)', color:'#fff', fontSize:'clamp(2.4rem,5vw,4rem)', fontWeight:700, marginBottom:'0.5rem' }}>
            Our <span style={{ color:'#FFD580' }}>Menu</span>
          </h1>
          <p style={{ color:'rgba(255,255,255,0.78)', fontSize:'1.05rem', maxWidth:'520px', margin:'0 auto' }}>
            Made with Desi Ghee · Fresh Every Day · Taste of Home
          </p>
        </motion.div>

        {/* wavy bottom edge */}
        <svg viewBox="0 0 1440 60" style={{ position:'absolute', bottom:0, left:0, width:'100%' }} preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="var(--color-background)" />
        </svg>
      </div>

      {/* ── Sticky Category Filter ───────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: '72px', zIndex: 50,
        background: 'rgba(253,248,245,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(147,69,43,0.1)',
        padding: '0.75rem 1rem',
        marginBottom: '2.5rem',
      }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto', display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center' }}>
          {CATEGORIES.map(({ key, emoji: em }) => {
            const active = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem', fontWeight: 600,
                  border: active ? 'none' : '1.5px solid rgba(147,69,43,0.18)',
                  background: active ? 'var(--color-primary)' : 'white',
                  color: active ? 'white' : 'var(--color-text)',
                  cursor: 'pointer',
                  boxShadow: active ? '0 4px 12px rgba(147,69,43,0.3)' : 'none',
                  transition: 'all 0.22s ease',
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <span style={{ fontSize:'1rem' }}>{em}</span> {key}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Menu Sections ────────────────────────────────────────────── */}
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 2rem' }}>

        <AnimatePresence mode="wait">
          {Object.entries(menuData).map(([category, items]) => {
            if (activeCategory !== 'All' && activeCategory !== category) return null;
            const acc = ACCENTS[category] ?? ACCENTS['Comfort Meals'];

            return (
              <motion.section
                key={category}
                initial={{ opacity:0, y:24 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-10 }}
                transition={{ duration:0.4 }}
                style={{ marginBottom: '3.5rem' }}
              >
                {/* Category Header */}
                <div style={{
                  display:'flex', alignItems:'center', gap:'0.75rem',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: `2px solid ${acc.border}`,
                }}>
                  <span style={{
                    width:'42px', height:'42px', borderRadius:'12px',
                    background: acc.bg, border:`1.5px solid ${acc.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem',
                    flexShrink: 0,
                  }}>
                    {emoji(category)}
                  </span>
                  <h2 style={{
                    fontFamily:'var(--font-serif)', fontSize:'clamp(1.4rem,2.5vw,1.9rem)',
                    fontWeight:700, color:'var(--color-secondary)', margin:0,
                  }}>{category}</h2>
                  <span style={{
                    marginLeft:'auto', background: acc.bg, border:`1px solid ${acc.border}`,
                    color: acc.dot, fontSize:'0.75rem', fontWeight:700,
                    padding:'0.2rem 0.65rem', borderRadius:'999px',
                  }}>{items.length} items</span>
                </div>

                {/* Items Grid */}
                <div style={{
                  display:'grid',
                  gridTemplateColumns:'repeat(auto-fill, minmax(290px,1fr))',
                  gap:'1rem',
                }}>
                  {items.map((item, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y:-3, boxShadow:'0 12px 28px rgba(147,69,43,0.12)' }}
                      style={{
                        background:'white',
                        borderRadius:'14px',
                        padding:'1rem 1.1rem',
                        border:`1.5px solid ${acc.border}`,
                        display:'flex', alignItems:'center', gap:'0.75rem',
                        transition:'box-shadow 0.2s ease',
                        cursor:'default',
                      }}
                    >
                      {/* colour dot */}
                      <span style={{
                        width:'8px', height:'8px', borderRadius:'50%',
                        background: acc.dot, flexShrink:0,
                      }} />

                      <span style={{ flex:1, fontWeight:500, fontSize:'0.97rem', color:'var(--color-text)', lineHeight:1.4 }}>
                        {item.name}
                      </span>

                      <span style={{
                        fontWeight:800, fontSize:'1rem', color: acc.dot,
                        whiteSpace:'nowrap', flexShrink:0,
                      }}>₹{item.price}</span>

                      <motion.button
                        whileTap={{ scale:0.88 }}
                        onClick={() => handleAdd(item)}
                        title={`Add ${item.name}`}
                        style={{
                          width:'34px', height:'34px', borderRadius:'50%', flexShrink:0,
                          background: acc.bg, border:`1.5px solid ${acc.border}`,
                          color: acc.dot, display:'flex', alignItems:'center', justifyContent:'center',
                          transition:'all 0.2s ease', cursor:'pointer',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = acc.dot;
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = acc.bg;
                          e.currentTarget.style.color = acc.dot;
                        }}
                      >
                        <Plus size={16} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </AnimatePresence>

        {/* ── Combos Section ───────────────────────────────────────── */}
        {(activeCategory === 'All' || activeCategory === 'Combos') && (
          <motion.section
            key="combos"
            initial={{ opacity:0, y:24 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.4, delay:0.1 }}
            style={{ marginBottom:'3.5rem' }}
          >
            {/* Header */}
            <div style={{
              display:'flex', alignItems:'center', gap:'0.75rem',
              marginBottom:'1.5rem', paddingBottom:'0.75rem',
              borderBottom:'2px solid rgba(202,138,4,0.35)',
            }}>
              <span style={{
                width:'42px', height:'42px', borderRadius:'12px',
                background:'rgba(202,138,4,0.1)', border:'1.5px solid rgba(202,138,4,0.35)',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem',
              }}>⭐</span>
              <h2 style={{
                fontFamily:'var(--font-serif)', fontSize:'clamp(1.4rem,2.5vw,1.9rem)',
                fontWeight:700, color:'var(--color-secondary)', margin:0,
              }}>Special Combos</h2>
              <span style={{
                marginLeft:'auto', background:'rgba(202,138,4,0.1)', border:'1px solid rgba(202,138,4,0.35)',
                color:'#CA8A04', fontSize:'0.75rem', fontWeight:700,
                padding:'0.2rem 0.65rem', borderRadius:'999px',
              }}>{combos.length} combos</span>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))', gap:'1.25rem' }}>
              {combos.map((combo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity:0, y:20 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y:-5 }}
                  style={{
                    background:'white',
                    borderRadius:'18px',
                    padding:'1.5rem',
                    border:'2px solid rgba(202,138,4,0.25)',
                    boxShadow:'0 4px 16px rgba(202,138,4,0.08)',
                    display:'flex', flexDirection:'column', gap:'0.75rem',
                    position:'relative', overflow:'hidden',
                  }}
                >
                  {/* top accent strip */}
                  <div style={{
                    position:'absolute', top:0, left:0, right:0, height:'4px',
                    background:'linear-gradient(90deg, #CA8A04, #E07A5F)',
                  }} />

                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'0.5rem' }}>
                    <div>
                      <h3 style={{
                        fontFamily:'var(--font-serif)', fontSize:'1.15rem',
                        fontWeight:700, color:'var(--color-secondary)', marginBottom:'0.25rem',
                      }}>{combo.title}</h3>
                      <p style={{ fontSize:'0.82rem', color:'var(--color-text-light)' }}>{combo.description}</p>
                    </div>
                    <span style={{
                      background:'linear-gradient(135deg,#93452B,#E07A5F)',
                      color:'white', fontWeight:800, fontSize:'1.05rem',
                      padding:'0.3rem 0.75rem', borderRadius:'999px', whiteSpace:'nowrap', flexShrink:0,
                    }}>₹{combo.price}</span>
                  </div>

                  <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                    {combo.items.map((it, i) => (
                      <span key={i} style={{
                        background:'rgba(147,69,43,0.07)', color:'var(--color-text-light)',
                        fontSize:'0.76rem', fontWeight:500, padding:'0.2rem 0.6rem',
                        borderRadius:'999px', border:'1px solid rgba(147,69,43,0.12)',
                      }}>
                        {it}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileTap={{ scale:0.94 }}
                    onClick={() => handleAdd({ name: combo.title, price: combo.price })}
                    style={{
                      marginTop:'auto', display:'flex', alignItems:'center', justifyContent:'center',
                      gap:'0.4rem', padding:'0.6rem 1rem', borderRadius:'999px',
                      background:'linear-gradient(135deg,#93452B,#E07A5F)',
                      color:'white', fontWeight:700, fontSize:'0.9rem',
                      boxShadow:'0 4px 12px rgba(147,69,43,0.25)', cursor:'pointer',
                      border:'none', transition:'opacity 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity='0.88'}
                    onMouseLeave={e => e.currentTarget.style.opacity='1'}
                  >
                    <ShoppingBag size={16} /> Add Combo to Order
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Bottom CTA banner ────────────────────────────────────── */}
        {activeCategory === 'All' && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:0.3 }}
            style={{
              background:'linear-gradient(135deg,#4E2A1D,#93452B)',
              borderRadius:'20px', padding:'2rem 2.5rem',
              display:'flex', alignItems:'center', justifyContent:'space-between',
              gap:'1.5rem', flexWrap:'wrap',
            }}
          >
            <div>
              <h3 style={{ fontFamily:'var(--font-serif)', color:'#FFD580', fontSize:'1.5rem', marginBottom:'0.35rem' }}>
                Want to place a catering order?
              </h3>
              <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.95rem' }}>
                Call / WhatsApp us at <strong style={{ color:'white' }}>86552 05735</strong> · Ashima &amp; Chanchal
              </p>
            </div>
            <a
              href="https://wa.me/918655205735"
              target="_blank" rel="noreferrer"
              style={{
                display:'inline-flex', alignItems:'center', gap:'0.5rem',
                background:'#25D366', color:'white', fontWeight:700,
                padding:'0.75rem 1.5rem', borderRadius:'999px',
                fontSize:'0.95rem', boxShadow:'0 4px 16px rgba(37,211,102,0.35)',
                textDecoration:'none', whiteSpace:'nowrap',
              }}
            >
              💬 WhatsApp Us
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
