import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, Download, Eye, Printer, FileText, ChevronDown
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import { useDatabase } from '../../context/DatabaseContext';
import './PreceptorList.css'; // Reusing for list tables

const StudentReports = () => {
  const { users, academicYears } = useDatabase();
  const allStudents = users.filter(u => u.role === 'student');

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Filters
  const [filterAcademicYear, setFilterAcademicYear] = useState('All');
  const [filterBatch, setFilterBatch] = useState('All');
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter Data
  const filteredData = allStudents.filter(student => {
    const matchAy = filterAcademicYear === 'All' || student.academicYear === filterAcademicYear;
    const matchBatch = filterBatch === 'All' || student.batch === filterBatch;
    const matchCourse = filterCourse === 'All' || student.course === filterCourse;
    const matchYear = filterYear === 'All' || student.year === filterYear;
    const matchStatus = filterStatus === 'All' || student.status === filterStatus;
    return matchAy && matchBatch && matchCourse && matchYear && matchStatus;
  });

  const handleExport = (type) => {
    window.print();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleView = (row) => {
    setSelectedRecord([
      { label: 'Roll No', value: row.id },
      { label: 'Name', value: row.name || row.fullName },
      { label: 'Course', value: row.course },
      { label: 'Year', value: row.year },
      { label: 'Academic Year', value: row.academicYear },
      { label: 'Mobile', value: row.phone || row.mobileNumber },
      { label: 'Status', value: row.status, type: 'status' }
    ]);
    setIsViewModalOpen(true);
  };

  const uniqueAcademicYears = Array.from(new Set(allStudents.map(s => s.academicYear).filter(Boolean))).sort();
  const uniqueBatches = Array.from(new Set(allStudents.map(s => s.batch).filter(Boolean))).sort();

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
                <select value={filterAcademicYear} onChange={e => setFilterAcademicYear(e.target.value)}>
                  <option value="All">All</option>
                  {uniqueAcademicYears.map(ay => (
                    <option key={ay} value={ay}>{ay}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Batch</span>
              <div className="select-wrapper">
                <select value={filterBatch} onChange={e => setFilterBatch(e.target.value)}>
                  <option value="All">All</option>
                  {uniqueBatches.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Course</span>
              <div className="select-wrapper">
                <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Pharm.D">Pharm.D</option>
                  <option value="Pharm.D (PB)">Pharm.D (PB)</option>
                  <option value="M.Pharm">M.Pharm</option>
                  <option value="B.Pharm">B.Pharm</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Year</span>
              <div className="select-wrapper">
                <select value={filterYear} onChange={e => setFilterYear(e.target.value)}>
                  <option value="All">All</option>
                  <option value="I Year">I Year</option>
                  <option value="II Year">II Year</option>
                  <option value="III Year">III Year</option>
                  <option value="IV Year">IV Year</option>
                  <option value="V Year">V Year</option>
                  <option value="VI Year">VI Year</option>
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
                <th>Roll Number <span className="sort-icon">↕</span></th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Year</th>
                <th>Academic Year</th>
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
                    <td>{row.course}</td>
                    <td>{row.year}</td>
                    <td>{row.academicYear}</td>
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
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No student records found matching the filters.</td>
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
          title="Student Report Details"
          subtitle="View student report information"
          data={selectedRecord}
        />
      )}
    </CollegeAdminLayout>
  );
};

export default StudentReports;
