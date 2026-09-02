import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Promos.css';

export default function Promos() {
  const sectionRef = useScrollReveal();

  const promos = [
    {
      id: 1,
      title: '50% OFF',
      subtitle: 'On Your First Order',
      description: 'Use code WELCOME50 at checkout',
      code: 'WELCOME50',
      gradient: 'linear-gradient(135deg, #FF6B35, #FF3F6C)',
      emoji: '🎉',
    },
    {
      id: 2,
      title: 'Free Delivery',
      subtitle: 'All Weekend Long',
      description: 'No minimum order required this weekend',
      code: 'FREEDEL',
      gradient: 'linear-gradient(135deg, #42A5F5, #7C4DFF)',
      emoji: '🚚',
    },
    {
      id: 3,
      title: 'Buy 2 Get 1',
      subtitle: 'On All Pizzas',
      description: 'Order any 2 pizzas and get 1 free',
      code: 'PIZZA3',
      gradient: 'linear-gradient(135deg, #66BB6A, #26A69A)',
      emoji: '🍕',
    },
  ];

  return (
    <section className="section" ref={sectionRef}>
      <div className="container reveal">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2 className="section-title">
            Hot <span className="gradient-text">Deals</span> & Offers
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Don&apos;t miss out on these amazing deals — limited time only!
          </p>
        </div>

        <div className="promos-grid">
          {promos.map((promo) => (
            <div key={promo.id} className="promo-card" style={{ background: promo.gradient }}>
              <div className="promo-emoji">{promo.emoji}</div>
              <div className="promo-content">
                <h3 className="promo-title">{promo.title}</h3>
                <p className="promo-subtitle">{promo.subtitle}</p>
                <p className="promo-description">{promo.description}</p>
                <div className="promo-code">
                  <span>Code:</span>
                  <strong>{promo.code}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
