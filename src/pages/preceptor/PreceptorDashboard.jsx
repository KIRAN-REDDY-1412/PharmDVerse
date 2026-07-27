import React from 'react';
import { Users, ClipboardList, BadgeCheck, Clock3, RotateCcw, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import '../college/Dashboard.css';

const PreceptorDashboard = () => {
  const { cases, users } = useDatabase();
  const { currentUser } = useAuth();

  // Get students assigned to this preceptor
  const assignedStudents = users.filter(u => u.role === 'student' && u.assignedPreceptor === currentUser?.name);
  const studentIds = assignedStudents.map(s => s.id);

  // Get cases submitted by those students
  const preceptorCases = cases.filter(c => studentIds.includes(c.rollNo) && c.status !== 'Draft');

  const totalAssignedStudents = assignedStudents.length;
  const totalCases = preceptorCases.length;
  // Under Review generally encompasses Pending/Submitted status in this workflow
  const underReviewCases = preceptorCases.filter(c => c.status === 'Pending' || c.status === 'Submitted' || c.status === 'Under Review').length;
  const approvedCases = preceptorCases.filter(c => c.status === 'Approved').length;
  const returnedCases = preceptorCases.filter(c => c.status === 'Returned').length;

  const currentDateStr = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const currentDayStr = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <PreceptorLayout>
      <div style={{ padding: '1rem 0 2rem 0' }}>
        <div className="dashboard-container">
          
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-content">
              <h1 className="welcome-title">Welcome, {currentUser?.name ? (currentUser.name.startsWith('Dr.') ? currentUser.name : `Dr. ${currentUser.name}`) : 'Dr. Preceptor'}!</h1>
              <p className="welcome-subtitle">Here is a quick overview of your assigned workload.</p>
            </div>
            <div className="welcome-info">
              <div className="info-block">
                <Calendar className="info-icon" size={24} />
                <div className="info-text">
                  <span className="info-date">{currentDateStr}</span>
                  <span className="info-day">{currentDayStr}</span>
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
                  <span className="card-title">Total Assigned Students</span>
                  <span className="card-value">{totalAssignedStudents}</span>
                </div>
              </div>
              <Link to="/preceptor/students" className="card-link link-blue">
                Assigned Students <ArrowRight size={14} />
              </Link>
            </div>

            <div className="dashboard-card">
              <div className="primary-card-content">
                <div className="card-icon-wrapper icon-purple">
                  <ClipboardList size={32} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Total Clinical Cases</span>
                  <span className="card-value">{totalCases}</span>
                </div>
              </div>
              <Link to="/preceptor/cases" className="card-link link-purple">
                Clinical Cases <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Secondary Stat Cards */}
          <div className="secondary-cards-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="dashboard-card">
              <div className="secondary-card-content">
                <div className="card-icon-wrapper secondary icon-orange">
                  <Clock3 size={24} />
                </div>
                <div className="card-stats">
                  <span className="card-title">Under Review Cases</span>
                  <span className="card-value">{underReviewCases}</span>
                </div>
              </div>
              <Link to="/preceptor/cases" state={{ filter: 'Under Review' }} className="card-link link-orange">
                View under review cases <ArrowRight size={14} />
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
              <Link to="/preceptor/cases" state={{ filter: 'Returned' }} className="card-link link-red">
                View returned cases <ArrowRight size={14} />
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
              <Link to="/preceptor/cases" state={{ filter: 'Approved' }} className="card-link link-green">
                View approved cases <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </PreceptorLayout>
  );
};

export default PreceptorDashboard;
