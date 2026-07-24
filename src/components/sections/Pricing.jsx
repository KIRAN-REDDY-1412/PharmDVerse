import React from 'react';
import { Check } from 'lucide-react';
import './Pricing.css';

const pricingPlans = [
  {
    name: 'Standard',
    price: '$5,000',
    period: '/year',
    description: 'Perfect for small pharmacy colleges.',
    features: [
      'Up to 500 Students',
      'Basic Clinical Case Management',
      'Standard AI Analysis',
      'Email Support',
    ],
    recommended: false,
    buttonText: 'Get Started'
  },
  {
    name: 'Professional',
    price: '$12,000',
    period: '/year',
    description: 'Ideal for medium to large institutions.',
    features: [
      'Up to 2,000 Students',
      'Advanced Clinical Workflow',
      'Unlimited AI SOAP Generation',
      'Preceptor Approval Chains',
      'Priority Support',
    ],
    recommended: true,
    buttonText: 'Most Popular'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For university systems and multi-campus setups.',
    features: [
      'Unlimited Students',
      'Custom Integrations (LMS, EHR)',
      'Dedicated Account Manager',
      'White-label Options',
      '24/7 Phone Support',
    ],
    recommended: false,
    buttonText: 'Contact Sales'
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="pricing-section section-padding">
      <div className="container">
        <div className="text-center animate-slide-up">
          <h2 className="section-title">Simple, transparent pricing</h2>
          <p className="section-subtitle">
            Choose the plan that fits your college's needs. All plans are billed annually.
          </p>
        </div>

        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card card animate-slide-up-delay-${(index % 3) + 1} ${plan.recommended ? 'recommended' : ''}`}
            >
              {plan.recommended && <div className="recommended-badge">Recommended</div>}
              
              <div className="pricing-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price-wrapper">
                  <span className="plan-price">{plan.price}</span>
                  <span className="plan-period">{plan.period}</span>
                </div>
              </div>

              <div className="pricing-features">
                <ul>
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <Check size={18} className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`btn w-full ${plan.recommended ? 'btn-accent' : 'btn-secondary'}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
