import { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './AuthModal.css';

export default function AuthModal() {
  const { showAuthModal, closeAuth, authMode, setAuthMode, login, signup } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!showAuthModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (authMode === 'signup' && !name)) {
      setError('Please fill in all required fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (authMode === 'login') {
      login({ email });
      addToast('Welcome back to CraveCart!');
    } else {
      signup({ name, email });
      addToast('Account created successfully!');
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={closeAuth}>
      <div className="auth-modal glass-card animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={closeAuth} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="auth-header">
          <h2 className="auth-title">
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="auth-subtitle">
            {authMode === 'login'
              ? 'Sign in to access your orders and favorites'
              : 'Join CraveCart for fast food delivery & exclusive deals'}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${authMode === 'login' ? 'auth-tab-active' : ''}`}
            onClick={() => { setAuthMode('login'); setError(''); }}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${authMode === 'signup' ? 'auth-tab-active' : ''}`}
            onClick={() => { setAuthMode('signup'); setError(''); }}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {authMode === 'signup' && (
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  className="input-field"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                className="input-field"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block auth-submit-btn">
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
