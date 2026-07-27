import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StudentLayout from '../../components/student/StudentLayout';
import CaseViewer from '../../components/shared/CaseViewer';
import { useDatabase } from '../../context/DatabaseContext';
import { ArrowLeft } from 'lucide-react';

const StudentCaseViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cases } = useDatabase();
  
  // Note: For real applications, fetch from central db based on current user's ID
  const caseData = cases.find(c => c.id === id) || 
    require('../../data/mockData').MOCK_CASES.find(c => c.id === id);

  if (!caseData) {
    return (
      <StudentLayout>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Case Not Found</h2>
          <button className="btn-secondary" onClick={() => navigate('/student/library')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
            Back to Case Library
          </button>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div className="header-left">
            <h1 className="page-title">View Complete Case: {caseData.id}</h1>
            <div className="breadcrumbs">
              <Link to="/student/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/student/library" className="breadcrumb-link">Case Library</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>View Case</span>
            </div>
          </div>
          <div className="header-right">
            <button className="btn-secondary" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid var(--border-color)' }}>
              <ArrowLeft size={16} /> Back
            </button>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <CaseViewer 
            caseData={caseData} 
            isPreceptor={false} 
          />
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentCaseViewPage;
