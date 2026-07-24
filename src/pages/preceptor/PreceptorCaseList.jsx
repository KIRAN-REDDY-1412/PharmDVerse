import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, Download, Eye, Pencil,
  ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ChevronDown
} from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import CaseViewModal from '../../components/preceptor/CaseViewModal';
import CaseReviewModal from '../../components/preceptor/CaseReviewModal';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import '../college/PreceptorList.css';



const getStatusClass = (status) => {
  switch (status) {
    case 'Approved': return 'status-active';
    case 'Pending': return 'status-pending';
    case 'Returned': return 'status-returned';
    default: return '';
  }
};

const PreceptorCaseList = () => {
  const { getPreceptorAssignedCases, updateCaseStatus, users } = useDatabase();
  const { currentUser } = useAuth();
  
  const cases = currentUser ? getPreceptorAssignedCases(currentUser.id) : [];

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const handleStatusUpdate = (caseId, status, remarks) => {
    updateCaseStatus(caseId, status, remarks);
    setIsReviewModalOpen(false);
    setSelectedCase(null);
  };

  const openViewModal = (record) => {
    setSelectedCase(record);
    setIsViewModalOpen(true);
  };

  const openReviewModal = (record) => {
    if (record.status === 'Pending' || record.status === 'Submitted') {
      setSelectedCase(record);
      setIsReviewModalOpen(true);
    }
  };

  return (
    <PreceptorLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Case List</h1>
            <div className="breadcrumbs">
              <Link to="/preceptor/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/preceptor/cases" className="breadcrumb-link">Clinical Cases</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Case List</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search by case ID, student, or preceptor..." />
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
              <span className="filter-label">Date</span>
              <div className="select-wrapper">
                <select>
                  <option>All Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>This Year</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <button className="btn-filter">
              <Filter size={16} /> Filter
            </button>
          </div>

          <button className="btn-export">
            <Download size={16} /> Export
          </button>
        </div>

        {/* Data Table */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Case ID <span className="sort-icon">↕</span></th>
                <th>Student Roll No.</th>
                <th>Student Name</th>
                <th>Assigned Preceptor</th>
                <th>Submission Date</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((row) => (
                <tr key={row.id}>
                  <td><span className="id-link">{row.id}</span></td>
                  <td>{row.rollNo}</td>
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
                      <button className="action-btn" title="View Case" onClick={() => openViewModal(row)}>
                        <Eye size={16} />
                      </button>
                      <button 
                        className="action-btn" 
                        title="Review" 
                        onClick={() => openReviewModal(row)}
                        disabled={row.status !== 'Pending' && row.status !== 'Submitted'}
                        style={{ opacity: (row.status !== 'Pending' && row.status !== 'Submitted') ? 0.5 : 1, cursor: (row.status !== 'Pending' && row.status !== 'Submitted') ? 'not-allowed' : 'pointer' }}
                      >
                        <Pencil size={16} />
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
              Showing 1 to 10 of 42 entries
            </div>
            <div className="pagination-controls">
              <div className="page-numbers">
                <button className="page-btn"><ChevronsLeft size={16} /></button>
                <button className="page-btn"><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn">5</button>
                <button className="page-btn"><ChevronRight size={16} /></button>
                <button className="page-btn"><ChevronsRight size={16} /></button>
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

      {isViewModalOpen && (
        <CaseViewModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          caseData={selectedCase}
        />
      )}
      
      {isReviewModalOpen && (
        <CaseReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          caseData={selectedCase}
          onUpdateStatus={handleStatusUpdate}
        />
      )}
    </PreceptorLayout>
  );
};

export default PreceptorCaseList;
