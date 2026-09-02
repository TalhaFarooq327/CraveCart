import { Link } from 'react-router-dom';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { restaurants } from '../../data/restaurants';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FeaturedRestaurants.css';

export default function FeaturedRestaurants() {
  const featured = restaurants.filter(r => r.isFeatured).slice(0, 4);
  const sectionRef = useScrollReveal();

  return (
    <section className="section" ref={sectionRef}>
      <div className="container reveal">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 className="section-title">
              Featured <span className="gradient-text">Restaurants</span>
            </h2>
            <p className="section-subtitle">
              Top-rated restaurants handpicked for the best dining experience
            </p>
          </div>
          <Link to="/restaurants" className="btn btn-secondary" style={{ flexShrink: 0 }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="featured-grid">
          {featured.map((restaurant, index) => (
            <Link
              to={`/restaurant/${restaurant.id}`}
              key={restaurant.id}
              className="restaurant-card glass-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="restaurant-image-wrapper">
                <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                <div className="restaurant-image-overlay" />
                {restaurant.isFeatured && (
                  <span className="badge badge-primary restaurant-featured-badge">Featured</span>
                )}
                <div className={`restaurant-status ${restaurant.isOpen ? 'status-open' : 'status-closed'}`}>
                  <span className="status-dot" />
                  {restaurant.isOpen ? 'Open Now' : 'Closed'}
                </div>
              </div>
              <div className="restaurant-info">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <div className="restaurant-cuisine">
                  {restaurant.cuisine.map(c => (
                    <span key={c} className="cuisine-tag">{c}</span>
                  ))}
                </div>
                <div className="restaurant-meta">
                  <span className="restaurant-rating">
                    <Star size={14} fill="currentColor" />
                    {restaurant.rating}
                    <span className="review-count">({restaurant.reviewCount})</span>
                  </span>
                  <span className="restaurant-delivery">
                    <Clock size={14} />
                    {restaurant.deliveryTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
