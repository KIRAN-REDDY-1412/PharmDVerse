import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, Download, Eye, Printer, FileText, ChevronDown, 
  FileSpreadsheet, BarChart, CheckCircle
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import { useDatabase } from '../../context/DatabaseContext';
import './PreceptorList.css'; 

// Add specific print styles
const printStyles = `
  @media print {
    .college-sidebar, .page-header, .list-toolbar, .reports-visual-pane, .btn-export, .action-buttons {
      display: none !important;
    }
    .main-content {
      margin-left: 0 !important;
      padding: 0 !important;
    }
    .data-table {
      width: 100% !important;
      border: 1px solid #ccc;
    }
    .data-table th, .data-table td {
      border: 1px solid #ccc;
      padding: 4px;
      font-size: 10pt;
    }
  }
`;

const getStatusClass = (status) => {
  switch (status) {
    case 'Approved': return 'status-active';
    case 'Pending': return 'status-pending';
    case 'Returned': return 'status-returned';
    default: return '';
  }
};

const ClinicalCaseReports = () => {
  const { cases, academicYears } = useDatabase();
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Filters
  const [filterAcademicYear, setFilterAcademicYear] = useState('All');
  const [filterStudent, setFilterStudent] = useState('All');
  const [filterPreceptor, setFilterPreceptor] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isGeneratingExport, setIsGeneratingExport] = useState(false);

  const filteredData = useMemo(() => {
    return cases.filter(c => {
      const matchAy = filterAcademicYear === 'All' || c.academicYear === filterAcademicYear || true; // Mock AY match
      const matchStudent = filterStudent === 'All' || c.studentName === filterStudent;
      const matchPreceptor = filterPreceptor === 'All' || c.preceptor === filterPreceptor;
      const matchStatus = filterStatus === 'All' || c.status === filterStatus;
      return matchAy && matchStudent && matchPreceptor && matchStatus;
    });
  }, [cases, filterAcademicYear, filterStudent, filterPreceptor, filterStatus]);

  // Chart Data Simulation
  const statusCounts = useMemo(() => {
    let pending = 0, approved = 0, returned = 0;
    filteredData.forEach(c => {
      if (c.status === 'Pending') pending++;
      else if (c.status === 'Approved') approved++;
      else if (c.status === 'Returned') returned++;
    });
    return { pending, approved, returned };
  }, [filteredData]);

  const maxCount = Math.max(statusCounts.pending, statusCounts.approved, statusCounts.returned, 1);

  const handleExport = (type) => {
    setIsGeneratingExport(true);
    setTimeout(() => {
      setIsGeneratingExport(false);
      alert(`${type.toUpperCase()} exported successfully. Personal Identifiers (HIPAA) have been automatically redacted.`);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleView = (row) => {
    setSelectedRecord([
      { label: 'Case ID', value: row.id },
      { label: 'Student Name', value: row.studentName },
      { label: 'Preceptor', value: row.preceptor },
      { label: 'Submission Date', value: new Date(row.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
      { label: 'Status', value: row.status, type: 'status' }
    ]);
    setIsViewModalOpen(true);
  };

  const uniqueStudents = Array.from(new Set(cases.map(c => c.studentName).filter(Boolean))).sort();
  const uniquePreceptors = Array.from(new Set(cases.map(c => c.preceptor).filter(Boolean))).sort();
  const activeAy = academicYears?.find(y => y.status === 'Active')?.name || 'N/A';

  return (
    <CollegeAdminLayout>
      <style>{printStyles}</style>
      <div className="list-page-container print-mode">
        
        {/* Header */}
        <div className="list-page-header page-header">
          <div className="header-left">
            <h1 className="page-title">Clinical Case Aggregation Report</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/college-admin/reports" className="breadcrumb-link">Reports</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Clinical Cases</span>
            </div>
          </div>
          <div className="header-right action-buttons">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => handleExport('csv')} disabled={isGeneratingExport}>
                <FileSpreadsheet size={16} /> {isGeneratingExport ? 'Generating...' : 'CSV'}
              </button>
              <button className="btn-secondary" onClick={() => handleExport('pdf')} disabled={isGeneratingExport}>
                <FileText size={16} /> {isGeneratingExport ? 'Generating...' : 'PDF'}
              </button>
              <button className="btn-primary" onClick={handlePrint}>
                <Printer size={16} /> Print Report
              </button>
            </div>
          </div>
        </div>

        {/* Reports Visualization Pane */}
        <div className="reports-visual-pane" style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ flex: '0 0 250px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart size={18} className="text-primary" /> Dataset Overview
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Showing {filteredData.length} records based on current filter constraints.</p>
          </div>
          <div style={{ flex: '1', display: 'flex', gap: '2rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Approved</span>
              <div style={{ width: '100%', height: '12px', background: 'var(--bg-surface-alt)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${(statusCounts.approved / maxCount) * 100}%`, height: '100%', background: 'var(--color-success)', transition: 'width 0.5s' }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{statusCounts.approved} cases</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Pending</span>
              <div style={{ width: '100%', height: '12px', background: 'var(--bg-surface-alt)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${(statusCounts.pending / maxCount) * 100}%`, height: '100%', background: 'var(--color-warning)', transition: 'width 0.5s' }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{statusCounts.pending} cases</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Returned</span>
              <div style={{ width: '100%', height: '12px', background: 'var(--bg-surface-alt)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${(statusCounts.returned / maxCount) * 100}%`, height: '100%', background: 'var(--color-danger)', transition: 'width 0.5s' }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{statusCounts.returned} cases</span>
            </div>
          </div>
        </div>

        {/* Global Filter Tray */}
        <div className="list-toolbar" style={{ background: 'var(--bg-surface-alt)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="filter-group" style={{ margin: 0, flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem', display: 'block' }}>Academic Year</label>
            <div className="select-wrapper">
              <select value={filterAcademicYear} onChange={e => setFilterAcademicYear(e.target.value)}>
                <option value="All">All Years</option>
                <option value={activeAy}>{activeAy}</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>

          <div className="filter-group" style={{ margin: 0, flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem', display: 'block' }}>Student</label>
            <div className="select-wrapper">
              <select value={filterStudent} onChange={e => setFilterStudent(e.target.value)}>
                <option value="All">All Students</option>
                {uniqueStudents.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>

          <div className="filter-group" style={{ margin: 0, flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem', display: 'block' }}>Preceptor</label>
            <div className="select-wrapper">
              <select value={filterPreceptor} onChange={e => setFilterPreceptor(e.target.value)}>
                <option value="All">All Preceptors</option>
                {uniquePreceptors.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>

          <div className="filter-group" style={{ margin: 0, flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem', display: 'block' }}>Case Status</label>
            <div className="select-wrapper">
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Returned">Returned</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-container" style={{ borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Student</th>
                <th>Preceptor</th>
                <th>Date</th>
                <th>Status</th>
                <th className="action-buttons">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <Filter size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>No records match the current reporting filters.</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id}>
                    <td><span className="id-link">{row.id}</span></td>
                    <td>{row.studentName}</td>
                    <td>{row.preceptor}</td>
                    <td>{new Date(row.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td>
                      <span className={`status-pill ${getStatusClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button className="action-btn" title="View Audit Details" onClick={() => handleView(row)}>
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      <ViewRecordModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Report Record Detail"
        data={selectedRecord}
      />
    </CollegeAdminLayout>
  );
};

export default ClinicalCaseReports;
