import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Utensils, TrendingUp, CheckCircle, Clock, Truck, X, Plus, Trash2, BarChart3, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusColors = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  preparing: '#8b5cf6',
  out_for_delivery: '#06b6d4',
  delivered: '#10b981',
  cancelled: '#ef4444'
};

const statusLabels = {
  pending: '⏳ Pending',
  confirmed: '✅ Confirmed',
  preparing: '👨‍🍳 Preparing',
  out_for_delivery: '🚴 Out for Delivery',
  delivered: '✔️ Delivered',
  cancelled: '❌ Cancelled'
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, authHeaders, logout } = useAuthStore();
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', category: 'Breakfast & Snacks', price: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin()) { navigate('/login'); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [ordRes, menuRes, statsRes] = await Promise.all([
        fetch(`${API}/orders`, { headers: authHeaders() }),
        fetch(`${API}/menu/all`, { headers: authHeaders() }),
        fetch(`${API}/orders/stats`, { headers: authHeaders() })
      ]);
      if (ordRes.ok) setOrders(await ordRes.json());
      if (menuRes.ok) setMenuItems(await menuRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (e) { toast.error('Failed to load data'); }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    const res = await fetch(`${API}/orders/${id}/status`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ status }) });
    if (res.ok) { toast.success('Status updated'); fetchAll(); }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this menu item?')) return;
    const res = await fetch(`${API}/menu/${id}`, { method: 'DELETE', headers: authHeaders() });
    if (res.ok) { toast.success('Item deleted'); fetchAll(); }
  };

  const addItem = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/menu`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ ...newItem, price: Number(newItem.price) }) });
    if (res.ok) { toast.success('Menu item added!'); setShowAddForm(false); setNewItem({ name: '', category: 'Breakfast & Snacks', price: '', description: '' }); fetchAll(); }
    else { const d = await res.json(); toast.error(d.message); }
  };

  const toggleAvailable = async (item) => {
    const res = await fetch(`${API}/menu/${item._id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ isAvailable: !item.isAvailable }) });
    if (res.ok) { toast.success('Availability updated'); fetchAll(); }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ width: '48px', height: '48px', border: '4px solid rgba(147,69,43,0.1)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: 'var(--color-text-light)' }}>Loading dashboard...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const statCards = [
    { label: 'Total Orders', value: stats?.totalOrders || 0, icon: <ShoppingBag size={24} />, color: '#93452B' },
    { label: 'Total Revenue', value: `₹${stats?.totalRevenue || 0}`, icon: <TrendingUp size={24} />, color: '#6C7A46' },
    { label: 'Pending', value: stats?.pending || 0, icon: <Clock size={24} />, color: '#f59e0b' },
    { label: 'Delivered', value: stats?.delivered || 0, icon: <CheckCircle size={24} />, color: '#10b981' },
  ];

  return (
    <div style={{ background: '#F8F5F2', minHeight: '100vh', paddingTop: '1rem' }}>
      {/* Admin Header */}
      <div style={{ background: 'var(--color-secondary)', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '1.5rem', margin: 0 }}>Desi Ghr <span style={{ color: 'var(--color-accent)' }}>Admin</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: 0 }}>Welcome, {user?.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/')} className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>View Site</button>
          <button onClick={() => { logout(); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
          {statCards.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ background: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <p style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>{s.label}</p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-secondary)', margin: 0, lineHeight: 1.2 }}>{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[{ id: 'orders', label: 'Orders', icon: <ShoppingBag size={16} /> }, { id: 'menu', label: 'Menu Items', icon: <Utensils size={16} /> }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s',
                background: tab === t.id ? 'var(--color-primary)' : 'white',
                color: tab === t.id ? 'white' : 'var(--color-text-light)',
                boxShadow: tab === t.id ? '0 4px 12px rgba(147,69,43,0.3)' : '0 2px 8px rgba(0,0,0,0.04)'
              }}>{t.icon}{t.label}</button>
          ))}
        </div>

        {/* Orders Tab */}
        {tab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#FAFAFA', borderBottom: '2px solid #f0f0f0' }}>
                  {['Customer', 'Items', 'Total', 'Payment', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#bbb' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#ccc' }}>No orders yet.</td></tr>
                ) : orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{order.customerInfo?.name}</p>
                      <p style={{ color: '#aaa', fontSize: '0.75rem', margin: 0 }}>{order.customerInfo?.phone}</p>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>{order.items?.length} items</p>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>₹{order.total}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ background: '#f5f5f5', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{order.paymentMethod}</span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ background: `${statusColors[order.status]}15`, color: statusColors[order.status], padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>{statusLabels[order.status]}</span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)}
                        style={{ border: '2px solid #eee', borderRadius: '10px', padding: '0.4rem 0.75rem', fontSize: '0.8rem', outline: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                        {Object.keys(statusLabels).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Menu Tab */}
        {tab === 'menu' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', borderRadius: '12px', fontSize: '0.875rem' }}>
                <Plus size={16} style={{ marginRight: '0.4rem' }} /> Add Item
              </button>
            </div>

            {showAddForm && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: 'white', borderRadius: '20px', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>Add New Menu Item</h3>
                <form onSubmit={addItem} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'end' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Name</label>
                    <input required value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} placeholder="e.g. Poha"
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #eee', borderRadius: '12px', outline: 'none', fontFamily: 'var(--font-sans)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Category</label>
                    <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #eee', borderRadius: '12px', outline: 'none', fontFamily: 'var(--font-sans)', cursor: 'pointer' }}>
                      {['Breakfast & Snacks','Chutney','Roti','Raita','Rice','Sweet','Sabji','Combo'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Price (₹)</label>
                    <input required type="number" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} placeholder="e.g. 80"
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #eee', borderRadius: '12px', outline: 'none', fontFamily: 'var(--font-sans)' }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setShowAddForm(false)} style={{ padding: '0.65rem 1.25rem', border: '2px solid #eee', borderRadius: '12px', background: 'white', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', borderRadius: '12px', fontSize: '0.875rem' }}>Save Item</button>
                  </div>
                </form>
              </motion.div>
            )}

            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#FAFAFA', borderBottom: '2px solid #f0f0f0' }}>
                    {['Name', 'Category', 'Price', 'Available', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#bbb' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                      <td style={{ padding: '1rem 1.25rem', fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</td>
                      <td style={{ padding: '1rem 1.25rem' }}><span style={{ background: '#f5f5f5', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, color: '#888' }}>{item.category}</span></td>
                      <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>₹{item.price}</td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <button onClick={() => toggleAvailable(item)} style={{ padding: '0.3rem 0.9rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem',
                          background: item.isAvailable ? '#d1fae5' : '#fee2e2', color: item.isAvailable ? '#059669' : '#dc2626' }}>
                          {item.isAvailable ? 'Available' : 'Unavailable'}
                        </button>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <button onClick={() => deleteItem(item._id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '10px', padding: '0.4rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 600 }}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AdminDashboard;
