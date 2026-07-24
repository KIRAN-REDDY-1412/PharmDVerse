import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, Download, Eye, Printer, FileText, ChevronDown
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import './PreceptorList.css'; // Reusing for list tables

const MOCK_PRECEPTORS = [
  { id: 'PRE001', name: 'Dr. Ramesh Patel', dept: 'Pharmacy Practice', designation: 'Associate Professor', mobile: '9876543210', status: 'Active' },
  { id: 'PRE002', name: 'Dr. Sunita Sharma', dept: 'Pharmacology', designation: 'Professor', mobile: '9876543211', status: 'Active' },
  { id: 'PRE003', name: 'Dr. Arjun Verma', dept: 'Pharmaceutics', designation: 'Assistant Professor', mobile: '9876543212', status: 'Active' },
  { id: 'PRE004', name: 'Dr. Neha Singh', dept: 'Pharmacognosy', designation: 'Associate Professor', mobile: '9876543213', status: 'Inactive' },
];

const PreceptorReports = () => {
  const [data] = useState(MOCK_PRECEPTORS);
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
      { label: 'ID', value: row.id },
      { label: 'Name', value: row.name },
      { label: 'Department', value: row.dept },
      { label: 'Designation', value: row.designation },
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
            <h1 className="page-title">Preceptor Reports</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/college-admin/reports" className="breadcrumb-link">Reports</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Preceptor Reports</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left" style={{ flexWrap: 'wrap' }}>
            
            <div className="filter-group">
              <span className="filter-label">Department</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Pharmacy Practice</option>
                  <option>Pharmacology</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Designation</span>
              <div className="select-wrapper">
                <select>
                  <option>All</option>
                  <option>Professor</option>
                  <option>Associate Professor</option>
                  <option>Assistant Professor</option>
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
                <th>Employee ID <span className="sort-icon">↕</span></th>
                <th>Preceptor Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Mobile Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td><span className="id-link">{row.id}</span></td>
                  <td>{row.name}</td>
                  <td>{row.dept}</td>
                  <td>{row.designation}</td>
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
          title="Preceptor Report Details"
          data={selectedRecord}
        />
      )}
    </CollegeAdminLayout>
  );
};

export default PreceptorReports;
