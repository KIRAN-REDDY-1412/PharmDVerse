import React from 'react';
import './Statistics.css';

const StatCard = ({ label, value, delay }) => (
  <div className={`stat-card card animate-slide-up-delay-${delay}`}>
    <h3 className="stat-value">{value}</h3>
    <p className="stat-label">{label}</p>
  </div>
);

const Statistics = ({ 
  colleges = "50+", 
  students = "10,000+", 
  preceptors = "2,500+", 
  cases = "100k+", 
  aiAnalyses = "500k+" 
}) => {
  return (
    <section className="statistics-section section-padding">
      <div className="container">
        <div className="stats-grid">
          <StatCard label="Colleges" value={colleges} delay="1" />
          <StatCard label="Students" value={students} delay="2" />
          <StatCard label="Preceptors" value={preceptors} delay="3" />
          <StatCard label="Clinical Cases" value={cases} delay="1" />
          <StatCard label="AI Analyses" value={aiAnalyses} delay="2" />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
