import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, Download, Eye, Printer, FileText, ChevronDown
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import './PreceptorList.css'; // Reusing for list tables

const MOCK_STUDENTS = [
  { rollNo: 'Y26PHD0301', name: 'Arun Kumar', course: 'Pharm.D', year: '3rd Year', mobile: '9876543301', status: 'Active' },
  { rollNo: 'Y26PHD0302', name: 'Priya Sharma', course: 'Pharm.D', year: '4th Year', mobile: '9876543302', status: 'Active' },
  { rollNo: 'Y25PHD0201', name: 'Rahul Verma', course: 'M.Pharm', year: '1st Year', mobile: '9876543303', status: 'Active' },
  { rollNo: 'Y26PHD0303', name: 'Sneha Patel', course: 'Pharm.D', year: '5th Year', mobile: '9876543304', status: 'Inactive' },
  { rollNo: 'Y26PHD0304', name: 'Vikram Singh', course: 'Pharm.D', year: '2nd Year', mobile: '9876543305', status: 'Active' },
];

const StudentReports = () => {
  const [data] = useState(MOCK_STUDENTS);
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
      { label: 'Roll No', value: row.rollNo },
      { label: 'Name', value: row.name },
      { label: 'Course', value: row.course },
      { label: 'Year', value: row.year },
      { label: 'Mobile', value: row.mobile },
      { label: 'Status', value: row.status, type: 'status' }
    ]);
    setIsViewModalOpen(true);
  };

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Student Reports</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/college-admin/reports" className="breadcrumb-link">Reports</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Student Reports</span>
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
              <span className="filter-label">Batch</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Y25</option>
                  <option>Y26</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Course</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Pharm.D</option>
                  <option>M.Pharm</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Year</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Status</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
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
                <th>Roll Number <span className="sort-icon">↕</span></th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Year</th>
                <th>Mobile Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.rollNo}>
                  <td><span className="id-link">{row.rollNo}</span></td>
                  <td>{row.name}</td>
                  <td>{row.course}</td>
                  <td>{row.year}</td>
                  <td>{row.mobile}</td>
                  <td>
                    <span className={`status-pill status-${row.status.toLowerCase()}`}>
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
          title="Student Report Details"
          subtitle="View student report information"
          data={selectedRecord}
        />
      )}
    </CollegeAdminLayout>
  );
};

export default StudentReports;
