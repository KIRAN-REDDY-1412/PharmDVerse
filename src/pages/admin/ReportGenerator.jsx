import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ArrowLeft, Download, FileText, Filter, Calendar,
  Building2, Users, Zap, CheckCircle
} from 'lucide-react';

const ReportGenerator = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('clinical');
  const [format, setFormat] = useState('pdf');

  const handleGenerate = () => {
    alert(`Generating ${reportType} report in ${format.toUpperCase()} format. This may take a few moments.`);
  };

  return (
    <AdminLayout>
      <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', color: 'var(--text-color)', paddingBottom: '100px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="icon-btn-small" onClick={() => navigate('/super-admin/analytics')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Report Generator</h1>
              <p className="page-subtitle" style={{ margin: 0 }}>Extract detailed platform analytics across all dimensions.</p>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '32px' }}>
          
          <h2 style={{ fontSize: '1.25rem', margin: '0 0 24px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            Report Configuration
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Report Type</label>
              <select className="form-select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="college">College Growth & Engagement Report</option>
                <option value="user">User Role & Activity Report (Students & Preceptors)</option>
                <option value="clinical">Clinical Cases & Approval Trends Report</option>
                <option value="subscription">Subscriptions & Revenue Report</option>
                <option value="audit">Platform Audit & Security Report</option>
                <option value="ai">AI Feature Usage & Token Report</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Target College / Tenant</label>
              <select className="form-select">
                <option value="all">-- Entire Platform (All Colleges) --</option>
                <option value="c1">University of Texas Pharmacy</option>
                <option value="c2">Boston Healthcare College</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Date Range Start</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="date" className="form-input" style={{ width: '100%', paddingLeft: '36px', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Date Range End</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="date" className="form-input" style={{ width: '100%', paddingLeft: '36px', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', margin: '0 0 16px 0' }}>Export Format</h3>
          <div style={{ display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="format" value="pdf" checked={format === 'pdf'} onChange={() => setFormat('pdf')} />
              <span>PDF Document</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="format" value="excel" checked={format === 'excel'} onChange={() => setFormat('excel')} />
              <span>Excel Workbook (.xlsx)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="format" value="csv" checked={format === 'csv'} onChange={() => setFormat('csv')} />
              <span>CSV Data Dump</span>
            </label>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
            <button className="btn btn-secondary">Preview Data Summary</button>
            <button className="btn btn-primary" onClick={handleGenerate}><Download size={16} /> Generate & Download</button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default ReportGenerator;
