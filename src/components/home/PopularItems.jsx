import { Link } from 'react-router-dom';
import { Star, Plus, ArrowRight } from 'lucide-react';
import { foods } from '../../data/foods';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './PopularItems.css';

export default function PopularItems() {
  const popular = foods.filter(f => f.isPopular).slice(0, 8);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const sectionRef = useScrollReveal();

  const handleAddToCart = (e, food) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(food);
    addToast(`${food.name} added to cart!`);
  };

  return (
    <section className="section popular-section" ref={sectionRef}>
      <div className="container reveal">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 className="section-title">
              Popular <span className="gradient-text">Dishes</span>
            </h2>
            <p className="section-subtitle">
              Most ordered dishes that our customers can&apos;t stop raving about
            </p>
          </div>
          <Link to="/menu" className="btn btn-secondary" style={{ flexShrink: 0 }}>
            View Menu <ArrowRight size={16} />
          </Link>
        </div>

        <div className="popular-grid">
          {popular.map((food, index) => (
            <div key={food.id} className="food-card glass-card" style={{ animationDelay: `${index * 0.08}s` }}>
              <div className="food-card-image-wrapper">
                <img src={food.image} alt={food.name} className="food-card-image" />
                <div className="food-card-overlay" />
                {food.isPopular && (
                  <span className="badge badge-gold food-popular-badge">🔥 Popular</span>
                )}
                <button
                  className="food-card-add-btn"
                  onClick={(e) => handleAddToCart(e, food)}
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
      </div>
    </section>
  );
}
