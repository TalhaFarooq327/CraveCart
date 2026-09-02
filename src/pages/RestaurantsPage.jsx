import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Search } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import SearchBar from '../components/menu/SearchBar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../components/home/FeaturedRestaurants.css';

export default function RestaurantsPage() {
  const [search, setSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const sectionRef = useScrollReveal();

  const cuisines = useMemo(() => {
    const set = new Set();
    restaurants.forEach(r => r.cuisine.forEach(c => set.add(c)));
    return Array.from(set);
  }, []);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                            r.cuisine.some(c => c.toLowerCase().includes(search.toLowerCase())) ||
                            r.address.toLowerCase().includes(search.toLowerCase());
      const matchesCuisine = selectedCuisine === 'all' || r.cuisine.includes(selectedCuisine);
      return matchesSearch && matchesCuisine;
    });
  }, [search, selectedCuisine]);

  return (
    <div className="page-wrapper section" ref={sectionRef}>
      <div className="container reveal">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h1 className="section-title">
            All <span className="gradient-text">Restaurants</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto var(--space-8)' }}>
            Discover top-rated dining spots, cafes, and bakeries in your area
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search restaurants by name or cuisine..." />
          </div>

          <div className="category-chips" style={{ justifyContent: 'center' }}>
            <button
              className={`chip ${selectedCuisine === 'all' ? 'chip-active' : ''}`}
              onClick={() => setSelectedCuisine('all')}
            >
              All Cuisines
            </button>
            {cuisines.map(c => (
              <button
                key={c}
                className={`chip ${selectedCuisine === c ? 'chip-active' : ''}`}
                onClick={() => setSelectedCuisine(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--space-4)' }}>🔍</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-xl)', marginBottom: 'var(--space-2)' }}>
              No restaurants found
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Try searching with a different name or clear your cuisine filters.
            </p>
          </div>
        ) : (
          <div className="featured-grid">
            {filteredRestaurants.map(r => (
              <Link to={`/restaurant/${r.id}`} key={r.id} className="restaurant-card glass-card">
                <div className="restaurant-image-wrapper">
                  <img src={r.image} alt={r.name} className="restaurant-image" />
                  <div className="restaurant-image-overlay" />
                  {r.isFeatured && (
                    <span className="badge badge-primary restaurant-featured-badge">Featured</span>
                  )}
                  <div className={`restaurant-status ${r.isOpen ? 'status-open' : 'status-closed'}`}>
                    <span className="status-dot" />
                    {r.isOpen ? 'Open Now' : 'Closed'}
                  </div>
                </div>
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{r.name}</h3>
                  <div className="restaurant-cuisine">
                    {r.cuisine.map(c => (
                      <span key={c} className="cuisine-tag">{c}</span>
                    ))}
                  </div>
                  <div className="restaurant-meta">
                    <span className="restaurant-rating">
                      <Star size={14} fill="currentColor" />
                      {r.rating}
                      <span className="review-count">({r.reviewCount})</span>
                    </span>
                    <span className="restaurant-delivery">
                      <Clock size={14} />
                      {r.deliveryTime}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginTop: 'var(--space-3)', fontSize: 'var(--fs-xs)', color: 'var(--text-tertiary)' }}>
                    <MapPin size={12} />
                    <span>{r.address}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
