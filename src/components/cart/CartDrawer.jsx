import { Link } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, subtotal, deliveryFee, tax, total, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-drawer-overlay" onClick={onClose} />
      <div className="cart-drawer animate-slide-in-right">
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <ShoppingBag size={20} className="cart-icon" />
            <span>Your Order ({cart.length})</span>
          </div>
          <button className="cart-drawer-close" onClick={onClose} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-state">
            <span className="empty-emoji">🛒</span>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven&apos;t added any delicious meals yet.</p>
            <button className="btn btn-primary" onClick={onClose}>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-drawer-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                    <div className="cart-item-controls">
                      <div className="qty-control">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        className="btn-remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="cart-drawer-actions">
                <Link to="/order" className="btn btn-primary btn-block" onClick={onClose}>
                  Checkout Now <ArrowRight size={18} />
                </Link>
                <div className="cart-drawer-subactions">
                  <Link to="/cart" className="view-cart-link" onClick={onClose}>
                    View Full Cart
                  </Link>
                  <button className="clear-cart-btn" onClick={clearCart}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
