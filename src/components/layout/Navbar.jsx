import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout, openAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/restaurants', label: 'Restaurants' },
    { path: '/menu', label: 'Menu' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand">
            <span className="brand-text">Crave<span className="brand-accent">Cart</span></span>
          </Link>

          <div className="navbar-links">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <button
              className="btn-icon theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/cart" className="cart-btn">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="profile-dropdown">
                <button
                  className="profile-btn"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="profile-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={16} />
                </button>
                {isProfileOpen && (
                  <div className="dropdown-menu animate-scale-in">
                    <Link to="/profile" className="dropdown-item">
                      <User size={16} />
                      Profile
                    </Link>
                    <button className="dropdown-item" onClick={logout}>
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={() => openAuth('login')}>
                Sign In
              </button>
            )}

            <button
              className="mobile-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${isMobileOpen ? 'mobile-overlay-open' : ''}`} onClick={() => setIsMobileOpen(false)} />
      <div className={`mobile-menu ${isMobileOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="brand-text">Crave<span className="brand-accent">Cart</span></span>
          <button onClick={() => setIsMobileOpen(false)}><X size={24} /></button>
        </div>
        <div className="mobile-menu-links">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-link ${location.pathname === link.path ? 'mobile-link-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/cart" className="mobile-link">
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="mobile-link">Profile</Link>
              <button className="mobile-link" onClick={logout}>Logout</button>
            </>
          ) : (
            <button className="mobile-link" onClick={() => { openAuth('login'); setIsMobileOpen(false); }}>
              Sign In
            </button>
          )}
        </div>
        <div className="mobile-menu-footer">
          <button className="btn btn-secondary" onClick={toggleTheme} style={{ width: '100%' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </>
  );
}
