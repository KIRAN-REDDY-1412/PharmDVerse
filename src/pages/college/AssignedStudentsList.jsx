import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, Filter, Pencil, Trash2, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Plus
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import AssignStudentModal from '../../components/college/students/AssignStudentModal';
import ConfirmDeleteModal from '../../components/college/shared/ConfirmDeleteModal';
import { useDatabase } from '../../context/DatabaseContext';
import './PreceptorList.css'; 

const AssignedStudentsList = () => {
  const { users, updateUser } = useDatabase();
  const students = users.filter(u => u.role === 'student');
  const preceptors = users.filter(u => u.role === 'preceptor');
  
  // Create assignments list from all students
  const assignments = students.map(s => {
    const preceptor = s.assignedPreceptorId ? preceptors.find(p => p.id === s.assignedPreceptorId) : null;
    return {
      ...s,
      preceptorName: preceptor ? (preceptor.name || preceptor.fullName) : 'Unassigned',
      isAssigned: !!s.assignedPreceptorId
    };
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAssignmentStatus, setFilterAssignmentStatus] = useState(location.state?.filterStatus || 'All');
  const [filterPreceptor, setFilterPreceptor] = useState('All Preceptors');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleEdit = (row) => {
    setIsEditModalOpen(true);
  };

  const handleRemoveClick = (row) => {
    setSelectedRecord(row);
    setIsDeleteModalOpen(true);
  };

  const confirmRemove = () => {
    if (selectedRecord) {
      updateUser(selectedRecord.id, { assignedPreceptorId: '' });
      setIsDeleteModalOpen(false);
      setSelectedRecord(null);
    }
  };

  const filteredAssignments = assignments.filter(a => {
    const matchesSearch = !searchQuery || 
      (a.name || a.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.id || '').toLowerCase().includes(searchQuery.toLowerCase());
      
    let matchesStatus = true;
    if (filterAssignmentStatus === 'Assigned') matchesStatus = a.isAssigned;
    if (filterAssignmentStatus === 'Unassigned') matchesStatus = !a.isAssigned;

    const matchesPreceptor = filterPreceptor === 'All Preceptors' || a.preceptorName === filterPreceptor;
    
    return matchesSearch && matchesStatus && matchesPreceptor;
  });

  const totalPages = Math.max(1, Math.ceil(filteredAssignments.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * rowsPerPage;
  const paginatedAssignments = filteredAssignments.slice(startIdx, startIdx + rowsPerPage);

  const uniquePreceptors = Array.from(new Set(assignments.map(a => a.preceptorName))).filter(name => name !== 'Unassigned').sort();

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Assigned Students</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/college-admin/assign-students" className="breadcrumb-link">Student-Preceptor Assignment</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Assigned List</span>
            </div>
          </div>
          <div className="header-right">
             <button className="btn-primary" onClick={() => setIsEditModalOpen(true)}>
               <Plus size={18} /> Assign Student
             </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left" style={{ gap: '1.5rem' }}>
            <div className="search-box" style={{ width: '300px' }}>
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by Roll No or Name..." 
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
            
            <div className="filter-group">
              <span className="filter-label">Assignment Status</span>
              <div className="select-wrapper">
                <select value={filterAssignmentStatus} onChange={e => { setFilterAssignmentStatus(e.target.value); setCurrentPage(1); }}>
                  <option value="All">All</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Unassigned">Unassigned</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-label">Preceptor</span>
              <div className="select-wrapper">
                <select value={filterPreceptor} onChange={e => { setFilterPreceptor(e.target.value); setCurrentPage(1); }}>
                  <option>All Preceptors</option>
                  {uniquePreceptors.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <button className="btn-filter">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll Number <span className="sort-icon">↕</span></th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Batch</th>
                <th>Year</th>
                <th>Academic Year</th>
                <th>Assigned Preceptor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssignments.length > 0 ? (
                paginatedAssignments.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 600 }}>{row.id}</td>
                    <td>{row.name || row.fullName}</td>
                    <td>{row.course}</td>
                    <td>{row.batch}</td>
                    <td>{row.year}</td>
                    <td>{row.academicYear}</td>
                    <td>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        backgroundColor: row.isAssigned ? 'var(--bg-surface-alt)' : 'rgba(239, 68, 68, 0.1)', 
                        color: row.isAssigned ? 'var(--text-primary)' : 'var(--color-danger)',
                        borderRadius: '4px', 
                        fontSize: '0.9rem', 
                        border: row.isAssigned ? '1px solid var(--border-color)' : 'none' 
                      }}>
                        {row.preceptorName}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn" title="Edit Assignment" onClick={() => handleEdit(row)}>
                          <Pencil size={16} />
                        </button>
                        {row.isAssigned && (
                          <button className="action-btn delete" title="Remove Assignment" onClick={() => handleRemoveClick(row)}>
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No assignments found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {filteredAssignments.length > 0 && (
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {startIdx + 1} to {Math.min(startIdx + rowsPerPage, filteredAssignments.length)} of {filteredAssignments.length} entries
              </div>
              <div className="pagination-controls">
                <div className="page-numbers">
                  <button className="page-btn" disabled={safePage === 1} onClick={() => setCurrentPage(1)}><ChevronsLeft size={16} /></button>
                  <button className="page-btn" disabled={safePage === 1} onClick={() => setCurrentPage(safePage - 1)}><ChevronLeft size={16} /></button>
                  <button className="page-btn active">{safePage}</button>
                  <button className="page-btn" disabled={safePage === totalPages} onClick={() => setCurrentPage(safePage + 1)}><ChevronRight size={16} /></button>
                  <button className="page-btn" disabled={safePage === totalPages} onClick={() => setCurrentPage(totalPages)}><ChevronsRight size={16} /></button>
                </div>
                <div className="rows-per-page">
                  <div className="select-wrapper">
                    <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                      <option value={10}>10 / page</option>
                      <option value={20}>20 / page</option>
                      <option value={50}>50 / page</option>
                    </select>
                    <ChevronDown size={14} className="select-arrow" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      <AssignStudentModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRecord(null);
        }}
        onConfirm={confirmRemove}
        title="Remove Assignment"
        message={`Are you sure you want to remove the assignment for ${selectedRecord?.name || selectedRecord?.fullName}? The student will no longer be assigned to the current preceptor.`}
        confirmText="Remove"
      />

    </CollegeAdminLayout>
  );
};

export default AssignedStudentsList;
