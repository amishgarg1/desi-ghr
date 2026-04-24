import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="container flex items-center justify-between" style={{ gap: '4rem', flexWrap: 'wrap-reverse' }}>
          <div className="hero-content animate-fade-in flex-1">
            <div className="badge badge-primary mb-4">Dil Mange More</div>
            <h1 className="heading-xl">
              Authentic <span className="text-primary">Desi Food</span> Delivered to Your Doorstep
            </h1>
            <p className="text-lg mb-6" style={{ color: 'var(--color-text-light)', maxWidth: '90%' }}>
              Experience the true taste of homemade Indian cuisine. Prepared with love, traditional spices, and the highest hygiene standards.
            </p>
            <div className="flex gap-2">
              <Link to="/menu" className="btn btn-primary">
                Explore Menu <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn btn-outline">
                Catering Services
              </Link>
            </div>
            
            <div className="mt-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ccc', border: '2px solid white' }}></div>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#bbb', border: '2px solid white' }}></div>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#aaa', border: '2px solid white' }}></div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-primary">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-sm font-medium">Loved by 1000+ customers</p>
              </div>
            </div>
          </div>
          
          <div className="hero-image animate-fade-in delay-200 flex-1" style={{ minWidth: '300px' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
              <img 
                src="/hero_thali.png" 
                alt="Delicious Desi Thali" 
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                  objectFit: 'cover', borderRadius: '50%', boxShadow: 'var(--shadow-lg)',
                  border: '8px solid white'
                }} 
              />
              <div className="glass" style={{
                position: 'absolute', bottom: '10%', right: '-5%', padding: '1rem', 
                borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1rem'
              }}>
                <div style={{ background: 'var(--color-primary)', color: 'white', padding: '0.5rem', borderRadius: '50%' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>100% Hygienic</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>Homemade Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center mb-6 max-w-2xl mx-auto">
            <h2 className="heading-lg">Why Choose Desi Ghr?</h2>
            <p className="text-lg text-light">We bring the comfort of your home kitchen straight to your table.</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="card text-center flex flex-col items-center">
              <div style={{ background: 'var(--color-green-light)', color: 'var(--color-green)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', display: 'inline-block' }}>
                <Star size={32} />
              </div>
              <h3 className="heading-sm">Delicious Food</h3>
              <p className="text-sm">Authentic recipes passed down through generations, making every bite a celebration.</p>
            </div>
            <div className="card text-center flex flex-col items-center">
              <div style={{ background: 'rgba(224, 122, 95, 0.1)', color: 'var(--color-accent)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', display: 'inline-block' }}>
                <Clock size={32} />
              </div>
              <h3 className="heading-sm">On Time Service</h3>
              <p className="text-sm">Hot and fresh food delivered exactly when you need it, because your hunger can't wait.</p>
            </div>
            <div className="card text-center flex flex-col items-center">
              <div style={{ background: 'rgba(147, 69, 43, 0.1)', color: 'var(--color-primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem', display: 'inline-block' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 className="heading-sm">Hygienic & Quality</h3>
              <p className="text-sm">Prepared in a spotless environment using the finest, freshest ingredients available.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--color-secondary)', color: 'white' }}>
        <div className="container text-center">
          <h2 className="heading-lg" style={{ color: 'white' }}>Craving Something Special?</h2>
          <p className="text-lg mb-4" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'rgba(255,255,255,0.8)' }}>
            Check out our extensive menu featuring breakfast, snacks, thalis, and sweets. We have something to satisfy every craving.
          </p>
          <Link to="/menu" className="btn btn-primary" style={{ background: 'white', color: 'var(--color-secondary)' }}>
            View Full Menu
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
