import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Search, Filter, Download, Eye, Printer,
  ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ChevronDown,
  ListFilter, Settings, Maximize, Minimize, ClipboardList
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import './PreceptorList.css';



const getStatusClass = (status) => {
  switch (status) {
    case 'Approved': return 'status-active';
    case 'Pending': return 'status-pending';
    case 'Returned': return 'status-returned';
    default: return '';
  }
};

const ClinicalCaseList = () => {
  const { cases, users } = useDatabase();
  const location = useLocation();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState(location.state?.filterStatus || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  // Enterprise Upgrades State
  const [density, setDensity] = useState('comfortable'); // 'comfortable' | 'compact'
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnChooser, setShowColumnChooser] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    caseId: true,
    rollNo: true,
    studentName: true,
    preceptor: true,
    date: true,
    status: true
  });

  const filteredCases = cases.map(c => {
    const student = users?.find(u => u.id === c.studentId || u.rollNo === c.rollNo);
    const preceptor = users?.find(u => u.id === c.preceptorId);
    return {
      ...c,
      computedStudentName: student ? student.name : 'Unknown',
      computedPreceptorName: preceptor ? preceptor.name : 'Unassigned',
      displayDate: c.submittedDate || c.date || null
    };
  }).filter(c => {
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesSearch = !searchQuery || 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.computedStudentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.computedPreceptorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleDownloadPDF = (id) => {
    alert(`Downloading PDF for Case ID: ${id}...`);
  };

  const openViewModal = (record) => {
    navigate(`/college-admin/cases/view/${record.id}`);
  };

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Case List</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <Link to="/college-admin/cases" className="breadcrumb-link">Clinical Cases</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Case List</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="list-toolbar">
          <div className="toolbar-left" style={{ flexWrap: 'wrap' }}>
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by case ID, student, or preceptor..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
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

          <button className="btn-export">
            <Download size={16} /> Export
          </button>
        </div>

        {/* Advanced Filters Tray */}
        {showAdvancedFilters && (
          <div className="advanced-filters-tray">
            <div className="filter-group">
              <label>Status</label>
              <div className="select-wrapper">
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Returned">Returned</option>
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <label>Submission Date</label>
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
          </div>
        )}

        {/* Data Table */}
        <div className="table-container">
          <table className={`data-table ${density === 'compact' ? 'table-density-compact' : ''}`}>
            <thead>
              <tr>
                {visibleColumns.caseId && <th>Case ID <span className="sort-icon">↕</span></th>}
                {visibleColumns.rollNo && <th>Student Roll No.</th>}
                {visibleColumns.studentName && <th>Student Name</th>}
                {visibleColumns.preceptor && <th>Assigned Preceptor</th>}
                {visibleColumns.date && <th>Submission Date</th>}
                {visibleColumns.status && <th>Current Status</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '0' }}>
                    <div className="enterprise-empty-state">
                      <div className="icon-wrapper"><ClipboardList size={32} /></div>
                      <h3>No Clinical Cases Found</h3>
                      <p>There are no clinical cases matching your current search or filter criteria.</p>
                      <button className="btn-bulk" onClick={() => { setSearchQuery(''); setFilterStatus('All'); }}><Filter size={16} /> Clear Filters</button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCases.map((row) => (
                  <tr key={row.id}>
                    {visibleColumns.caseId && <td><span className="id-link" onClick={() => openViewModal(row)} style={{ cursor: 'pointer', color: 'var(--color-primary)' }}>{row.id}</span></td>}
                    {visibleColumns.rollNo && <td>{row.rollNo}</td>}
                    {visibleColumns.studentName && <td>{row.computedStudentName}</td>}
                    {visibleColumns.preceptor && <td>{row.computedPreceptorName}</td>}
                    {visibleColumns.date && <td>{row.displayDate ? new Date(row.displayDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</td>}
                    {visibleColumns.status && <td>
                      <span className={`status-pill ${getStatusClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>}
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn" title="View" onClick={() => openViewModal(row)} style={{ color: 'var(--color-primary)' }}>
                          <Eye size={16} />
                        </button>
                        <button className="action-btn" title="Download PDF" onClick={() => handleDownloadPDF(row.id)} style={{ color: '#166534' }}>
                          <Printer size={16} />
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

    </CollegeAdminLayout>
  );
};

export default ClinicalCaseList;
