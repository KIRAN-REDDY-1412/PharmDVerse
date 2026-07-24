import React from 'react';
import './HowItWorks.css';

const steps = [
  { id: 1, title: 'Register College', description: 'Onboard your institution securely.' },
  { id: 2, title: 'Super Admin Approval', description: 'Application review and verification.' },
  { id: 3, title: 'College Activated', description: 'Platform access is granted.' },
  { id: 4, title: 'College Login', description: 'Admins set up their portal.' },
  { id: 5, title: 'Clinical Case Management', description: 'Students and preceptors manage cases.' }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="how-it-works-section section-padding">
      <div className="container">
        <div className="text-center animate-slide-up">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            A seamless, professional workflow from college registration to building a rich digital library of clinical cases.
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`timeline-item animate-slide-up-delay-${(index % 3) + 1}`}
            >
              <div className="timeline-marker">{step.id}</div>
              <div className="timeline-content card hover-lift">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
