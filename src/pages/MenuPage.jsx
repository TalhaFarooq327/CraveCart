import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { foods } from '../data/foods';
import SearchBar from '../components/menu/SearchBar';
import FilterPanel from '../components/menu/FilterPanel';
import PopularItems from '../components/home/PopularItems';
import { Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../components/home/PopularItems.css';

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(25);
  const [sortBy, setSortBy] = useState('popular');

  const { addToCart } = useCart();
  const { addToast } = useToast();
  const sectionRef = useScrollReveal();

  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category'));
    }
    if (searchParams.get('search')) {
      setSearch(searchParams.get('search'));
    }
  }, [searchParams]);

  const filteredFoods = useMemo(() => {
    let result = foods.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                            f.description.toLowerCase().includes(search.toLowerCase()) ||
                            f.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
      const matchesPrice = f.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === 'popular') {
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, selectedCategory, priceRange, sortBy]);

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('all');
    setPriceRange(25);
    setSortBy('popular');
  };

  const handleAddToCart = (food) => {
    addToCart(food);
    addToast(`${food.name} added to cart!`);
  };

  return (
    <div className="page-wrapper section" ref={sectionRef}>
      <div className="container reveal">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h1 className="section-title">
            Explore Our <span className="gradient-text">Menu</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto var(--space-8)' }}>
            Filter by category, price, and rating to find your next meal
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search dishes by name or ingredient..." />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-8)', marginTop: 'var(--space-8)' }}>
          {/* Filters Sidebar */}
          <FilterPanel
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={handleReset}
          />

          {/* Food Grid */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                Showing <strong>{filteredFoods.length}</strong> items
              </span>
            </div>

            {filteredFoods.length === 0 ? (
              <div className="glass-card" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--space-4)' }}>🍽️</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-xl)', marginBottom: 'var(--space-2)' }}>
                  No food items found
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                  Try adjusting your search criteria or price range.
                </p>
                <button className="btn btn-primary" onClick={handleReset}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-6)' }}>
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
      </div>
    </div>
  );
}
