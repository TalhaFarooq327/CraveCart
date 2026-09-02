import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Categories.css';

export default function Categories() {
  const navigate = useNavigate();
  const sectionRef = useScrollReveal();

  return (
    <section className="section categories-section" ref={sectionRef}>
      <div className="container reveal">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2 className="section-title">
            Browse by <span className="gradient-text">Category</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Explore our wide variety of cuisines and find exactly what you&apos;re craving
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              className="category-card"
              onClick={() => navigate(`/menu?category=${cat.id}`)}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="category-icon-wrapper" style={{ background: cat.gradient }}>
                <span className="category-icon">{cat.icon}</span>
              </div>
              <h3 className="category-name">{cat.name}</h3>
              <span className="category-count">{cat.count} items</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
