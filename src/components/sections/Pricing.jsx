import React from 'react';
import { Check, Users, Database, BrainCircuit, HeadphonesIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Pricing.css';

const pricingPlans = [
  {
    name: 'Standard',
    price: '$5,000',
    period: '/year',
    description: 'Perfect for small pharmacy colleges.',
    limits: {
      students: 'Up to 500 Students',
      storage: '50GB Secure Storage',
      ai: 'Standard AI Analysis',
      support: 'Email Support'
    },
    features: [
      'Basic Clinical Case Management',
      'Preceptor Dashboards',
      'Standard Reporting'
    ],
    recommended: false
  },
  {
    name: 'Professional',
    price: '$12,000',
    period: '/year',
    description: 'Ideal for medium to large institutions.',
    limits: {
      students: 'Up to 2,000 Students',
      storage: '250GB Secure Storage',
      ai: 'Unlimited AI SOAP Generation',
      support: 'Priority Support'
    },
    features: [
      'Advanced Clinical Workflow',
      'Preceptor Approval Chains',
      'Custom Analytics & Export'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '/year',
    description: 'For university systems and multi-campus setups.',
    limits: {
      students: 'Unlimited Students',
      storage: 'Unlimited Storage',
      ai: 'Custom AI Model Training',
      support: '24/7 Phone Support'
    },
    features: [
      'Custom Integrations (LMS, EHR)',
      'Dedicated Account Manager',
      'White-label Options'
    ],
    recommended: false
  }
];

const Pricing = () => {
  const navigate = useNavigate();

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

              <div className="pricing-limits" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Users size={16} className="text-primary" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{plan.limits.students}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Database size={16} className="text-primary" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{plan.limits.storage}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <BrainCircuit size={16} className="text-primary" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{plan.limits.ai}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <HeadphonesIcon size={16} className="text-primary" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{plan.limits.support}</span>
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

              <button 
                className={`btn w-full ${plan.recommended ? 'btn-accent' : 'btn-secondary'}`}
                onClick={() => navigate('/register-college')}
              >
                Register College
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
