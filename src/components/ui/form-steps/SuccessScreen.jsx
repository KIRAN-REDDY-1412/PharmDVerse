import React from 'react';
import { BadgeCheck } from 'lucide-react';

const SuccessScreen = ({ onClose, onRegisterAnother }) => {
  return (
    <div className="success-screen animate-fade-in">
      <div className="success-icon-wrapper animate-slide-up">
        <BadgeCheck size={48} />
      </div>
      
      <h2 className="success-title animate-slide-up-delay-1">
        Registration Submitted Successfully
      </h2>
      
      <p className="success-description animate-slide-up-delay-2">
        Your college registration request has been submitted successfully. 
        Your application will be reviewed by the PharmDVerse Super Admin. 
        You will receive a notification after your application has been reviewed.
      </p>

      <div className="success-actions animate-slide-up-delay-3">
        <button className="btn btn-primary" onClick={onClose}>
          Return to Home
        </button>
        <button className="btn btn-secondary" onClick={onRegisterAnother}>
          Register Another College
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
