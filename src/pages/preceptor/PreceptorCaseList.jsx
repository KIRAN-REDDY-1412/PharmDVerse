import React, { useState, useMemo } from 'react';
import { useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom';
import { 
  Search, Filter, Download, Eye,
  ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ChevronDown
} from 'lucide-react';
import PreceptorLayout from '../../components/preceptor/PreceptorLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import '../college/PreceptorList.css';

const getStatusClass = (status) => {
  switch (status) {
    case 'Approved': return 'status-active';
    case 'Under Review': return 'status-pending';
    case 'Submitted': return 'status-pending';
    case 'Returned': return 'status-returned';
    default: return '';
  }
};

const getOverallProgress = (forms) => {
  if (!forms) return 0;
  
  const formKeys = ['patientProfile', 'patientCounselling', 'drugInformation', 'pharmacistIntervention', 'adr'];
  let completed = 0;
  
  formKeys.forEach((key) => {
    const status = forms[key]?.status;
    if (status === 'Submitted' || status === 'Under Review' || status === 'Approved' || status === 'Returned') {
      completed++;
    }
  });

  return Math.round((completed / 5) * 100);
};

const getPatientData = (forms) => {
  if (!forms || !forms.patientProfile || !forms.patientProfile.data) {
    return { patientName: 'N/A', department: 'N/A', diagnosis: 'N/A' };
  }
  const data = forms.patientProfile.data;
  return {
    patientName: data.patientName || data.name || data.patientInitials || 'N/A',
    department: data.department || data.ward || 'N/A',
    diagnosis: data.finalDiagnosis || data.diagnosis || 'N/A'
  };
};

const PreceptorCaseList = () => {
  const { getPreceptorAssignedCases, users } = useDatabase();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  const initialSearch = location.state?.filterStudent || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  
  const statusParam = searchParams.get('status');
  
  let pageTitle = 'Clinical Cases';
  let initialStatus = 'All';
  if (statusParam === 'pending' || statusParam === 'under review' || statusParam === 'under-review') {
    initialStatus = 'Under Review';
  } else if (statusParam === 'approved') {
    initialStatus = 'Approved';
  } else if (statusParam === 'returned') {
    initialStatus = 'Returned';
  } else if (statusParam === 'submitted') {
    initialStatus = 'Submitted';
  }

  const [filterStatus, setFilterStatus] = useState(initialStatus);
  const [filterYear, setFilterYear] = useState('All');
  const [filterBatch, setFilterBatch] = useState('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: 'submittedDate', direction: 'desc' });

  // Get base cases
  let cases = currentUser ? getPreceptorAssignedCases(currentUser.id) : [];

  // Data Enrichment
  const enrichedCases = useMemo(() => {
    return cases.map(c => {
      // Find the associated student to get Year and Batch
      const student = users.find(u => u.id === c.rollNo) || {};
      
      const pData = getPatientData(c.forms);
      
      // Determine effective status (map Pending to Under Review if needed)
      let effectiveStatus = c.status;
      if (effectiveStatus === 'Pending') effectiveStatus = 'Under Review';
      if (effectiveStatus === 'Draft') return null; // Exclude drafts

      const progress = getOverallProgress(c.forms);
      const submittedDateStr = c.submittedDate || c.date;
      const lastUpdatedStr = c.lastUpdated || c.submittedDate || c.date;

      return {
        ...c,
        studentName: c.studentName || student.name || student.fullName || 'Unknown Student',
        studentYear: student.year || 'N/A',
        studentBatch: student.batch || 'N/A',
        patientNameStr: pData.patientName,
        finalDiagnosisStr: c.diagnosis || pData.diagnosis || 'N/A',
        departmentStr: pData.department,
        effectiveStatus,
        progress,
        submittedDateObj: submittedDateStr ? new Date(submittedDateStr) : new Date(0),
        lastUpdatedObj: lastUpdatedStr ? new Date(lastUpdatedStr) : new Date(0),
      };
    }).filter(Boolean); // Remove nulls (drafts)
  }, [cases, users]);

  // Filtering
  const filteredCases = useMemo(() => {
    return enrichedCases.filter(c => {
      // Search
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        (c.id || '').toLowerCase().includes(searchLower) ||
        (c.rollNo || '').toLowerCase().includes(searchLower) ||
        (c.studentName || '').toLowerCase().includes(searchLower) ||
        (c.patientNameStr || '').toLowerCase().includes(searchLower) ||
        (c.finalDiagnosisStr || '').toLowerCase().includes(searchLower);

      // Status
      const matchesStatus = filterStatus === 'All' || c.effectiveStatus === filterStatus;
      
      // Year
      const matchesYear = filterYear === 'All' || c.studentYear === filterYear;
      
      // Batch
      const matchesBatch = filterBatch === 'All' || c.studentBatch === filterBatch;

      return matchesSearch && matchesStatus && matchesYear && matchesBatch;
    });
  }, [enrichedCases, searchQuery, filterStatus, filterYear, filterBatch]);

  // Sorting
  const sortedCases = useMemo(() => {
    let sortableItems = [...filteredCases];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === 'submittedDate' || sortConfig.key === 'lastUpdated') {
          aVal = sortConfig.key === 'submittedDate' ? a.submittedDateObj : a.lastUpdatedObj;
          bVal = sortConfig.key === 'submittedDate' ? b.submittedDateObj : b.lastUpdatedObj;
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredCases, sortConfig]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedCases.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * rowsPerPage;
  const paginatedCases = sortedCases.slice(startIdx, startIdx + rowsPerPage);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const openReviewWorkspace = (record) => {
    navigate(`/preceptor/cases/view/${record.id}?mode=review`);
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

  return (
    <PreceptorLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">{pageTitle}</h1>
            <div className="breadcrumbs">
              <Link to="/preceptor/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Clinical Cases</span>
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
                placeholder="Search ID, Student, Roll No, Patient..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{ width: '250px' }}
              />
            </div>
            
            <div className="filter-group">
              <span className="filter-label">Status</span>
              <div className="select-wrapper">
                <select 
                  value={filterStatus} 
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All</option>
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
                <select value={filterYear} onChange={(e) => { setFilterYear(e.target.value); setCurrentPage(1); }}>
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
                <th onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>Case ID <span className="sort-icon">{getSortIcon('id')}</span></th>
                <th onClick={() => requestSort('studentName')} style={{ cursor: 'pointer' }}>Student Name <span className="sort-icon">{getSortIcon('studentName')}</span></th>
                <th>Roll Number</th>
                <th>Patient Name</th>
                <th>Final Diagnosis</th>
                <th>Department / Ward</th>
                <th onClick={() => requestSort('submittedDate')} style={{ cursor: 'pointer' }}>Date of Submission <span className="sort-icon">{getSortIcon('submittedDate')}</span></th>
                <th onClick={() => requestSort('lastUpdated')} style={{ cursor: 'pointer' }}>Last Updated <span className="sort-icon">{getSortIcon('lastUpdated')}</span></th>
                <th onClick={() => requestSort('effectiveStatus')} style={{ cursor: 'pointer' }}>Current Status <span className="sort-icon">{getSortIcon('effectiveStatus')}</span></th>
                <th>Overall Progress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCases.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No clinical cases found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedCases.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 600 }}>{row.id}</td>
                    <td>{row.studentName}</td>
                    <td>{row.rollNo || '-'}</td>
                    <td>{row.patientNameStr}</td>
                    <td>{row.finalDiagnosisStr}</td>
                    <td>{row.departmentStr}</td>
                    <td>{row.submittedDateObj.getTime() > 0 ? row.submittedDateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                    <td>{row.lastUpdatedObj.getTime() > 0 ? row.lastUpdatedObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                    <td>
                      <span className={`status-pill ${getStatusClass(row.effectiveStatus)}`}>
                        {row.effectiveStatus}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${row.progress}%`, height: '100%', backgroundColor: row.progress === 100 ? 'var(--color-green)' : 'var(--color-primary)' }}></div>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{row.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn" 
                          title="Open Case Workspace" 
                          onClick={() => openReviewWorkspace(row)}
                          style={{ color: 'var(--color-primary)', backgroundColor: 'rgba(15, 76, 129, 0.1)' }}
                        >
                          <Eye size={16} /> <span style={{ marginLeft: '4px', fontSize: '0.8rem', fontWeight: 600 }}>Open Case</span>
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
              Showing {filteredCases.length === 0 ? 0 : startIdx + 1} to {Math.min(startIdx + rowsPerPage, filteredCases.length)} of {filteredCases.length} entries
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
    </PreceptorLayout>
  );
};

export default PreceptorCaseList;
