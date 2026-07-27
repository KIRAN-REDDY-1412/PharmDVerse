import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Filter, Download, Eye, FileText,
  ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ChevronDown, ClipboardList
} from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import '../college/PreceptorList.css';
import ViewStudentModal from '../../components/college/student/ViewStudentModal';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';

const PreceptorStudentList = () => {
  const { users, cases } = useDatabase();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Filter students assigned to this preceptor
  const students = users.filter(u => u.role === 'student' && u.assignedPreceptorId === currentUser?.id);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterCaseStatus, setFilterCaseStatus] = useState('All');
  const [filterCurrentYear, setFilterCurrentYear] = useState('All');
  const [filterBatch, setFilterBatch] = useState('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Compute metrics for each student
  const studentsWithMetrics = students.map(student => {
    const studentCases = cases.filter(c => c.rollNo === student.id && c.status !== 'Draft');
    const totalCases = studentCases.length;
    
    // Sort by submission date descending
    studentCases.sort((a, b) => new Date(b.submittedDate || b.date) - new Date(a.submittedDate || a.date));
    
    const latestCase = studentCases[0];
    
    let currentCaseStatus = 'No Case Submitted';
    if (latestCase) {
      if (latestCase.status === 'Pending') currentCaseStatus = 'Under Review';
      else currentCaseStatus = latestCase.status;
    }

    let lastSubmissionDate = '-';
    if (latestCase) {
      const dateVal = latestCase.submittedDate || latestCase.date;
      if (dateVal) {
        lastSubmissionDate = new Date(dateVal).toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        });
      }
    }

    return {
      ...student,
      totalClinicalCases: totalCases,
      currentCaseStatus,
      lastSubmissionDate
    };
  });

  // Filter + Search
  const filteredStudents = studentsWithMetrics.filter(s => {
    const matchesSearch = !searchQuery || 
      (s.name || s.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.id || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse === 'All' || (s.course || s.program) === filterCourse;
    const matchesStatus = filterCaseStatus === 'All' || s.currentCaseStatus === filterCaseStatus;
    const matchesCurrentYear = filterCurrentYear === 'All' || s.year === filterCurrentYear;
    const matchesBatch = filterBatch === 'All' || s.batch === filterBatch;
    return matchesSearch && matchesCourse && matchesStatus && matchesCurrentYear && matchesBatch;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * rowsPerPage;
  const paginatedStudents = filteredStudents.slice(startIdx, startIdx + rowsPerPage);

  // Handlers
  const handleView = (row) => {
    setSelectedRecord(row);
    setIsViewModalOpen(true);
  };

  const handleViewCases = (row) => {
    // Navigate to the Clinical Cases module with filter state for the student's Roll Number
    navigate('/preceptor/cases/list', { state: { filterStudent: row.id } });
  };

  // Page number generation
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, safePage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved': return 'status-active';
      case 'Under Review': return 'status-pending';
      case 'Submitted': return 'status-pending';
      case 'Returned': return 'status-returned';
      case 'No Case Submitted': return 'status-inactive';
      default: return 'status-inactive';
    }
  };

  return (
    <PreceptorLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Assigned Students</h1>
            <div className="breadcrumbs">
              <Link to="/preceptor/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Assigned Students</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Student List</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search name or roll no..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
            
            <div className="filter-group">
              <span className="filter-label">Course</span>
              <div className="select-wrapper">
                <select value={filterCourse} onChange={(e) => { setFilterCourse(e.target.value); setCurrentPage(1); }}>
                  <option value="All">All</option>
                  <option value="Pharm.D">Pharm.D</option>
                  <option value="M.Pharm">M.Pharm</option>
                  <option value="B.Pharm">B.Pharm</option>
                  <option value="D.Pharm">D.Pharm</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Case Status</span>
              <div className="select-wrapper">
                <select value={filterCaseStatus} onChange={(e) => { setFilterCaseStatus(e.target.value); setCurrentPage(1); }}>
                  <option value="All">All Statuses</option>
                  <option value="No Case Submitted">No Case Submitted</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Returned">Returned</option>
                  <option value="Approved">Approved</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Year</span>
              <div className="select-wrapper">
                <select value={filterCurrentYear} onChange={(e) => { setFilterCurrentYear(e.target.value); setCurrentPage(1); }}>
                  <option value="All">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                  <option value="6th Year">6th Year</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Batch</span>
              <div className="select-wrapper">
                <select value={filterBatch} onChange={(e) => { setFilterBatch(e.target.value); setCurrentPage(1); }}>
                  <option value="All">All Batches</option>
                  <option value="2021-2027">2021-2027</option>
                  <option value="2022-2028">2022-2028</option>
                  <option value="2023-2029">2023-2029</option>
                  <option value="2024-2030">2024-2030</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Profile Photo</th>
                <th>Roll Number <span className="sort-icon">↕</span></th>
                <th>Full Name <span className="sort-icon">↕</span></th>
                <th>Course</th>
                <th>Current Year</th>
                <th>Batch</th>
                <th>Academic Year</th>
                <th>Total Cases</th>
                <th>Latest Case Status <span className="sort-icon">↕</span></th>
                <th>Last Submission <span className="sort-icon">↕</span></th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="11" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No assigned students found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((row) => (
                  <tr key={row.id}>
                    <td>
                      {row.profilePhoto ? (
                        <img src={row.profilePhoto} alt={row.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.9rem' }}>
                          {(row.name || row.fullName || 'S')[0]}
                        </div>
                      )}
                    </td>
                    <td style={{ fontWeight: 600 }}>{row.id}</td>
                    <td>{row.name || row.fullName}</td>
                    <td>{row.course || row.program}</td>
                    <td>{row.year}</td>
                    <td>{row.batch || '-'}</td>
                    <td>{row.academicYear || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{row.totalClinicalCases}</td>
                    <td>
                      <span className={`status-pill ${getStatusClass(row.currentCaseStatus)}`}>
                        {row.currentCaseStatus}
                      </span>
                    </td>
                    <td>{row.lastSubmissionDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn" title="View Student Profile" onClick={() => handleView(row)}>
                          <Eye size={16} />
                        </button>
                        <button className="action-btn" title="View Clinical Cases" onClick={() => handleViewCases(row)} style={{ color: 'var(--color-primary)' }}>
                          <ClipboardList size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {filteredStudents.length === 0 ? 0 : startIdx + 1} to {Math.min(startIdx + rowsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
            </div>
            <div className="pagination-controls">
              <div className="page-numbers">
                <button className="page-btn" disabled={safePage === 1} onClick={() => setCurrentPage(1)}>
                  <ChevronsLeft size={16} />
                </button>
                <button className="page-btn" disabled={safePage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                  <ChevronLeft size={16} />
                </button>
                {getPageNumbers().map(p => (
                  <button key={p} className={`page-btn ${p === safePage ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>
                    {p}
                  </button>
                ))}
                <button className="page-btn" disabled={safePage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                  <ChevronRight size={16} />
                </button>
                <button className="page-btn" disabled={safePage === totalPages} onClick={() => setCurrentPage(totalPages)}>
                  <ChevronsRight size={16} />
                </button>
              </div>
              <div className="rows-per-page">
                <div className="select-wrapper">
                  <select value={`${rowsPerPage} / page`} onChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}>
                    <option value="10">10 / page</option>
                    <option value="20">20 / page</option>
                    <option value="50">50 / page</option>
                  </select>
                  <ChevronDown size={14} className="select-arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* View Student Modal */}
      <ViewStudentModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        student={selectedRecord}
      />

    </PreceptorLayout>
  );
};

export default PreceptorStudentList;
