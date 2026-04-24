import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
          <Link to="/menu" className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`}>Our Menu</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>Catering & About</Link>
        </nav>

        {/* Desktop action */}
        <div style={{ display: 'none' }} className="desktop-action">
          <Link to="/menu" className="btn btn-primary">Order Now</Link>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-toggle" 
          style={{ display: 'block' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} color="var(--color-secondary)" /> : <MenuIcon size={28} color="var(--color-secondary)" />}
        </button>
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
          <Link to="/menu" className="nav-link">Our Menu</Link>
          <Link to="/about" className="nav-link">Catering & About</Link>
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
