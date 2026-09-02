import { MapPin, UtensilsCrossed, ShoppingBag, Bike } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './HowItWorks.css';

export default function HowItWorks() {
  const sectionRef = useScrollReveal();

  const steps = [
    {
      id: 1,
      icon: <MapPin size={28} />,
      title: 'Set Location',
      description: 'Enter your address to discover top restaurants and cafes near you.',
    },
    {
      id: 2,
      icon: <UtensilsCrossed size={28} />,
      title: 'Choose Food',
      description: 'Browse menus, customer reviews, and pick your favorite food items.',
    },
    {
      id: 3,
      icon: <ShoppingBag size={28} />,
      title: 'Place Order',
      description: 'Pay safely online or choose cash on delivery with easy options.',
    },
    {
      id: 4,
      icon: <Bike size={28} />,
      title: 'Fast Delivery',
      description: 'Sit back and relax while our courier brings hot food straight to your door.',
    },
  ];

  return (
    <section className="section how-it-works-section" ref={sectionRef}>
      <div className="container reveal">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2 className="section-title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Getting your favorite food delivered is easy as 1-2-3-4
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.id} className="step-card glass-card">
              <div className="step-number">0{step.id}</div>
              <div className="step-icon-wrapper">
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
