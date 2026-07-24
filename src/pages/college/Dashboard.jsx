import React from 'react';
import { Users, GraduationCap, ClipboardList, BadgeCheck, Clock3, RotateCcw, Calendar, BookOpen, ArrowRight , User, MessageSquare, Pill, Activity, AlertTriangle, } from 'lucide-react';
import { Link } from 'react-router-dom';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import './Dashboard.css';

const CollegeAdminDashboard = () => {
  const { users, cases } = useDatabase();

  const totalPreceptors = users.filter(u => u.role === 'preceptor').length;
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalCases = cases.length;
  const approvedCases = cases.filter(c => c.status === 'Approved').length;
  const pendingCases = cases.filter(c => c.status === 'Pending' || c.status === 'Submitted').length;
  const returnedCases = cases.filter(c => c.status === 'Returned').length;
  return (
    <CollegeAdminLayout>
      <div style={{ padding: '1rem 0 2rem 0' }}>
        <div className="dashboard-container">
          
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-content">
              <h1 className="welcome-title">Welcome back, College Admin!</h1>
              <p className="welcome-subtitle">Here's what's happening in your college today.</p>
            </div>
            <div className="welcome-info">
              <div className="info-block">
                <Calendar className="info-icon" size={24} />
                <div className="info-text">
                  <span className="info-date">20 May 2025</span>
                  <span className="info-day">Tuesday</span>
                </div>
              </div>
              <div className="info-block">
                <BookOpen className="info-icon" size={24} />
                <div className="info-text">
                  <span className="info-date">Academic Year</span>
                  <span className="info-day">2024-2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Stat Cards */}
          <div className="primary-cards-grid">
            <div className="dashboard-card">
              <div className="primary-card-content">
                <div className="card-icon-wrapper icon-blue">
                  <Users size={32} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Total Preceptors</span>
                  <span className="card-value">{totalPreceptors}</span>
                </div>
              </div>
              <Link to="#" className="card-link link-blue">
                View all preceptors <ArrowRight size={14} />
              </Link>
            </div>

            <div className="dashboard-card">
              <div className="primary-card-content">
                <div className="card-icon-wrapper icon-green">
                  <GraduationCap size={32} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Total Students</span>
                  <span className="card-value">{totalStudents}</span>
                </div>
              </div>
              <Link to="#" className="card-link link-green">
                View all students <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Secondary Stat Cards */}
          <div className="secondary-cards-grid">
            <div className="dashboard-card">
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-purple">
                  <ClipboardList size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Total Clinical Cases</span>
                  <span className="card-value">{totalCases}</span>
                </div>
              </div>
              <Link to="#" className="card-link link-purple">
                View all cases <ArrowRight size={14} />
              </Link>
            </div>

            <div className="dashboard-card">
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-green">
                  <BadgeCheck size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Approved Cases</span>
                  <span className="card-value">{approvedCases}</span>
                </div>
              </div>
              <Link to="#" className="card-link link-green">
                View all approved cases <ArrowRight size={14} />
              </Link>
            </div>

            <div className="dashboard-card">
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-orange">
                  <Clock3 size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Pending Cases</span>
                  <span className="card-value">{pendingCases}</span>
                </div>
              </div>
              <Link to="#" className="card-link link-orange">
                View pending cases <ArrowRight size={14} />
              </Link>
            </div>

            <div className="dashboard-card">
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-red">
                  <RotateCcw size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Returned Cases</span>
                  <span className="card-value">{returnedCases}</span>
                </div>
              </div>
              <Link to="#" className="card-link link-red">
                View returned cases <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        {/* Clinical Documentation Statistics */}
        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', fontWeight: 600 }}>Clinical Documentation Statistics</h2>
          <div className="secondary-cards-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            <div className="dashboard-card">
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-blue">
                  <User size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title" style={{ fontSize: '0.8rem' }}>Patient Profile Forms</span>
                  <span className="card-value">1,245</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-green">
                  <MessageSquare size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title" style={{ fontSize: '0.8rem' }}>Patient Counselling</span>
                  <span className="card-value">892</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-purple">
                  <Pill size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title" style={{ fontSize: '0.8rem' }}>Drug Info Requests</span>
                  <span className="card-value">430</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-orange">
                  <Activity size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title" style={{ fontSize: '0.8rem' }}>Pharmacist Intervention</span>
                  <span className="card-value">275</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-red">
                  <AlertTriangle size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title" style={{ fontSize: '0.8rem' }}>Adverse Drug Reactions</span>
                  <span className="card-value">85</span>
                </div>
              </div>
            </div>
          </div>
        </div>


          {/* Charts Grid */}
          <div className="charts-grid">
            {/* Pie Chart Placeholder */}
            <div className="chart-card">
              <h3 className="chart-title">Clinical Cases by Status</h3>
              <div className="pie-chart-container">
                <div className="pie-chart"></div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color green"></div>
                    <span>Approved</span>
                    <span className="legend-value">312 (54.9%)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color orange"></div>
                    <span>Pending</span>
                    <span className="legend-value">158 (27.8%)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color red"></div>
                    <span>Returned</span>
                    <span className="legend-value">98 (17.3%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bar Chart Placeholder */}
            <div className="chart-card">
              <h3 className="chart-title">Monthly Case Submissions</h3>
              <div className="bar-chart-container">
                <div className="y-axis">
                  <span>125</span>
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>
                
                <div className="bar-column">
                  <div className="bar" style={{ height: '40%' }}></div>
                  <span className="x-label">Dec '24</span>
                </div>
                <div className="bar-column">
                  <div className="bar" style={{ height: '52%' }}></div>
                  <span className="x-label">Jan '25</span>
                </div>
                <div className="bar-column">
                  <div className="bar" style={{ height: '60%' }}></div>
                  <span className="x-label">Feb '25</span>
                </div>
                <div className="bar-column">
                  <div className="bar" style={{ height: '72%' }}></div>
                  <span className="x-label">Mar '25</span>
                </div>
                <div className="bar-column">
                  <div className="bar" style={{ height: '84%' }}></div>
                  <span className="x-label">Apr '25</span>
                </div>
                <div className="bar-column">
                  <div className="bar" style={{ height: '95%' }}></div>
                  <span className="x-label">May '25</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </CollegeAdminLayout>
  );
};

export default CollegeAdminDashboard;
