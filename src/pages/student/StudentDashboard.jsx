import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, FileText, Send, BadgeCheck, RotateCcw , User, MessageSquare, Pill, Activity, AlertTriangle, } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import '../college/Dashboard.css'; // Reuse CSS

const StudentDashboard = () => {
  const { getStudentCases } = useDatabase();
  const { currentUser } = useAuth();

  const rawCases = currentUser ? getStudentCases(currentUser.id) : [];
  
  // Normalize status for counting
  const cases = rawCases.map(c => ({
    ...c,
    status: c.status === 'Pending' ? 'Under Review' : c.status
  }));
  
  const totalCases = cases.length;
  const draftCases = cases.filter(c => c.status === 'Draft').length;
  const submittedCases = cases.filter(c => c.status === 'Submitted').length;
  const underReviewCases = cases.filter(c => c.status === 'Under Review').length;
  const returnedCases = cases.filter(c => c.status === 'Returned').length;
  const approvedCases = cases.filter(c => c.status === 'Approved').length;
  
  // Form Statistics
  let patientProfileCount = 0;
  let patientCounsellingCount = 0;
  let drugInfoCount = 0;
  let pharmacistInterventionCount = 0;
  let adrCount = 0;

  cases.forEach(c => {
    if (c.forms) {
      if (c.forms.patientProfile?.status && c.forms.patientProfile.status !== 'Draft') patientProfileCount++;
      if (c.forms.patientCounselling?.status && c.forms.patientCounselling.status !== 'Draft') patientCounsellingCount++;
      if (c.forms.drugInformation?.status && c.forms.drugInformation.status !== 'Draft') drugInfoCount++;
      if (c.forms.pharmacistIntervention?.status && c.forms.pharmacistIntervention.status !== 'Draft') pharmacistInterventionCount++;
      if (c.forms.adrReporting?.status && c.forms.adrReporting.status !== 'Draft') adrCount++;
    } else {
      // Fallback logic for mock data without explicit forms object
      if (c.status !== 'Draft') {
        patientProfileCount++; // Patient profile is mandatory
        if (c.id.includes('1') || c.id.includes('3')) patientCounsellingCount++;
        if (c.id.includes('2')) drugInfoCount++;
        if (c.id.includes('4')) pharmacistInterventionCount++;
        if (c.id.includes('5')) adrCount++;
      }
    }
  });

  return (
    <StudentLayout>
      <div className="dashboard-container animate-fade-in" style={{ padding: '1.5rem' }}>
        {/* Welcome Banner */}
        <div className="welcome-banner" style={{ marginBottom: '1.5rem' }}>
          <div className="welcome-content">
            <h1 className="welcome-title">Student Dashboard</h1>
            <p className="welcome-subtitle">Welcome to the PharmDVerse Student Portal.</p>
          </div>
        </div>
        
        <div className="dashboard-content" style={{ marginBottom: '1.5rem' }}>
          <div className="dashboard-card" style={{ width: '100%', borderLeft: '4px solid var(--color-primary)', padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>My Information</h2>
              <Link to="/student/profile" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', textDecoration: 'none', borderRadius: '6px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-surface)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-main)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                View Full Profile
              </Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', rowGap: '1rem' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Student Name</strong>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{currentUser?.name || 'Alex Johnson'}</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Roll Number</strong>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{currentUser?.id || 'PHD-2023-042'}</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Course</strong>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Pharm.D</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Batch</strong>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{currentUser?.batch || '2020-2026'}</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Year</strong>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>4th Year</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Academic Year</strong>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>2023-2024</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.15rem' }}>Assigned Preceptor</strong>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>Dr. Sarah Williams</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="secondary-cards-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
          <div className="dashboard-card">
            <div className="secondary-card-content">
              <div className="card-icon-wrapper secondary icon-purple"><ClipboardList size={24} /></div>
              <div className="card-stats">
                <span className="card-title">Total Cases</span>
                <span className="card-value">{totalCases}</span>
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="secondary-card-content">
              <div className="card-icon-wrapper secondary icon-blue"><FileText size={24} /></div>
              <div className="card-stats">
                <span className="card-title">Draft Cases</span>
                <span className="card-value">{draftCases}</span>
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="secondary-card-content">
              <div className="card-icon-wrapper secondary icon-indigo"><Send size={24} /></div>
              <div className="card-stats">
                <span className="card-title">Submitted Cases</span>
                <span className="card-value">{submittedCases}</span>
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="secondary-card-content">
              <div className="card-icon-wrapper secondary icon-orange"><Activity size={24} /></div>
              <div className="card-stats">
                <span className="card-title">Under Review Cases</span>
                <span className="card-value">{underReviewCases}</span>
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="secondary-card-content">
              <div className="card-icon-wrapper secondary icon-red"><RotateCcw size={24} /></div>
              <div className="card-stats">
                <span className="card-title">Returned Cases</span>
                <span className="card-value">{returnedCases}</span>
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="secondary-card-content">
              <div className="card-icon-wrapper secondary icon-green"><BadgeCheck size={24} /></div>
              <div className="card-stats">
                <span className="card-title">Approved Cases</span>
                <span className="card-value">{approvedCases}</span>
              </div>
            </div>
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
                  <span className="card-value">{patientProfileCount}</span>
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
                  <span className="card-value">{patientCounsellingCount}</span>
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
                  <span className="card-value">{drugInfoCount}</span>
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
                  <span className="card-value">{pharmacistInterventionCount}</span>
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
                  <span className="card-value">{adrCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
