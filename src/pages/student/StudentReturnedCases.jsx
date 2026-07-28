import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Search, Filter, Download, Send } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import '../college/PreceptorManagement.css';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import ConfirmDeleteModal from '../../components/college/shared/ConfirmDeleteModal';

const StudentReturnedCases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);

  const { getStudentCases } = useDatabase();
  const { currentUser } = useAuth();
  
  const studentCases = currentUser ? getStudentCases(currentUser.id) : [];

  // Use dynamic data and filter appropriately
  const filteredCases = studentCases.filter(c => 
    c.status === 'Returned' && 
    (c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
     (c.patientName && c.patientName.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleView = (c) => {
    setSelectedCase(c);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (c) => {
    setCaseToDelete(c);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    setCaseToDelete(null);
  };

  return (
    <StudentLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <h1 className="page-title">Returned Cases</h1>
          <div className="breadcrumbs">
            <Link to="/student/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/student/cases" className="breadcrumb-link">Clinical Cases</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Returned Cases</span>
          </div>
        </div>

        <div className="list-toolbar">
          <div className="toolbar-left">
            <div className="search-box">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search by Case ID or Patient..." 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button className="btn-filter" style={{ marginLeft: '1rem' }}>
              <Filter size={16} /> Filter
            </button>
          </div>
          <button className="btn-export">
            <Download size={16} /> Export
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Returned Date</th>
                <th>Comments</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.length > 0 ? (
                filteredCases.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.date || '2023-10-15'}</td>
                    <td><span className={`status-badge status-${c.status.toLowerCase()}`}>{c.status}</span></td>
                    <td>{c.remarks || 'Needs revision in subjective data.'}</td>
                    
                    <td>
                      <div className="action-buttons">
                        
                        <button className="btn-icon view" title="View" onClick={() => handleView(c)}>
                          <Eye size={18} />
                        </button>
                        <button className="btn-icon edit" title="Edit">
                          <Pencil size={18} />
                        </button>
                        <button className="btn-icon view" title="Resubmit" style={{ color: '#0b57d0' }}>
                          <Send size={18} />
                        </button>
  
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                    No returned cases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ViewRecordModal 
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Clinical Case Details"
          data={selectedCase}
        />
        
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          itemName="draft case"
        />
      </div>
    </StudentLayout>
  );
};

export default StudentReturnedCases;
