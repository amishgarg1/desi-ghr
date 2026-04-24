import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';

const reviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    text: "The Dal Baati is absolutely authentic! It reminded me of my grandmother's cooking. Truly homemade with love.",
    date: "2 days ago"
  },
  {
    name: "Anjali Gupta",
    rating: 5,
    text: "I order their snacks every weekend. The Kanda Bhaji is so crispy and fresh. Highly recommended!",
    date: "1 week ago"
  },
  {
    name: "Vikram Mehra",
    rating: 4,
    text: "The Combo meals are very fulfilling and the prices are quite reasonable. Quality is top-notch.",
    date: "2 weeks ago"
  },
  {
    name: "Sneha Kapoor",
    rating: 5,
    text: "Best homemade food delivery in town. Clean, hygienic, and very tasty. Love the Gatte ki Sabji!",
    date: "1 month ago"
  },
  {
    name: "Amit Patel",
    rating: 5,
    text: "Ordered catering for a small house party. Everyone loved the food. The service was on time and professional.",
    date: "1 month ago"
  },
  {
    name: "Priya Das",
    rating: 4,
    text: "Wonderful flavors! The Lehsun Chutney is a must try with any of their rotis.",
    date: "2 months ago"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
};

const Reviews = () => {
  return (
    <div className="pt-32 pb-12">
      <div className="container text-center mb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="heading-xl">Customer <span className="text-primary">Reviews</span></h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-light)' }}>
            Don't just take our word for it. Here's what our happy customers have to say about their experience with Desi Ghr.
          </p>
        </motion.div>
      </div>

      <div className="container">
        <motion.div 
          className="grid grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {reviews.map((review, idx) => (
            <motion.div key={idx} variants={item} className="card relative flex flex-col h-full" style={{ padding: '2rem' }}>
              <div className="absolute top-4 right-4 opacity-10">
                <Quote size={48} className="text-primary" />
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < review.rating ? "var(--color-primary)" : "none"} 
                    className={i < review.rating ? "text-primary" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="flex-1 mb-6 italic" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div style={{ background: 'var(--color-background)', padding: '0.5rem', borderRadius: '50%' }}>
                  <User size={24} className="text-primary" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, margin: 0 }}>{review.name}</h4>
                  <p className="text-sm" style={{ color: 'var(--color-text-light)' }}>{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          className="mt-12 text-center p-8 bg-primary/5 rounded-3xl border border-primary/10"
        >
          <h3 className="heading-md">Had a great meal?</h3>
          <p className="mb-6">Share your experience with us and help us grow!</p>
          <button className="btn btn-primary">Write a Review</button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .grid-cols-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .grid-cols-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Reviews;
