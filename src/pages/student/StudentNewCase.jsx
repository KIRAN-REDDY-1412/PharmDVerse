import React from 'react';
import { Link } from 'react-router-dom';
import { User, MessageSquare, Pill, Activity, AlertTriangle, ChevronRight } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import '../college/PreceptorManagement.css'; // Inheriting exact styles

const StudentNewCase = () => {
  return (
    <StudentLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">New Clinical Case</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Choose the clinical documentation form(s) required for this patient.
            </p>
          </div>
          <div className="breadcrumbs" style={{ marginTop: '0.5rem' }}>
            <Link to="/student/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/student/cases" className="breadcrumb-link">Clinical Cases</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>New Case</span>
          </div>
        </div>

        <div className="preceptor-actions-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))' }}>
          
          <Link to="/student/new-case/patient-profile" className="action-card">
            <div className="action-icon-wrapper blue" style={{ position: 'relative' }}>
              <User size={32} />
            </div>
            <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Patient Profile Form
                <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase' }}>Mandatory</span>
              </span>
              <span className="action-subtitle">Create complete patient documentation.</span>
            </div>
            <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
          </Link>

          <Link to="/student/new-case/patient-counselling" className="action-card">
            <div className="action-icon-wrapper green">
              <MessageSquare size={32} />
            </div>
            <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Patient Counselling Form
                <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Optional</span>
              </span>
              <span className="action-subtitle">Document patient counselling.</span>
            </div>
            <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
          </Link>

          <Link to="/student/new-case/drug-information" className="action-card">
            <div className="action-icon-wrapper purple">
              <Pill size={32} />
            </div>
            <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Drug Information Request Form
                <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Optional</span>
              </span>
              <span className="action-subtitle">Document drug information requests.</span>
            </div>
            <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
          </Link>

          <Link to="/student/new-case/pharmacist-intervention" className="action-card">
            <div className="action-icon-wrapper orange">
              <Activity size={32} />
            </div>
            <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Pharmacist Intervention Form
                <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Optional</span>
              </span>
              <span className="action-subtitle">Document pharmacist interventions.</span>
            </div>
            <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
          </Link>

          <Link to="/student/new-case/adr-reporting" className="action-card">
            <div className="action-icon-wrapper red">
              <AlertTriangle size={32} />
            </div>
            <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Adverse Drug Reaction Form
                <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Optional</span>
              </span>
              <span className="action-subtitle">Document adverse drug reactions.</span>
            </div>
            <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
          </Link>

        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentNewCase;
