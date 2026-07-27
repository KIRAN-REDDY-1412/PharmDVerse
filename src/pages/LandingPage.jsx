import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import ActiveCollegesSection from '../components/sections/ActiveCollegesSection';
import Features from '../components/sections/Features';
import HowItWorks from '../components/sections/HowItWorks';
import Statistics from '../components/sections/Statistics';
import Pricing from '../components/sections/Pricing';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToActiveColleges = () => {
    const el = document.getElementById('active-colleges');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar 
        onLoginClick={scrollToActiveColleges} 
        onRegisterClick={() => navigate('/register-college')}
      />
      
      <main>
        <Hero 
          onLoginClick={scrollToActiveColleges} 
          onRegisterClick={() => navigate('/register-college')}
        />
        <ActiveCollegesSection />
        <Features />
        <HowItWorks />
        <Statistics />
        <Pricing />
        <About />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
