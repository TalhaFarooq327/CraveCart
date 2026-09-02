import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Clock, Star, Truck } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
      </div>

      <div className="container hero-inner">
        <div className="hero-content">


          <h1 className="hero-title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Delicious Food,{' '}
            <span className="gradient-text">Delivered Fast</span>{' '}
            To Your Door
          </h1>

          <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Explore hundreds of dishes from the best local restaurants. Fresh ingredients,
            fast delivery, and flavors that make every meal unforgettable.
          </p>

          <form className="hero-search animate-fade-in-up" onSubmit={handleSearch} style={{ animationDelay: '0.3s' }}>
            <Search size={20} className="hero-search-icon" />
            <input
              type="text"
              placeholder="Search for food, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hero-search-input"
            />
            <button type="submit" className="btn btn-primary hero-search-btn">
              Search
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="hero-stats animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="hero-stat">
              <div className="hero-stat-icon">
                <Truck size={20} />
              </div>
              <div>
                <span className="hero-stat-value">500+</span>
                <span className="hero-stat-label">Restaurants</span>
              </div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-icon">
                <Star size={20} />
              </div>
              <div>
                <span className="hero-stat-value">10K+</span>
                <span className="hero-stat-label">Happy Users</span>
              </div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-icon">
                <Clock size={20} />
              </div>
              <div>
                <span className="hero-stat-value">30 min</span>
                <span className="hero-stat-label">Avg Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop"
              alt="Delicious food"
              className="hero-image"
            />
            <div className="hero-float-card hero-float-1 animate-float">
              <span>🍕</span>
              <div>
                <strong>Pizza Paradise</strong>
                <span className="hero-float-rating">⭐ 4.8</span>
              </div>
            </div>
            <div className="hero-float-card hero-float-2 animate-float" style={{ animationDelay: '1s' }}>
              <span>🚚</span>
              <div>
                <strong>Free Delivery</strong>
                <span className="hero-float-sub">Orders $20+</span>
              </div>
            </div>
            <div className="hero-float-card hero-float-3 animate-float" style={{ animationDelay: '2s' }}>
              <span>⏱️</span>
              <div>
                <strong>25 min</strong>
                <span className="hero-float-sub">Est. delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
