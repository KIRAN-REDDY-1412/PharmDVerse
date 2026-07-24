import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Menu, X, Stethoscope } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <Stethoscope className="brand-icon" size={28} />
          <div className="brand-text">
            <span className="brand-name">PharmDVerse</span>
            <span className="brand-tagline">Clinical Excellence</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-only">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="navbar-actions desktop-only">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="btn btn-secondary" onClick={onLoginClick}>College Login</button>
          <button className="btn btn-primary" onClick={onRegisterClick}>Register College</button>
        </div>

        {/* Mobile Hamburger */}
        <div className="mobile-only flex items-center gap-4">
          <button className="theme-toggle" onClick={toggleTheme}>
             {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            className="hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu animate-slide-up">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-actions">
            <button className="btn btn-secondary w-full" onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}>
              College Login
            </button>
            <button className="btn btn-primary w-full" onClick={() => { onRegisterClick(); setMobileMenuOpen(false); }}>
              Register College
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
