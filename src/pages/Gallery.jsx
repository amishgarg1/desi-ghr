import { motion } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80", // Thali
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80", // Salad/Chaat
  "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80", // Curries
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80", // Samosa/Snacks
  "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80", // Sweets
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80"  // Roti
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

const Gallery = () => {
  return (
    <div className="pt-24 pb-12 overflow-hidden">
      <div className="container text-center mb-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="heading-xl">Our <span className="text-primary">Gallery</span></h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
            A visual treat of our authentic homemade cuisine. 
            Every dish is prepared with the utmost hygiene, quality, and love.
          </p>
        </motion.div>
      </div>

      <div className="container">
        <motion.div 
          className="gallery-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {images.map((src, idx) => (
            <motion.div key={idx} variants={item} className="gallery-item relative overflow-hidden rounded-2xl group shadow-md border border-gray-100">
              <img 
                src={src} 
                alt={`Desi Ghr food ${idx + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', aspectRatio: '4/3' }}
                className="transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium tracking-wide">Homemade with Love</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Internal CSS specifically for the gallery masonry-like grid */}
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
        .gallery-item {
          background: var(--color-surface);
        }
      `}</style>
    </div>
  );
};

export default Gallery;
