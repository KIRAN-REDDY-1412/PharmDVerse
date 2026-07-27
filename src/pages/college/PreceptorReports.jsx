import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, Download, Eye, Printer, FileText, ChevronDown
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import { useDatabase } from '../../context/DatabaseContext';
import './PreceptorList.css'; // Reusing for list tables

const PreceptorReports = () => {
  const { users } = useDatabase();
  const allPreceptors = users.filter(u => u.role === 'preceptor');

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Filters
  const [filterDept, setFilterDept] = useState('All');
  const [filterDesignation, setFilterDesignation] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter Data
  const filteredData = allPreceptors.filter(preceptor => {
    const pDept = preceptor.department || preceptor.dept;
    const matchDept = filterDept === 'All' || pDept === filterDept;
    const matchDesig = filterDesignation === 'All' || preceptor.designation === filterDesignation;
    const matchStatus = filterStatus === 'All' || preceptor.status === filterStatus;
    return matchDept && matchDesig && matchStatus;
  });

  const handleExport = (type) => {
    window.print();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleView = (row) => {
    setSelectedRecord([
      { label: 'Employee ID', value: row.id },
      { label: 'Name', value: row.name || row.fullName },
      { label: 'Department', value: row.department || row.dept },
      { label: 'Designation', value: row.designation },
      { label: 'Mobile', value: row.phone || row.mobileNumber },
      { label: 'Status', value: row.status, type: 'status' }
    ]);
    setIsViewModalOpen(true);
  };

  const uniqueDepartments = Array.from(new Set(allPreceptors.map(p => p.department || p.dept).filter(Boolean))).sort();
  const uniqueDesignations = Array.from(new Set(allPreceptors.map(p => p.designation).filter(Boolean))).sort();

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
                <select value={filterDept} onChange={e => setFilterDept(e.target.value)}>
                  <option value="All">All</option>
                  {uniqueDepartments.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Designation</span>
              <div className="select-wrapper">
                <select value={filterDesignation} onChange={e => setFilterDesignation(e.target.value)}>
                  <option value="All">All</option>
                  {uniqueDesignations.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Status</span>
              <div className="select-wrapper">
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <button className="btn-filter" style={{ cursor: 'default', opacity: 0.8 }}>
              <Filter size={16} /> Filters Applied
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
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id}>
                    <td><span className="id-link">{row.id}</span></td>
                    <td>{row.name || row.fullName}</td>
                    <td>{row.department || row.dept}</td>
                    <td>{row.designation}</td>
                    <td>{row.phone || row.mobileNumber || 'N/A'}</td>
                    <td>
                      <span className={`status-pill status-${(row.status || 'active').toLowerCase()}`}>
                        {row.status || 'Active'}
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
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No preceptor records found matching the filters.</td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {filteredData.length} records
            </div>
          </div>

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
