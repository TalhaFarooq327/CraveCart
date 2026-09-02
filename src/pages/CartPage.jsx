import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, deliveryFee, tax, total } = useCart();
  const sectionRef = useScrollReveal();

  if (cart.length === 0) {
    return (
      <div className="page-wrapper section">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: 'var(--space-4)' }}>🛒</span>
          <h1 className="section-title">Your Cart is Empty</h1>
          <p className="section-subtitle" style={{ margin: '0 auto var(--space-8)' }}>
            Explore our delicious menu and add your favorite dishes to the cart!
          </p>
          <Link to="/menu" className="btn btn-primary btn-lg">
            Explore Menu <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper section" ref={sectionRef}>
      <div className="container reveal">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <Link to="/menu" className="back-link">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)' }}>
            <h1 className="section-title">
              Shopping <span className="gradient-text">Cart</span> ({cart.length} items)
            </h1>
            <button className="btn-clear-cart" onClick={clearCart}>
              <Trash2 size={16} /> Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-page-grid">
          {/* Cart Items List */}
          <div className="cart-items-container">
            {cart.map((item) => (
              <div key={item.id} className="cart-page-item glass-card">
                <img src={item.image} alt={item.name} className="cart-page-item-img" />
                <div className="cart-page-item-info">
                  <span className="cart-page-item-cat">{item.category.replace('-', ' ')}</span>
                  <h3 className="cart-page-item-name">{item.name}</h3>
                  <span className="cart-page-item-price">${item.price.toFixed(2)} each</span>
                </div>
                <div className="cart-page-item-qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                    <Plus size={14} />
                  </button>
                </div>
                <div className="cart-page-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="cart-page-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="cart-summary-box glass-card">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-list">
              <div className="summary-item">
                <span>Items Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-item summary-item-total">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/order" className="btn btn-primary btn-lg btn-block" style={{ marginTop: 'var(--space-6)' }}>
              Proceed to Checkout <ArrowRight size={20} />
            </Link>

            <div className="secure-badge">
              🔒 100% Secure Checkout Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
