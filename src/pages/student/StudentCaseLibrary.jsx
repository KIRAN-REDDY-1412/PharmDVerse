import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, Search, Download, Send, Printer } from 'lucide-react';
import StudentLayout from '../../components/student/StudentLayout';
import '../college/PreceptorManagement.css';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';

const getStatusClass = (status) => {
  switch (status) {
    case 'Approved': return 'status-active';
    case 'Under Review':
    case 'Submitted': return 'status-pending';
    case 'Returned': return 'status-returned';
    case 'Draft': return 'status-inactive';
    default: return 'status-inactive';
  }
};

const getFormsSubmittedText = (status) => {
  if (status === 'Approved' || status === 'Under Review' || status === 'Submitted') return '5/5 Forms';
  if (status === 'Returned') return '4/5 Forms';
  return '1/5 Forms';
};

const formatSubmissionDate = (dateVal) => {
  if (!dateVal) return 'Not Available';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return 'Not Available';
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const StudentCaseLibrary = () => {
  const { currentUser } = useAuth();
  const { cases } = useDatabase();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Normalize mock case statuses to match requirements
  const studentCases = cases.map(c => {
    let normalizedStatus = c.status;
    if (normalizedStatus === 'Pending') normalizedStatus = 'Under Review';
    return { ...c, status: normalizedStatus };
  }).filter(c => c.studentId === currentUser?.id || true); // Mock fallback

  const casesToDisplay = studentCases.filter(c => {
    const searchLower = searchTerm.toLowerCase();
    return c.id.toLowerCase().includes(searchLower) || (c.diagnosis && c.diagnosis.toLowerCase().includes(searchLower));
  });

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleView = (c) => navigate(`/student/cases/view/${c.id}`);
  const handleEdit = (c) => navigate(`/student/cases/edit/${c.id}`);
  
  const handleDelete = (c) => {
    if(window.confirm(`Are you sure you want to delete Case ID: ${c.id}?`)) {
      alert('Case deleted successfully (Mock).');
    }
  };

  const handleResubmit = (c) => {
    alert(`Resubmitting Case ID: ${c.id} to preceptor...`);
  };

  const handleDownload = (c) => {
    alert(`Downloading PDF for Case ID: ${c.id}...`);
  };

  const handlePrint = (c) => {
    window.print();
  };

  return (
    <StudentLayout>
      <div className="preceptor-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Case Library</h1>
            <div className="breadcrumbs">
              <Link to="/student/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Case Library</span>
            </div>
          </div>
        </div>

        <div className="list-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="search-box" style={{ flex: 1, maxWidth: '400px' }}>
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search by Case ID or Diagnosis..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Case Title (Final Diagnosis)</th>
                <th>Submission Date</th>
                <th>Current Status</th>
                <th>Forms Submitted</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {casesToDisplay.length > 0 ? (
                casesToDisplay.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <button onClick={() => handleView(c)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-primary)', fontWeight: 600 }}>
                        {c.id}
                      </button>
                    </td>
                    <td>{c.diagnosis || 'Untitled Case'}</td>
                    <td>{formatSubmissionDate(c.submittedDate || c.date)}</td>
                    <td>
                      <span className={`status-pill ${getStatusClass(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                        {getFormsSubmittedText(c.status)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                        
                        {c.status === 'Draft' && (
                          <>
                            <button className="btn-icon view" title="View" onClick={() => handleView(c)}>
                              <Eye size={18} />
                            </button>
                            <button className="btn-icon edit" title="Edit" onClick={() => handleEdit(c)}>
                              <Pencil size={18} />
                            </button>
                            <button className="btn-icon delete" title="Delete" onClick={() => handleDelete(c)}>
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}

                        {(c.status === 'Submitted' || c.status === 'Under Review') && (
                          <button className="btn-icon view" title="View" onClick={() => handleView(c)}>
                            <Eye size={18} />
                          </button>
                        )}

                        {c.status === 'Returned' && (
                          <>
                            <button className="btn-icon view" title="View" onClick={() => handleView(c)}>
                              <Eye size={18} />
                            </button>
                            <button className="btn-icon edit" title="Edit" onClick={() => handleEdit(c)}>
                              <Pencil size={18} />
                            </button>
                            <button className="btn-icon view" style={{ color: '#0b57d0' }} title="Resubmit" onClick={() => handleResubmit(c)}>
                              <Send size={18} />
                            </button>
                          </>
                        )}

                        {c.status === 'Approved' && (
                          <>
                            <button className="btn-icon view" title="View" onClick={() => handleView(c)}>
                              <Eye size={18} />
                            </button>
                            <button className="btn-icon view" style={{ color: '#166534' }} title="Download PDF" onClick={() => handleDownload(c)}>
                              <Download size={18} />
                            </button>
                            <button className="btn-icon view" style={{ color: '#4b5563' }} title="Print" onClick={() => handlePrint(c)}>
                              <Printer size={18} />
                            </button>
                          </>
                        )}

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No clinical cases found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentCaseLibrary;
