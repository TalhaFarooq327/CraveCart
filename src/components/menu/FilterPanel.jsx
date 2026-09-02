import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { categories } from '../../data/categories';
import './FilterPanel.css';

export default function FilterPanel({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onReset,
}) {
  return (
    <div className="filter-panel glass-card">
      <div className="filter-header">
        <div className="filter-title-group">
          <SlidersHorizontal size={18} className="filter-title-icon" />
          <h3 className="filter-title">Filters</h3>
        </div>
        <button className="btn-reset" onClick={onReset} title="Reset all filters">
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Category Pills */}
      <div className="filter-group">
        <label className="filter-label">Categories</label>
        <div className="category-chips">
          <button
            className={`chip ${selectedCategory === 'all' ? 'chip-active' : ''}`}
            onClick={() => onCategoryChange('all')}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`chip ${selectedCategory === cat.id ? 'chip-active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              <span className="chip-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="filter-group">
        <div className="filter-label-row">
          <label className="filter-label">Max Price</label>
          <span className="price-display">${priceRange}</span>
        </div>
        <input
          type="range"
          min="4"
          max="25"
          step="1"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="price-slider"
        />
        <div className="slider-labels">
          <span>$4</span>
          <span>$25</span>
        </div>
      </div>

      {/* Sort By */}
      <div className="filter-group">
        <label className="filter-label">Sort By</label>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="popular">Popularity</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
