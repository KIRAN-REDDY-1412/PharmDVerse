import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Plus, Filter, Download, ChevronDown, User, CheckCircle, 
  Trash2, FileText, Activity, Users, AlertCircle,
  Eye, Pencil, MoreVertical, KeyRound, Clock3,
  SlidersHorizontal, Settings, Maximize, Minimize, ListFilter
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import AddStudentModal from '../../components/college/student/AddStudentModal';
import ResetPasswordModal from '../../components/college/student/ResetPasswordModal';
import { useDatabase } from '../../context/DatabaseContext';
import { exportToExcel, exportToPDF } from '../../utils/ExportEngine';
import '../college/PreceptorList.css'; // Reuse enterprise CSS

const StudentList = () => {
  const { users, cases, updateUser, resetUserPassword } = useDatabase();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Data State
  const students = users.filter(u => u.role === 'student');
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterBatch, setFilterBatch] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [filterStatus, setFilterStatus] = useState(location.state?.filterStatus || 'All');
  
  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Modals & Row Interactivity
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isResetPwModalOpen, setIsResetPwModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  
  // Bulk Actions & More Menu
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Enterprise Upgrades State
  const [density, setDensity] = useState('comfortable'); // 'comfortable' | 'compact'
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnChooser, setShowColumnChooser] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    rollNumber: true,
    studentName: true,
    batch: true,
    year: true,
    assignedPreceptor: true,
    clinicalCases: true,
    status: true,
    email: false,
    mobile: false
  });

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Keep column chooser open if clicking inside it
      if (!e.target.closest('.column-chooser-dropdown') && !e.target.closest('.btn-column-toggle')) {
        setShowColumnChooser(false);
      }
      if (!e.target.closest('.action-menu-dropdown') && !e.target.closest('.btn-icon')) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // -------------------------------------------------------------
  // Data Processing
  // -------------------------------------------------------------
  let filteredData = students.filter(s => {
    const q = searchQuery.toLowerCase();
    const matchSearch = 
      s.id?.toLowerCase().includes(q) || 
      s.name?.toLowerCase().includes(q) || 
      s.email?.toLowerCase().includes(q) || 
      s.phone?.toLowerCase().includes(q) ||
      s.mobileNumber?.toLowerCase().includes(q) ||
      s.batch?.toLowerCase().includes(q);

    const matchCourse = filterCourse === 'All' || s.course === filterCourse;
    const matchBatch = filterBatch === 'All' || s.batch === filterBatch;
    const matchYear = filterYear === 'All' || s.year === filterYear;
    const matchStatus = filterStatus === 'All' || s.status === filterStatus;

    return matchSearch && matchCourse && matchBatch && matchYear && matchStatus;
  });

  filteredData.sort((a, b) => {
    const valA = String(a[sortConfig.key] || '');
    const valB = String(b[sortConfig.key] || '');
    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalRecords = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIdx, startIdx + rowsPerPage);

  // Quick Stats
  const activeCount = students.filter(s => s.status === 'Active').length;
  const inactiveCount = students.length - activeCount;
  
  const batches = [...new Set(students.map(s => s.batch).filter(Boolean))].sort();

  // -------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleRowSelect = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) setSelectedRows([]);
    else setSelectedRows(paginatedData.map(p => p.id));
  };

  const handleRowClick = (e, row) => {
    if (e.target.closest('.action-buttons') || e.target.closest('.row-checkbox')) return;
    navigate(`/college-admin/students/view/${row.id}`);
  };

  const handleDeactivate = (row) => {
    updateUser(row.id, { status: 'Inactive' });
    showSuccess(`Student "${row.name}" deactivated successfully.`);
  };

  const handleBulkAction = (action) => {
    if (action === 'export') {
      window.print();
      return;
    }

    let successCount = 0;
    selectedRows.forEach(id => {
      if (action === 'activate') {
        updateUser(id, { status: 'Active' });
        successCount++;
      } else if (action === 'deactivate') {
        updateUser(id, { status: 'Inactive' });
        successCount++;
      }
    });
    
    if (successCount > 0) {
      showSuccess(`${successCount} student(s) successfully ${action}d.`);
    }
    setSelectedRows([]);
  };

  // -------------------------------------------------------------
  // Render Helpers
  // -------------------------------------------------------------
  const getPreceptorName = (preceptorId) => {
    if (!preceptorId) return <span style={{ color: 'var(--text-secondary)' }}>Unassigned</span>;
    const p = users.find(u => u.id === preceptorId);
    return p ? (p.name || p.fullName) : <span style={{ color: 'var(--text-secondary)' }}>Unknown</span>;
  };

  const getClinicalCasesCount = (studentId, studentName) => {
    return cases.filter(c => c.studentId === studentId || c.student === studentName).length;
  };

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        {successMessage && (
          <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999, background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', padding: '0.85rem 1.5rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', animation: 'fadeInDown 0.3s ease' }}>
            <CheckCircle size={18} /> {successMessage}
          </div>
        )}

        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Student Management</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Student List</span>
            </div>
          </div>
          <div className="header-right">
            <button className="btn-primary" onClick={() => { setEditRecord(null); setIsAddModalOpen(true); }}>
              <Plus size={18} /> Register Student
            </button>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="quick-stats-grid">
          <div className="stat-card" onClick={() => setFilterStatus('All')}>
            <div className="stat-icon total"><Users size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{students.length}</span>
              <span className="stat-label">Total Students</span>
            </div>
          </div>
          <div className="stat-card" onClick={() => setFilterStatus('Active')}>
            <div className="stat-icon active"><CheckCircle size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{activeCount}</span>
              <span className="stat-label">Active Students</span>
            </div>
          </div>
          <div className="stat-card" onClick={() => setFilterStatus('Inactive')}>
            <div className="stat-icon inactive"><AlertCircle size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{inactiveCount}</span>
              <span className="stat-label">Inactive Students</span>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="list-toolbar">
          <div className="toolbar-left" style={{ flexWrap: 'wrap' }}>
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search by Roll No, Name, Batch, Email..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
            </div>
            {/* Enterprise Toolbar Extensions */}
            <button className="btn-bulk btn-icon" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} title="Advanced Filters" style={{ background: showAdvancedFilters ? 'var(--bg-surface-alt)' : 'transparent', padding: '0.4rem 0.6rem' }}>
              <ListFilter size={16} /> Filters
            </button>
            <div style={{ position: 'relative' }}>
              <button className="btn-bulk btn-icon btn-column-toggle" onClick={() => setShowColumnChooser(!showColumnChooser)} title="Customize Columns" style={{ padding: '0.4rem 0.6rem' }}>
                <Settings size={16} /> Columns
              </button>
              {showColumnChooser && (
                <div className="column-chooser-dropdown">
                  <div style={{ padding: '0.5rem', fontWeight: 600, fontSize: '0.85rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>Visible Columns</div>
                  {Object.keys(visibleColumns).map(col => (
                    <label key={col} className="column-toggle-item">
                      <input type="checkbox" checked={visibleColumns[col]} onChange={() => setVisibleColumns({...visibleColumns, [col]: !visibleColumns[col]})} />
                      <span>{col.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <button className="btn-bulk btn-icon" onClick={() => setDensity(d => d === 'comfortable' ? 'compact' : 'comfortable')} title="Toggle Density" style={{ padding: '0.4rem 0.6rem' }}>
              {density === 'comfortable' ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              className="btn-export" 
              onClick={() => {
                const cols = [
                  { label: 'Roll No', key: 'id' },
                  { label: 'Name', key: 'name' },
                  { label: 'Course', key: 'course' },
                  { label: 'Batch', key: 'batch' },
                  { label: 'Year', key: 'academicYear' },
                  { label: 'Status', key: 'status' }
                ];
                exportToExcel({ title: 'Student Roster Report', collegeName: 'PharmDVerse ERP', logoText: 'PDV', generatedBy: 'College Admin', academicYear: '2026-2027', columns: cols, data: filteredData, filename: 'Student_Roster' });
              }}
            >
              <Download size={14} /> Excel
            </button>
            <button 
              className="btn-export" 
              onClick={() => {
                const cols = [
                  { label: 'Roll No', key: 'id' },
                  { label: 'Name', key: 'name' },
                  { label: 'Course', key: 'course' },
                  { label: 'Batch', key: 'batch' },
                  { label: 'Year', key: 'academicYear' },
                  { label: 'Status', key: 'status' }
                ];
                exportToPDF({ title: 'Student Roster Report', collegeName: 'PharmDVerse ERP', logoText: 'PDV', generatedBy: 'College Admin', academicYear: '2026-2027', columns: cols, data: filteredData, filename: 'Student_Roster' });
              }}
            >
              <FileText size={14} /> PDF
            </button>
          </div>
        </div>

        {/* Advanced Filters Tray */}
        {showAdvancedFilters && (
          <div className="advanced-filters-tray">
            <div className="filter-group">
              <label>Course</label>
              <div className="select-wrapper">
                <select value={filterCourse} onChange={(e) => { setFilterCourse(e.target.value); setCurrentPage(1); }}>
                  <option value="All">All Courses</option>
                  <option value="Pharm.D">Pharm.D</option>
                  <option value="Pharm.D (PB)">Pharm.D (PB)</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <label>Batch</label>
              <div className="select-wrapper">
                <select value={filterBatch} onChange={(e) => { setFilterBatch(e.target.value); setCurrentPage(1); }}>
                  <option value="All">All Batches</option>
                  {batches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <label>Year</label>
              <div className="select-wrapper">
                <select value={filterYear} onChange={(e) => { setFilterYear(e.target.value); setCurrentPage(1); }}>
                  <option value="All">All Years</option>
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
              <label>Status</label>
              <div className="select-wrapper">
                <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>
          </div>
        )}
          


        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="bulk-actions-toolbar">
            <div className="bulk-actions-left">
              <CheckCircle size={18} /> {selectedRows.length} Student(s) Selected
            </div>
            <div className="bulk-actions-right">
              <button className="btn-bulk" onClick={() => handleBulkAction('activate')}><CheckCircle size={14} /> Activate</button>
              <button className="btn-bulk" onClick={() => handleBulkAction('deactivate')}><Trash2 size={14} /> Deactivate</button>
              <button className="btn-bulk" onClick={() => handleBulkAction('export')}><Download size={14} /> Export</button>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="table-container">
          <table className={`data-table ${density === 'compact' ? 'table-density-compact' : ''}`}>
            <thead>
              <tr>
                <th style={{ width: '40px', paddingLeft: '1rem' }}>
                  <input type="checkbox" className="row-checkbox" checked={selectedRows.length > 0 && selectedRows.length === paginatedData.length} onChange={toggleSelectAll} />
                </th>
                <th style={{ width: '50px' }}>Photo</th>
                {visibleColumns.rollNumber && <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>Roll Number <span className="sort-icon">↕</span></th>}
                {visibleColumns.studentName && <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Student Name <span className="sort-icon">↕</span></th>}
                {visibleColumns.email && <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>Email <span className="sort-icon">↕</span></th>}
                {visibleColumns.mobile && <th onClick={() => handleSort('mobileNumber')} style={{ cursor: 'pointer' }}>Mobile <span className="sort-icon">↕</span></th>}
                {visibleColumns.batch && <th onClick={() => handleSort('batch')} style={{ cursor: 'pointer', textAlign: 'center' }}>Batch <span className="sort-icon">↕</span></th>}
                {visibleColumns.year && <th onClick={() => handleSort('year')} style={{ cursor: 'pointer', textAlign: 'center' }}>Year <span className="sort-icon">↕</span></th>}
                {visibleColumns.assignedPreceptor && <th className="hide-on-mobile">Assigned Preceptor</th>}
                {visibleColumns.clinicalCases && <th className="hide-on-mobile" style={{ textAlign: 'center' }}>Clinical Cases</th>}
                {visibleColumns.status && <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>Status <span className="sort-icon">↕</span></th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="12" style={{ padding: '0' }}>
                    {students.length === 0 ? (
                      <div className="enterprise-empty-state">
                        <div className="icon-wrapper"><Users size={32} /></div>
                        <h3>No Students Registered</h3>
                        <p>There are currently no students in the system. Register a new student to get started.</p>
                        <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}><Plus size={16} /> Register Student</button>
                      </div>
                    ) : (
                      <div className="enterprise-empty-state">
                        <div className="icon-wrapper"><Search size={32} /></div>
                        <h3>No Matches Found</h3>
                        <p>We couldn't find any students matching your search criteria and active filters.</p>
                        <button className="btn-bulk" onClick={() => { setSearchQuery(''); setFilterCourse('All'); setFilterStatus('All'); setFilterBatch('All'); setFilterYear('All'); }}><Filter size={16} /> Clear All Filters</button>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr key={row.id} className="clickable-row" onClick={(e) => handleRowClick(e, row)}>
                    <td style={{ paddingLeft: '1rem' }} onClick={e => e.stopPropagation()}>
                      <input type="checkbox" className="row-checkbox" checked={selectedRows.includes(row.id)} onChange={() => toggleRowSelect(row.id)} />
                    </td>
                    <td>
                      {row.profilePhoto ? (
                        <img src={row.profilePhoto} alt="Profile" className="profile-avatar" />
                      ) : (
                        <div className="profile-avatar"><User size={16} /></div>
                      )}
                    </td>
                    {visibleColumns.rollNumber && <td style={{ fontWeight: 600 }}>{row.id}</td>}
                    {visibleColumns.studentName && <td>{row.name || row.fullName}</td>}
                    {visibleColumns.email && <td>{row.email}</td>}
                    {visibleColumns.mobile && <td>{row.mobileNumber || row.phone}</td>}
                    {visibleColumns.batch && <td style={{ textAlign: 'center' }}>
                      <span style={{ display: 'inline-block', background: 'var(--bg-surface-alt)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {row.batch}
                      </span>
                    </td>}
                    {visibleColumns.year && <td style={{ textAlign: 'center' }}>{row.year}</td>}
                    {visibleColumns.assignedPreceptor && <td className="hide-on-mobile">{getPreceptorName(row.assignedPreceptorId)}</td>}
                    {visibleColumns.clinicalCases && <td className="hide-on-mobile" style={{ textAlign: 'center' }}>
                      <span style={{ display: 'inline-block', background: 'var(--bg-surface-alt)', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {getClinicalCasesCount(row.id, row.name || row.fullName)}
                      </span>
                    </td>}
                    {visibleColumns.status && <td>
                      <span className={`status-badge ${row.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                        {row.status}
                      </span>
                    </td>}
                    <td onClick={e => e.stopPropagation()}>
                      <div className="action-buttons" onClick={e => e.stopPropagation()}>
                        <button className="action-btn" title="View" onClick={() => navigate(`/college-admin/students/view/${row.id}`)}>
                          <Eye size={16} />
                        </button>
                        <button className="action-btn" title="Edit" onClick={() => { setEditRecord(row); setIsAddModalOpen(true); }}>
                          <Pencil size={16} />
                        </button>
                        <div className="action-menu-container">
                          <button className="action-btn" title="More" onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === row.id ? null : row.id); }}>
                            <MoreVertical size={16} />
                          </button>
                          {activeMenuId === row.id && (
                            <div className="action-menu-dropdown">
                              <button className="action-menu-item" onClick={() => { setIsResetPwModalOpen(true); setSelectedRecord(row); setActiveMenuId(null); }}>
                                <KeyRound size={14} /> Reset Password
                              </button>
                              <button className="action-menu-item" style={{ color: 'var(--color-danger)' }} onClick={() => { handleDeactivate(row); setActiveMenuId(null); }}>
                                <Trash2 size={14} /> Deactivate
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {paginatedData.length > 0 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {startIdx + 1}–{Math.min(startIdx + rowsPerPage, totalRecords)} of {totalRecords} Records
                <select 
                  style={{ marginLeft: '1rem', padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}
                  value={rowsPerPage} 
                  onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                >
                  <option value="10">10 / page</option>
                  <option value="25">25 / page</option>
                  <option value="50">50 / page</option>
                  <option value="100">100 / page</option>
                </select>
              </div>
              <div className="pagination-controls">
                <button 
                  className="page-btn" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  Previous
                </button>
                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, idx) => {
                    const p = idx + 1;
                    if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                      return (
                        <button key={p} className={`page-btn ${p === safePage ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>
                          {p}
                        </button>
                      );
                    } else if (p === currentPage - 2 || p === currentPage + 2) {
                      return <span key={p} style={{ margin: '0 0.25rem', color: 'var(--text-secondary)' }}>...</span>;
                    }
                    return null;
                  })}
                </div>
                <button 
                  className="page-btn" 
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <AddStudentModal
          isOpen={isAddModalOpen}
          onClose={() => { setIsAddModalOpen(false); setEditRecord(null); }}
          mode={editRecord ? 'edit' : 'add'}
          initialData={editRecord}
        />
      )}

      {isResetPwModalOpen && (
        <ResetPasswordModal
          isOpen={isResetPwModalOpen}
          onClose={() => setIsResetPwModalOpen(false)}
          studentId={selectedRecord?.id}
          onSubmit={(id, pw) => resetUserPassword(id, pw)}
        />
      )}
    </CollegeAdminLayout>
  );
};

export default StudentList;
