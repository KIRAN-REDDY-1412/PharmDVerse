import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, Search, Filter, Download, Send, Printer } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import '../college/PreceptorManagement.css';
import { MOCK_CASES } from '../../data/mockData';
import ViewRecordModal from '../../components/college/shared/ViewRecordModal';
import ConfirmDeleteModal from '../../components/college/shared/ConfirmDeleteModal';

const StudentCaseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);

  // Use mock data and filter appropriately
  const filteredCases = MOCK_CASES.filter(c => 
    c.status === 'Approved' && 
    (c.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
     c.patientName.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const handleDownload = (c, type) => {
    // Generate a simple text blob for download simulation
    const content = `Clinical Case Library - ${type}\n\nCase ID: ${c.id}\nPatient: ${c.patientName}\nDiagnosis: ${c.diagnosis}\nStatus: ${c.status}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${c.id}_${type.replace(' ', '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <StudentLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <h1 className="page-title">Case Library</h1>
          <div className="breadcrumbs">
            <Link to="/student/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/student/cases" className="breadcrumb-link">Clinical Cases</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Case Library</span>
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
                <th>Approval Date</th>
                <th>Assigned Preceptor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.length > 0 ? (
                filteredCases.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.date || '2023-10-15'}</td>
                    
                    
                    
                    
                    <td>{c.preceptor}</td>
                    <td>
                      <div className="action-buttons">
                        
                        <button className="btn-icon view" title="View" onClick={() => handleView(c)}>
                          <Eye size={18} />
                        </button>
                        <button className="btn-icon view" title="Download Clinical Case PDF" style={{ color: '#10b981' }} onClick={() => handleDownload(c, 'Clinical Case')}>
                          <Download size={18} />
                        </button>
                        <button className="btn-icon view" title="Download SOAP Note PDF" style={{ color: '#0b57d0' }} onClick={() => handleDownload(c, 'SOAP Note')}>
                          <Download size={18} />
                        </button>
                        <button className="btn-icon edit" title="Print" style={{ color: '#4b5563' }} onClick={() => window.print()}>
                          <Printer size={18} />
                        </button>
  
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                    No case library found.
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

export default StudentCaseLibrary;
