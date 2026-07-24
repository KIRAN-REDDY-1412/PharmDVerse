import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
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

  return (
    <div className="app-wrapper">
      <Navbar 
        onLoginClick={() => navigate('/college-portal')} 
        onRegisterClick={() => navigate('/register-college')}
      />
      
      <main>
        <Hero 
          onLoginClick={() => navigate('/college-portal')} 
          onRegisterClick={() => navigate('/register-college')}
        />
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
