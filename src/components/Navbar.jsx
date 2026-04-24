import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems, toggleCart } = useCartStore();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          {/* We'll use text for logo, though they have an image */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)', lineHeight: '1' }}>Desi Ghr</span>
            <span style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'var(--color-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Dil Mange More</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links" style={{ display: 'none' }} >
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/menu" className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`}>Menu</Link>
          <Link to="/gallery" className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}>Gallery</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About & Catering</Link>
        </nav>

        {/* Desktop action */}
        <div style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="desktop-action">
          <button onClick={toggleCart} className="relative transition hover:-translate-y-1">
            <ShoppingBag size={24} color="var(--color-text)" />
            {cartItemCount > 0 && (
              <span style={{ position: 'absolute', top: -6, right: -6, background: 'var(--color-primary)', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartItemCount}
              </span>
            )}
          </button>
          <Link to="/menu" className="btn btn-primary">Order Now</Link>
        </div>

        {/* Mobile controls */}
        <div className="mobile-toggle" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={toggleCart} className="relative">
            <ShoppingBag size={24} color="var(--color-secondary)" />
            {cartItemCount > 0 && (
              <span style={{ position: 'absolute', top: -6, right: -6, background: 'var(--color-primary)', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartItemCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} color="var(--color-secondary)" /> : <MenuIcon size={28} color="var(--color-secondary)" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, width: '100%', 
          background: 'var(--color-surface)', borderBottom: '1px solid rgba(0,0,0,0.05)',
          padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/about" className="nav-link">About & Catering</Link>
          <Link to="/menu" className="btn btn-primary mt-2" style={{ textAlign: 'center' }}>Order Now</Link>
        </div>
      )}

      {/* Quick CSS for responsive nav inside component for simplicity */}
      <style>{`
        @media (min-width: 768px) {
          .nav-links, .desktop-action { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
