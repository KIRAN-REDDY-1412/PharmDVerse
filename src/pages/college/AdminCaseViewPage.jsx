import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import CaseViewer from '../../components/shared/CaseViewer';
import { useDatabase } from '../../context/DatabaseContext';
import { ArrowLeft } from 'lucide-react';

const AdminCaseViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cases } = useDatabase();
  
  const caseData = cases.find(c => c.id === id);

  if (!caseData) {
    return (
      <CollegeAdminLayout>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Case Not Found</h2>
          <button className="btn-secondary" onClick={() => navigate('/college-admin/cases')} style={{ marginTop: '1rem' }}>
            Back to Case List
          </button>
        </div>
      </CollegeAdminLayout>
    );
  }

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div className="header-left">
            <h1 className="page-title">View Case: {caseData.id}</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/college-admin/cases" className="breadcrumb-link">Clinical Case Management</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>View Case</span>
            </div>
          </div>
          <div className="header-right">
            <button className="btn-secondary" onClick={() => navigate('/college-admin/cases')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> Back to List
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
    </CollegeAdminLayout>
  );
};

export default AdminCaseViewPage;
