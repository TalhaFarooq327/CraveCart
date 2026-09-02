import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowLeft, Plus, DollarSign, CheckCircle2, Search } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { foods } from '../data/foods';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './RestaurantDetailPage.css';
import '../components/home/PopularItems.css';

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const restaurant = restaurants.find(r => r.id === id);
  const restaurantFoods = foods.filter(f => f.restaurantId === id);

  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const { addToCart } = useCart();
  const { addToast } = useToast();
  const sectionRef = useScrollReveal();

  const foodCategories = useMemo(() => {
    const set = new Set();
    restaurantFoods.forEach(f => set.add(f.category));
    return Array.from(set);
  }, [restaurantFoods]);

  const filteredFoods = useMemo(() => {
    return restaurantFoods.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                            f.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedTag === 'all' || f.category === selectedTag;
      return matchesSearch && matchesCategory;
    });
  }, [restaurantFoods, search, selectedTag]);

  if (!restaurant) {
    return (
      <div className="page-wrapper section">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
          <h1 className="section-title">Restaurant Not Found</h1>
          <p className="section-subtitle" style={{ margin: '0 auto var(--space-8)' }}>
            The restaurant you are looking for does not exist or has been removed.
          </p>
          <Link to="/restaurants" className="btn btn-primary">Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (food) => {
    addToCart(food);
    addToast(`${food.name} added to cart!`);
  };

  return (
    <div className="page-wrapper restaurant-detail-page" ref={sectionRef}>
      {/* Hero Header */}
      <div className="rest-hero">
        <img src={restaurant.image} alt={restaurant.name} className="rest-hero-bg" />
        <div className="rest-hero-overlay" />

        <div className="container rest-hero-content">
          <Link to="/restaurants" className="btn btn-secondary btn-sm rest-back-btn">
            <ArrowLeft size={16} /> All Restaurants
          </Link>

          <div className="rest-header-main">
            <div>
              <div className="rest-status-badge">
                <span className={`status-dot ${restaurant.isOpen ? 'status-open-dot' : 'status-closed-dot'}`} />
                <span>{restaurant.isOpen ? 'Open Now' : 'Closed'}</span>
              </div>
              <h1 className="rest-name">{restaurant.name}</h1>
              <p className="rest-description">{restaurant.description}</p>
              <div className="rest-tags-row">
                {restaurant.cuisine.map(c => (
                  <span key={c} className="rest-cuisine-tag">{c}</span>
                ))}
                {restaurant.tags.map(t => (
                  <span key={t} className="rest-tag-pill">{t}</span>
                ))}
              </div>
            </div>

            {/* Spec Card */}
            <div className="rest-spec-card glass-card">
              <div className="spec-item">
                <Star size={18} className="spec-icon spec-gold" />
                <div>
                  <strong>{restaurant.rating} / 5.0</strong>
                  <span>{restaurant.reviewCount} Reviews</span>
                </div>
              </div>
              <div className="spec-item">
                <Clock size={18} className="spec-icon spec-orange" />
                <div>
                  <strong>{restaurant.deliveryTime}</strong>
                  <span>Delivery Time</span>
                </div>
              </div>
              <div className="spec-item">
                <DollarSign size={18} className="spec-icon spec-green" />
                <div>
                  <strong>${restaurant.deliveryFee.toFixed(2)} Fee</strong>
                  <span>Min order ${restaurant.minOrder}</span>
                </div>
              </div>
              <div className="spec-item">
                <MapPin size={18} className="spec-icon spec-blue" />
                <div>
                  <strong>{restaurant.address}</strong>
                  <span>Location</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container section reveal">
        <div className="rest-menu-header">
          <div>
            <h2 className="section-title">
              Menu Items at <span className="gradient-text">{restaurant.name}</span>
            </h2>
            <p className="section-subtitle">
              Freshly prepared dishes available for delivery
            </p>
          </div>

          <div className="rest-search-box">
            <Search size={18} className="rest-search-icon" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rest-search-input"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="rest-category-chips">
          <button
            className={`chip ${selectedTag === 'all' ? 'chip-active' : ''}`}
            onClick={() => setSelectedTag('all')}
          >
            All Items ({restaurantFoods.length})
          </button>
          {foodCategories.map(cat => (
            <button
              key={cat}
              className={`chip ${selectedTag === cat ? 'chip-active' : ''}`}
              onClick={() => setSelectedTag(cat)}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {filteredFoods.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--space-4)' }}>🍽️</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-xl)', marginBottom: 'var(--space-2)' }}>
              No dishes match your search
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>Try clearing your search term or category filter.</p>
          </div>
        ) : (
          <div className="popular-grid">
            {filteredFoods.map(food => (
              <div key={food.id} className="food-card glass-card">
                <div className="food-card-image-wrapper">
                  <img src={food.image} alt={food.name} className="food-card-image" />
                  <div className="food-card-overlay" />
                  {food.isPopular && (
                    <span className="badge badge-gold food-popular-badge">🔥 Popular</span>
                  )}
                  <button
                    className="food-card-add-btn"
                    onClick={() => handleAddToCart(food)}
                    aria-label={`Add ${food.name} to cart`}
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="food-card-info">
                  <div className="food-card-category">{food.category.replace('-', ' ')}</div>
                  <h3 className="food-card-name">{food.name}</h3>
                  <p className="food-card-desc">{food.description}</p>
                  <div className="food-card-footer">
                    <span className="food-card-price">${food.price.toFixed(2)}</span>
                    <span className="food-card-rating">
                      <Star size={14} fill="currentColor" />
                      {food.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
