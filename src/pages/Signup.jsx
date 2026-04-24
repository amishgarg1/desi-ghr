import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(form.name, form.email, form.password, form.phone);
    if (result.success) {
      toast.success('Account created! Welcome to Desi Ghr 🎉');
      navigate('/');
    } else {
      toast.error(result.error || 'Registration failed');
    }
  };

  const field = { border: '2px solid #eee', borderRadius: '14px', background: '#FAFAFA', padding: '0.9rem 1rem 0.9rem 3rem', width: '100%', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s' };

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Rahul Sharma', icon: <User size={16} /> },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'rahul@example.com', icon: <Mail size={16} /> },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210', icon: <Phone size={16} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FDF8F5 0%, #F5EDE6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'white', borderRadius: '32px', padding: '3rem', boxShadow: '0 32px 80px rgba(147,69,43,0.1)' }}>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-primary)', lineHeight: 1 }}>Desi Ghr</h1>
              <p style={{ fontSize: '0.7rem', letterSpacing: '3px', color: 'var(--color-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Dil Mange More</p>
            </Link>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-secondary)', marginTop: '2rem', marginBottom: '0.4rem' }}>Create Account</h2>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Join Desi Ghr and enjoy homemade food</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {fields.map(f => (
              <div key={f.name}>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#bbb', display: 'block', marginBottom: '0.4rem', marginLeft: '0.25rem' }}>{f.label}</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }}>{f.icon}</span>
                  <input required name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={e => setForm({...form, [f.name]: e.target.value})}
                    style={field} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                </div>
              </div>
            ))}

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#bbb', display: 'block', marginBottom: '0.4rem', marginLeft: '0.25rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                <input required type={showPw ? 'text' : 'password'} placeholder="Min 6 characters" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  style={field} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#bbb', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', borderRadius: '14px', fontSize: '1rem', marginTop: '0.5rem', opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? 'Creating Account...' : <><span>Create Account</span><ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
