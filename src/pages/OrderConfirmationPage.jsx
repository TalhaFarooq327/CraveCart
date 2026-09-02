import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Package, MapPin, Clock, ArrowRight, Home } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './OrderConfirmationPage.css';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const order = location.state?.order;
  const sectionRef = useScrollReveal();

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page-wrapper section" ref={sectionRef}>
      <div className="container reveal" style={{ maxWidth: '800px' }}>
        <div className="confirmation-header glass-card">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={56} className="success-icon" />
          </div>
          <h1 className="confirmation-title">Order Placed Successfully!</h1>
          <p className="confirmation-subtitle">
            Thank you for ordering with CraveCart. Your food is being prepared!
          </p>

          <div className="order-tracking-badge">
            <span>Tracking Number:</span>
            <strong>{order.orderId}</strong>
          </div>
        </div>

        <div className="confirmation-details-grid">
          {/* Items Summary */}
          <div className="confirmation-card glass-card">
            <h3 className="card-title">
              <Package size={18} /> Ordered Items ({order.items.length})
            </h3>
            <div className="confirmation-items-list">
              {order.items.map((item) => (
                <div key={item.id} className="conf-item-row">
                  <img src={item.image} alt={item.name} className="conf-item-img" />
                  <div className="conf-item-info">
                    <span className="conf-item-name">{item.name}</span>
                    <span className="conf-item-qty">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                  </div>
                  <span className="conf-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="conf-summary-rows">
              <div className="conf-row">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="conf-row">
                <span>Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="conf-row">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="conf-row conf-total">
                <span>Total Paid</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="confirmation-card glass-card">
            <h3 className="card-title">
              <MapPin size={18} /> Delivery Details
            </h3>
            <div className="info-block">
              <label>Customer Name</label>
              <p>{order.customer.name}</p>
            </div>
            <div className="info-block">
              <label>Email & Phone</label>
              <p>{order.customer.email} • {order.customer.phone}</p>
            </div>
            <div className="info-block">
              <label>Delivery Address</label>
              <p>{order.customer.address}, {order.customer.city} {order.customer.postalCode}</p>
            </div>
            {order.customer.notes && (
              <div className="info-block">
                <label>Notes</label>
                <p>{order.customer.notes}</p>
              </div>
            )}
            <div className="info-block est-time">
              <Clock size={16} />
              <span>Estimated Delivery Time: <strong>{order.estimatedDelivery}</strong></span>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="btn btn-secondary btn-lg">
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/menu" className="btn btn-primary btn-lg">
            Order Again <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
