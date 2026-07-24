import React from 'react';
import { 
  FolderOpen, 
  BrainCircuit, 
  FileText, 
  Library, 
  BadgeCheck, 
  Shield, 
  Users, 
  Smartphone 
} from 'lucide-react';
import './Features.css';

const featureList = [
  {
    icon: <FolderOpen size={32} />,
    title: "Clinical Case Management",
    description: "Streamline the collection and organization of Pharm.D clinical cases with an intuitive interface."
  },
  {
    icon: <BrainCircuit size={32} />,
    title: "AI Clinical Assistant",
    description: "Leverage advanced AI to analyze cases, suggest evidence-based interventions, and assist students."
  },
  {
    icon: <FileText size={32} />,
    title: "SOAP PDF Generator",
    description: "Automatically generate professional, standardized SOAP note PDFs ready for preceptor review."
  },
  {
    icon: <Library size={32} />,
    title: "Digital Case Library",
    description: "Build a robust, searchable repository of clinical cases across your college for future reference."
  },
  {
    icon: <BadgeCheck size={32} />,
    title: "Preceptor Workflow",
    description: "Efficiently route cases to preceptors for review, grading, and feedback with custom approval chains."
  },
  {
    icon: <Shield size={32} />,
    title: "Secure Cloud Platform",
    description: "Enterprise-grade security and HIPAA-compliant architecture ensures sensitive data is protected."
  },
  {
    icon: <Users size={32} />,
    title: "Role-Based Access",
    description: "Granular permissions for Students, Preceptors, Admins, and Super Admins tailored to your college."
  },
  {
    icon: <Smartphone size={32} />,
    title: "Responsive Design",
    description: "Access the platform seamlessly from desktop, laptop, tablet, or mobile devices anywhere."
  }
];

const Features = () => {
  return (
    <section id="features" className="features-section section-padding">
      <div className="container">
        <div className="text-center animate-slide-up">
          <h2 className="section-title">Everything you need to excel</h2>
          <p className="section-subtitle">
            PharmDVerse provides a comprehensive suite of tools designed specifically for pharmacy colleges to manage clinical rotations and case studies.
          </p>
        </div>

        <div className="features-grid">
          {featureList.map((feature, index) => (
            <div 
              key={index} 
              className={`card feature-card hover-lift animate-slide-up-delay-${(index % 3) + 1}`}
            >
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
