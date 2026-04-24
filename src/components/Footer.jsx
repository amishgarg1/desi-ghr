import { Link } from 'react-router-dom';
import { Camera, Phone, Heart, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: '700', color: 'white', lineHeight: '1' }}>Desi Ghr</span>
              <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--color-accent)', textTransform: 'uppercase', fontWeight: '600' }}>Dil Mange More</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
              Homemade with love. Delicious, hygienic & quality food delivered to your doorstep.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/about">Catering Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Review Us</h4>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem', fontStyle: 'italic' }}>
              "Agar dil khush ho gaya ho... to hume zaroor batana"
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ background: 'white', color: '#CB202D', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 'bold' }}>Zomato</span>
              <span style={{ background: '#FC8019', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 'bold' }}>Swiggy</span>
            </div>
          </div>
          
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Contact Us</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={20} color="var(--color-accent)" />
                <a href="tel:7023800696">7023800696</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Camera size={20} color="var(--color-accent)" />
                <a href="https://instagram.com/desighr" target="_blank" rel="noreferrer">@desighr</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
            &copy; {new Date().getFullYear()} Desi Ghr. All rights reserved.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
            Made with <Heart size={14} color="var(--color-accent)" fill="var(--color-accent)" /> for food lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
