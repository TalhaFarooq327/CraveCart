import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Save, LogOut, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const { addToast } = useToast();
  const sectionRef = useScrollReveal();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({ name, phone, address });
    addToast('Profile updated successfully!');
  };

  return (
    <div className="page-wrapper section" ref={sectionRef}>
      <div className="container reveal" style={{ maxWidth: '800px' }}>
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h1 className="section-title">
            My <span className="gradient-text">Profile</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Manage your account settings and delivery preferences
          </p>
        </div>

        <div className="glass-card" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-8)', paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-2xl)', fontWeight: 'bold' }}>{user.name}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Email Address (Read-only)</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  className="input-field"
                  value={user.email}
                  disabled
                  style={{ opacity: 0.7 }}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <div className="input-with-icon">
                <Phone size={18} className="input-icon" />
                <input
                  type="tel"
                  className="input-field"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Default Delivery Address</label>
              <div className="input-with-icon">
                <MapPin size={18} className="input-icon" />
                <input
                  type="text"
                  className="input-field"
                  placeholder="123 Main St, City"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)' }}>
              <button type="button" className="btn btn-outline" onClick={logout} style={{ color: '#F44336', borderColor: '#F44336' }}>
                <LogOut size={18} /> Sign Out
              </button>

              <button type="submit" className="btn btn-primary">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
