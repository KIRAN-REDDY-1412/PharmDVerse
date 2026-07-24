import { Link } from 'react-router-dom';
import { Stethoscope, ArrowUp, Shield } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-logo">
              <Stethoscope className="text-accent" size={32} />
              <span className="brand-name">PharmDVerse</span>
            </div>
            <p className="footer-tagline">
              From Case Collection to Clinical Excellence. The complete cloud-based platform for Pharm.D education.
            </p>
          </div>

          <div className="footer-links-group">
            <h4>Platform</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Support</h4>
            <ul>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">System Status</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">HIPAA Compliance</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} PharmDVerse. All rights reserved.
          </p>
          <div className="footer-bottom-actions">
            <Link to="/super-admin" className="admin-link">
              <Shield size={14} /> Super Admin Login
            </Link>
            <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
