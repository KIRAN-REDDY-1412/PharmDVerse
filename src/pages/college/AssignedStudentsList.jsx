import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Pencil, Trash2, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import AssignStudentModal from '../../components/college/students/AssignStudentModal';
import ConfirmDeleteModal from '../../components/college/shared/ConfirmDeleteModal';
import './PreceptorList.css'; 

const MOCK_ASSIGNMENTS = [
  { id: 'ASGN001', rollNumber: 'Y26PHD0301', name: 'John Doe', course: 'Pharm.D', batch: 'Y26', year: 'IV Year', academicYear: '2026-2027', preceptor: 'Dr. Sarah Jenkins' },
  { id: 'ASGN002', rollNumber: 'Y26PHD0302', name: 'Jane Smith', course: 'Pharm.D', batch: 'Y26', year: 'IV Year', academicYear: '2026-2027', preceptor: 'Dr. Michael Chen' },
];

const AssignedStudentsList = () => {
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleEdit = (row) => {
    setSelectedRecord(row);
    setIsEditModalOpen(true);
  };

  const handleRemoveClick = (row) => {
    setSelectedRecord(row);
    setIsDeleteModalOpen(true);
  };

  const confirmRemove = () => {
    if (selectedRecord) {
      setAssignments(assignments.filter(a => a.id !== selectedRecord.id));
      setIsDeleteModalOpen(false);
      setSelectedRecord(null);
    }
  };

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
              <Link to="/college-admin/assign-students" className="breadcrumb-link">Assign Students</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Assigned List</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left" style={{ gap: '1.5rem' }}>
            <div className="search-box" style={{ width: '300px' }}>
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search by Roll No or Student Name..." />
            </div>
            
            <div className="filter-group">
              <span className="filter-label">Preceptor</span>
              <div className="select-wrapper">
                <select>
                  <option>All Preceptors</option>
                  <option>Dr. Sarah Jenkins</option>
                  <option>Dr. Michael Chen</option>
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
              {assignments.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 600 }}>{row.rollNumber}</td>
                  <td>{row.name}</td>
                  <td>{row.course}</td>
                  <td>{row.batch}</td>
                  <td>{row.year}</td>
                  <td>{row.academicYear}</td>
                  <td>
                    <span style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-surface-alt)', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid var(--border-color)' }}>
                      {row.preceptor}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn" title="Edit Assignment" onClick={() => handleEdit(row)}>
                        <Pencil size={16} />
                      </button>
                      <button className="action-btn delete" title="Remove Assignment" onClick={() => handleRemoveClick(row)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination-info">
              Showing 1 to {assignments.length} of {assignments.length} entries
            </div>
            <div className="pagination-controls">
              <div className="page-numbers">
                <button className="page-btn" disabled><ChevronsLeft size={16} /></button>
                <button className="page-btn" disabled><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn" disabled><ChevronRight size={16} /></button>
                <button className="page-btn" disabled><ChevronsRight size={16} /></button>
              </div>
              <div className="rows-per-page">
                <div className="select-wrapper">
                  <select>
                    <option>10 / page</option>
                    <option>20 / page</option>
                    <option>50 / page</option>
                  </select>
                  <ChevronDown size={14} className="select-arrow" />
                </div>
              </div>
            </div>
          </div>
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
        message={`Are you sure you want to remove the assignment for ${selectedRecord?.name}? The student will no longer be assigned to the current preceptor.`}
        confirmText="Remove"
      />

    </CollegeAdminLayout>
  );
};

export default AssignedStudentsList;
