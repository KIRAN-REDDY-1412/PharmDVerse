import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, Download, Eye, Printer, FileText, ChevronDown
} from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import '../college/PreceptorList.css'; // Reusing for list tables

const MOCK_CASES = [
  { id: 'CC001', studentName: 'Arun Kumar', preceptor: 'Dr. Ramesh Patel', date: '2026-05-10', status: 'Approved' },
  { id: 'CC002', studentName: 'Priya Sharma', preceptor: 'Dr. Sunita Sharma', date: '2026-05-12', status: 'Pending' },
  { id: 'CC003', studentName: 'Rahul Verma', preceptor: 'Dr. Arjun Verma', date: '2026-05-14', status: 'Returned' },
  { id: 'CC004', studentName: 'Sneha Patel', preceptor: 'Dr. Neha Singh', date: '2026-05-15', status: 'Approved' },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'Approved': return 'status-active';
    case 'Pending': return 'status-pending';
    case 'Returned': return 'status-returned';
    default: return '';
  }
};

const PreceptorCaseReports = () => {
  const [data] = useState(MOCK_CASES);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleExport = (type) => {
    window.print();
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

  return (
    <PreceptorLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Clinical Case Reports</h1>
            <div className="breadcrumbs">
              <Link to="/preceptor/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/preceptor/reports" className="breadcrumb-link">Reports</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Clinical Case Reports</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left" style={{ flexWrap: 'wrap' }}>
            
            <div className="filter-group">
              <span className="filter-label">Academic Year</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>2026-2027</option>
                  <option>2025-2026</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Student</span>
              <div className="select-wrapper">
                <select>
                  <option>All Students</option>
                  <option>Arun Kumar</option>
                  <option>Priya Sharma</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Preceptor</span>
              <div className="select-wrapper">
                <select>
                  <option>All Preceptors</option>
                  <option>Dr. Ramesh Patel</option>
                  <option>Dr. Sunita Sharma</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Status</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Returned</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Date Range</span>
              <div className="select-wrapper">
                <select>
                  <option>All Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <button className="btn-filter">
              <Filter size={16} /> Generate Report
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-container">
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem', borderBottom: '1px solid var(--border-color)', gap: '0.5rem' }}>
             <button className="btn-export" onClick={() => handleExport('Excel')}>
               <Download size={16} /> Excel
             </button>
             <button className="btn-export" onClick={() => handleExport('PDF')}>
               <FileText size={16} /> PDF
             </button>
             <button className="btn-export" onClick={handlePrint}>
               <Printer size={16} /> Print
             </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Case ID <span className="sort-icon">↕</span></th>
                <th>Student Name</th>
                <th>Assigned Preceptor</th>
                <th>Submission Date</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
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
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" title="View" onClick={() => handleView(row)}>
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      {isViewModalOpen && (
        <ViewRecordModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Clinical Case Report Details"
          data={selectedRecord}
        />
      )}
    </PreceptorLayout>
  );
};

export default PreceptorCaseReports;
