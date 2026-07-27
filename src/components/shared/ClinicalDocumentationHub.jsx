import React from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { User, MessageSquare, Pill, Activity, AlertTriangle, ChevronRight, ArrowLeft } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

const ClinicalDocumentationHub = ({ role = 'student' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cases } = useDatabase();
  
  const caseData = cases.find(c => c.id === id);

  const getStatusBadge = (status) => {
    if (!status) return null;
    let color = 'var(--text-secondary)';
    let bg = 'var(--bg-main)';
    if (status === 'Submitted') { color = '#b45309'; bg = '#fef3c7'; }
    if (status === 'Approved') { color = '#15803d'; bg = '#dcfce7'; }
    if (status === 'Returned') { color = '#b91c1c'; bg = '#fee2e2'; }
    if (status === 'Draft') { color = '#4338ca'; bg = '#e0e7ff'; }
    
    return (
      <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '12px', backgroundColor: bg, color: color, fontWeight: 600 }}>
        {status}
      </span>
    );
  };

  const basePath = `/${role}/cases/view/${id}`;

  return (
    <div className="preceptor-page" style={{ padding: role === 'student' ? '0' : undefined }}>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <button className="btn-secondary" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="page-title">Clinical Documentation</h1>
          {caseData && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Case ID: <strong>{caseData.id}</strong> | Status: <strong>{caseData.status || 'Draft'}</strong>
            </p>
          )}
        </div>
      </div>

      <div className="preceptor-actions-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))' }}>
        
        <Link to={`${basePath}/patient-profile`} className="action-card">
          <div className="action-icon-wrapper blue" style={{ position: 'relative' }}>
            <User size={32} />
          </div>
          <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              Patient Profile Form
              <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-red)', fontWeight: 700, textTransform: 'uppercase' }}>Mandatory</span>
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
              <span className="action-subtitle">Complete patient documentation.</span>
              {caseData?.forms?.patientProfile && getStatusBadge(caseData.forms.patientProfile.status)}
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
        </Link>

        <Link to={`${basePath}/patient-counselling`} className="action-card">
          <div className="action-icon-wrapper green">
            <MessageSquare size={32} />
          </div>
          <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              Patient Counselling Form
              <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Optional</span>
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
              <span className="action-subtitle">Document patient counselling.</span>
              {caseData?.forms?.patientCounselling && getStatusBadge(caseData.forms.patientCounselling.status)}
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
        </Link>

        <Link to={`${basePath}/drug-information`} className="action-card">
          <div className="action-icon-wrapper purple">
            <Pill size={32} />
          </div>
          <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              Drug Information Request Form
              <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Optional</span>
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
              <span className="action-subtitle">Document drug information requests.</span>
              {caseData?.forms?.drugInformation && getStatusBadge(caseData.forms.drugInformation.status)}
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
        </Link>

        <Link to={`${basePath}/pharmacist-intervention`} className="action-card">
          <div className="action-icon-wrapper orange">
            <Activity size={32} />
          </div>
          <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              Pharmacist Intervention Form
              <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Optional</span>
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
              <span className="action-subtitle">Document pharmacist interventions.</span>
              {caseData?.forms?.pharmacistIntervention && getStatusBadge(caseData.forms.pharmacistIntervention.status)}
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
        </Link>

        <Link to={`${basePath}/adr-reporting`} className="action-card">
          <div className="action-icon-wrapper red">
            <AlertTriangle size={32} />
          </div>
          <div className="action-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="action-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              Adverse Drug Reaction Form
              <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Optional</span>
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
              <span className="action-subtitle">Document adverse drug reactions.</span>
              {caseData?.forms?.adr && getStatusBadge(caseData.forms.adr.status)}
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
        </Link>

      </div>
    </div>
  );
};

export default ClinicalDocumentationHub;
