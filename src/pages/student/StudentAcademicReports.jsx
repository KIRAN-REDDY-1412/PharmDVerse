import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, Download, Eye, Printer, FileText, ChevronDown, Search
} from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import '../college/PreceptorList.css'; // Reusing for list tables

const MOCK_REPORTS = [
  { id: 'AR-1001', type: 'Clinical Posting Report', hospital: 'City General Hospital', department: 'General Medicine', date: '2026-05-10' },
  { id: 'AR-1002', type: 'Attendance Report', hospital: 'City General Hospital', department: 'Cardiology', date: '2026-06-15' },
  { id: 'AR-1003', type: 'Preceptor Evaluation Report', hospital: 'Apollo Hospital', department: 'Neurology', date: '2026-07-20' },
  { id: 'AR-1004', type: 'Case Completion Summary', hospital: 'Apollo Hospital', department: 'General Medicine', date: '2026-08-05' },
];

const StudentAcademicReports = () => {
  const [data] = useState(MOCK_REPORTS);
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
      { label: 'Report ID', value: row.id },
      { label: 'Report Type', value: row.type },
      { label: 'Hospital', value: row.hospital },
      { label: 'Department', value: row.department },
      { label: 'Generated Date', value: new Date(row.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
    ]);
    setIsViewModalOpen(true);
  };

  return (
    <StudentLayout>
      <div className="list-page-container animate-fade-in">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">My Academic Reports</h1>
            <div className="breadcrumbs">
              <Link to="/student/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/student/reports" className="breadcrumb-link">Reports</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Academic Reports</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left" style={{ flexWrap: 'wrap' }}>
            
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search reports..." />
            </div>

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
              <span className="filter-label">Hospital</span>
              <div className="select-wrapper">
                <select>
                  <option>All Hospitals</option>
                  <option>City General Hospital</option>
                  <option>Apollo Hospital</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Department</span>
              <div className="select-wrapper">
                <select>
                  <option>All Departments</option>
                  <option>General Medicine</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
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
                <th>Report ID</th>
                <th>Report Type</th>
                <th>Hospital</th>
                <th>Department</th>
                <th>Generated Date</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td className="fw-500">{row.id}</td>
                  <td>{row.type}</td>
                  <td>{row.hospital}</td>
                  <td>{row.department}</td>
                  <td>{new Date(row.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'center' }}>
                      <button className="btn-icon" title="View Report" onClick={() => handleView(row)}>
                        <Eye size={18} />
                      </button>
                      <button className="btn-icon" title="Download PDF" onClick={handlePrint}>
                        <FileText size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        <ViewRecordModal 
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Academic Report Details"
          data={selectedRecord}
        />
        
      </div>
    </StudentLayout>
  );
};

export default StudentAcademicReports;
