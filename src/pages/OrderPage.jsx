import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, MapPin, CreditCard, ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './OrderPage.css';

export default function OrderPage() {
  const { cart, subtotal, deliveryFee, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const sectionRef = useScrollReveal();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="page-wrapper section">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
          <span style={{ fontSize: '4rem', display: 'block', marginBottom: 'var(--space-4)' }}>🛍️</span>
          <h1 className="section-title">No Items to Order</h1>
          <p className="section-subtitle" style={{ margin: '0 auto var(--space-8)' }}>
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link to="/menu" className="btn btn-primary btn-lg">Browse Menu</Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 7) errs.phone = 'Valid phone number is required';
    if (!formData.address.trim()) errs.address = 'Delivery address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardName.trim()) errs.cardName = 'Name on card is required';
      if (!formData.cardNumber.trim() || formData.cardNumber.replaceAll(' ', '').length < 16) {
        errs.cardNumber = 'Valid 16-digit card number required';
      }
      if (!formData.cardExpiry.trim()) errs.cardExpiry = 'Expiry date required';
      if (!formData.cardCvc.trim() || formData.cardCvc.length < 3) errs.cardCvc = 'CVC required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const orderData = {
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        items: [...cart],
        subtotal,
        deliveryFee,
        tax,
        total,
        customer: { ...formData },
        placedAt: new Date().toISOString(),
        estimatedDelivery: '30-40 minutes',
      };

      // Clear cart & pass order data via router state
      clearCart();
      navigate('/order-confirmation', { state: { order: orderData } });
    }
  };

  return (
    <div className="page-wrapper section" ref={sectionRef}>
      <div className="container reveal">
        <Link to="/cart" className="back-link" style={{ marginBottom: 'var(--space-6)', display: 'inline-flex' }}>
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        <h1 className="section-title" style={{ marginBottom: 'var(--space-8)' }}>
          Checkout & <span className="gradient-text">Place Order</span>
        </h1>

        <form onSubmit={handleSubmit} className="order-page-grid">
          {/* Form Fields */}
          <div className="order-form-container">
            {/* Customer Details */}
            <div className="form-card glass-card">
              <h3 className="form-card-title">
                <User size={20} className="form-title-icon" /> Customer Information
              </h3>
              <div className="form-grid-2">
                <div className="input-group">
                  <label className="input-label">Full Name *</label>
                  <input
                    type="text"
                    className={`input-field ${errors.name ? 'input-error' : ''}`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label">Email Address *</label>
                  <input
                    type="email"
                    className={`input-field ${errors.email ? 'input-error' : ''}`}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>

              <div className="input-group" style={{ marginTop: 'var(--space-4)' }}>
                <label className="input-label">Phone Number *</label>
                <input
                  type="tel"
                  className={`input-field ${errors.phone ? 'input-error' : ''}`}
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="form-card glass-card">
              <h3 className="form-card-title">
                <MapPin size={20} className="form-title-icon" /> Delivery Address
              </h3>
              <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
                <label className="input-label">Street Address *</label>
                <input
                  type="text"
                  className={`input-field ${errors.address ? 'input-error' : ''}`}
                  placeholder="123 Main St, Apt 4B"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-grid-2">
                <div className="input-group">
                  <label className="input-label">City *</label>
                  <input
                    type="text"
                    className={`input-field ${errors.city ? 'input-error' : ''}`}
                    placeholder="Flavor City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="input-group">
                  <label className="input-label">Postal Code *</label>
                  <input
                    type="text"
                    className={`input-field ${errors.postalCode ? 'input-error' : ''}`}
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                  {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
                </div>
              </div>

              <div className="input-group" style={{ marginTop: 'var(--space-4)' }}>
                <label className="input-label">Delivery Notes (Optional)</label>
                <textarea
                  className="input-field"
                  rows="2"
                  placeholder="Ring doorbell, leave at door..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-card glass-card">
              <h3 className="form-card-title">
                <CreditCard size={20} className="form-title-icon" /> Payment Options
              </h3>

              <div className="payment-options">
                <label className={`payment-option ${formData.paymentMethod === 'card' ? 'payment-option-active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  <span>Credit / Debit Card</span>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'payment-option-active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="card-fields animate-fade-in" style={{ marginTop: 'var(--space-4)' }}>
                  <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
                    <label className="input-label">Cardholder Name *</label>
                    <input
                      type="text"
                      className={`input-field ${errors.cardName ? 'input-error' : ''}`}
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    />
                    {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                  </div>

                  <div className="input-group" style={{ marginBottom: 'var(--space-4)' }}>
                    <label className="input-label">Card Number *</label>
                    <input
                      type="text"
                      className={`input-field ${errors.cardNumber ? 'input-error' : ''}`}
                      placeholder="4532 0000 0000 0000"
                      maxLength="19"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    />
                    {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                  </div>

                  <div className="form-grid-2">
                    <div className="input-group">
                      <label className="input-label">Expiry Date *</label>
                      <input
                        type="text"
                        className={`input-field ${errors.cardExpiry ? 'input-error' : ''}`}
                        placeholder="MM/YY"
                        maxLength="5"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      />
                      {errors.cardExpiry && <span className="error-text">{errors.cardExpiry}</span>}
                    </div>

                    <div className="input-group">
                      <label className="input-label">CVC / CVV *</label>
                      <input
                        type="password"
                        className={`input-field ${errors.cardCvc ? 'input-error' : ''}`}
                        placeholder="123"
                        maxLength="4"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      />
                      {errors.cardCvc && <span className="error-text">{errors.cardCvc}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-sidebar">
            <div className="cart-summary-box glass-card">
              <h3 className="summary-title">Order Items ({cart.length})</h3>
              <div className="order-summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="order-summary-item">
                    <img src={item.image} alt={item.name} className="order-item-thumb" />
                    <div className="order-item-info">
                      <span className="order-item-title">{item.name}</span>
                      <span className="order-item-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="order-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-list" style={{ marginTop: 'var(--space-4)' }}>
                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-item summary-item-total">
                  <span>Total Due</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ marginTop: 'var(--space-6)' }}>
                <CheckCircle size={20} /> Place Order Now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
