import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, Search, Filter, Download, Send, Printer } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import '../college/PreceptorManagement.css';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import ConfirmDeleteModal from '../../components/college/shared/ConfirmDeleteModal';

const StudentSubmittedCases = () => {
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
    (c.status === 'Submitted' || c.status === 'Pending') && 
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
    console.log('Deleted case:', caseToDelete);
    setIsDeleteModalOpen(false);
    setCaseToDelete(null);
  };

  return (
    <StudentLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <h1 className="page-title">Submitted Cases</h1>
          <div className="breadcrumbs">
            <Link to="/student/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/student/cases" className="breadcrumb-link">Clinical Cases</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Submitted Cases</span>
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
                <th>Submission Date</th>
                <th>Patient Name</th>
                <th>Diagnosis</th>
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
                    <td>{c.patientName}</td>
                    <td>{c.diagnosis}</td>
                    <td><span className={`status-badge status-${c.status.toLowerCase()}`}>{c.status}</span></td>
                    
                    
                    <td>
                      <div className="action-buttons">
                        
                        <button className="btn-icon view" title="View" onClick={() => handleView(c)}>
                          <Eye size={18} />
                        </button>
  
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                    No submitted cases found.
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

export default StudentSubmittedCases;
