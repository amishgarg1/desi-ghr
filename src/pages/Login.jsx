import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) {
      toast.success('Welcome back!');
      navigate('/');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  const field = { border: '2px solid #eee', borderRadius: '14px', background: '#FAFAFA', padding: '0.9rem 1rem 0.9rem 3rem', width: '100%', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s' };

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
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-secondary)', marginTop: '2rem', marginBottom: '0.4rem' }}>Welcome Back</h2>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#bbb', display: 'block', marginBottom: '0.4rem', marginLeft: '0.25rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                <input required type="email" placeholder="rahul@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  style={field} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#bbb', display: 'block', marginBottom: '0.4rem', marginLeft: '0.25rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                <input required type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  style={field} onFocus={e => e.target.style.borderColor = 'var(--color-primary)'} onBlur={e => e.target.style.borderColor = '#eee'} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#bbb', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', borderRadius: '14px', fontSize: '1rem', marginTop: '0.5rem', opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? 'Signing in...' : <><span>Sign In</span><ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>Sign Up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
