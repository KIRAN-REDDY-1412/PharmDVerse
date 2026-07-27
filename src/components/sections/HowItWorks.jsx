import React from 'react';
import { 
  Building2, ShieldCheck, Settings, Users, Stethoscope, 
  UserCheck, FileText, BrainCircuit, SearchCheck, CheckCircle2, 
  Library, BarChart3 
} from 'lucide-react';
import './HowItWorks.css';

const steps = [
  { id: 1, title: 'Register College', description: 'Institutional onboarding.', icon: <Building2 size={24} /> },
  { id: 2, title: 'College Verification', description: 'Super Admin compliance review.', icon: <ShieldCheck size={24} /> },
  { id: 3, title: 'College Admin Setup', description: 'Platform configuration and rules.', icon: <Settings size={24} /> },
  { id: 4, title: 'Student Registration', description: 'Bulk or individual onboarding.', icon: <Users size={24} /> },
  { id: 5, title: 'Preceptor Registration', description: 'Clinical staff onboarding.', icon: <Stethoscope size={24} /> },
  { id: 6, title: 'Assignment', description: 'Mapping students to preceptors.', icon: <UserCheck size={24} /> },
  { id: 7, title: 'Clinical Case Entry', description: 'Students document patient encounters.', icon: <FileText size={24} /> },
  { id: 8, title: 'AI Clinical Analysis', description: 'Automated SOAP evaluation.', icon: <BrainCircuit size={24} /> },
  { id: 9, title: 'Preceptor Review', description: 'Clinical evaluation and feedback.', icon: <SearchCheck size={24} /> },
  { id: 10, title: 'Approval', description: 'Final sign-off on case documentation.', icon: <CheckCircle2 size={24} /> },
  { id: 11, title: 'Digital Case Library', description: 'Immutable archival for accreditation.', icon: <Library size={24} /> },
  { id: 12, title: 'Reports & Analytics', description: 'Institutional performance metrics.', icon: <BarChart3 size={24} /> }
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

        <div className="workflow-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem', 
          marginTop: '3rem' 
        }}>
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`timeline-content card hover-lift animate-slide-up-delay-${(index % 3) + 1}`}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', right: '-10px', top: '-10px', fontSize: '5rem', fontWeight: 900, opacity: 0.03, color: 'var(--color-primary)', pointerEvents: 'none' }}>
                {step.id}
              </div>
              <div style={{ background: 'var(--bg-main)', color: 'var(--color-primary)', padding: '0.75rem', borderRadius: '12px' }}>
                {step.icon}
              </div>
              <div>
                <h3 className="step-title" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{step.id}. {step.title}</h3>
                <p className="step-description" style={{ fontSize: '0.9rem', margin: 0 }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
