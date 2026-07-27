import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Save, Plus, ArrowRightLeft, Clock, Search, AlertTriangle, ArrowUpCircle, ArrowDownCircle, RotateCcw } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import './AcademicYearManagement.css';

const AcademicYearManagement = () => {
  const { 
    academicYears, 
    promotionLogs, 
    users, 
    snapshot,
    activateAcademicYear, 
    addAcademicYear, 
    manualPromoteStudent, 
    manualDepromoteStudent, 
    rollbackLastMassPromotion,
    COURSE_YEARS
  } = useDatabase();

  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for Activating Year with Auto Promote
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [selectedYearToActivate, setSelectedYearToActivate] = useState(null);
  const [autoPromote, setAutoPromote] = useState(true);

  // Filter students for Manual Promotion Tab
  const activeStudents = users.filter(u => u.role === 'student' && u.status === 'Active');
  const filteredStudents = activeStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActiveAcademicYear = () => academicYears.find(ay => ay.status === 'Active') || academicYears[0];
  const activeYear = getActiveAcademicYear();

  const handleAddYear = () => {
    const newName = window.prompt("Enter new Academic Year (e.g., 2027-2028):");
    if (newName && newName.trim() !== '') {
      const yearStr = newName.trim();
      try {
        addAcademicYear({
          id: `AY${Date.now()}`,
          name: yearStr,
          startDate: `${yearStr.split('-')[0]}-07-01`,
          endDate: `${yearStr.split('-')[1]}-06-30`,
          status: 'Upcoming'
        });
        alert('Academic Year added successfully.');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const openActivateModal = (year) => {
    setSelectedYearToActivate(year);
    setAutoPromote(true);
    setShowActivateModal(true);
  };

  const confirmActivation = () => {
    activateAcademicYear(selectedYearToActivate.id, autoPromote);
    setShowActivateModal(false);
    setSelectedYearToActivate(null);
    alert('Academic Year activated successfully.' + (autoPromote ? ' Students have been auto-promoted.' : ''));
  };

  const handleManualPromote = (studentId) => {
    if (window.confirm('Are you sure you want to promote this student to the next year?')) {
      manualPromoteStudent(studentId, activeYear.name, activeYear.name); // Using current active year
      alert('Student promoted.');
    }
  };

  const handleManualDepromote = (studentId) => {
    if (window.confirm('Are you sure you want to de-promote this student to the previous year?')) {
      manualDepromoteStudent(studentId, activeYear.name, activeYear.name);
      alert('Student de-promoted.');
    }
  };

  const handleRollback = () => {
    if (window.confirm('WARNING: This will undo the last mass promotion. Are you sure you want to rollback?')) {
      try {
        rollbackLastMassPromotion();
        alert('Rollback successful.');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <CollegeAdminLayout>
      <div className="academic-management-container">
        
        <div className="page-header">
          <h1 className="page-title">Academic Progression Management</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Academic Progression</span>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Current Academic Year</div>
            <div className="stat-value">{activeYear?.name || 'None'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Active Students</div>
            <div className="stat-value">{activeStudents.length}</div>
          </div>
        </div>

        <div className="tabs-container">
          <button className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <Calendar size={18} /> Academic Years
          </button>
          <button className={`tab-button ${activeTab === 'manual' ? 'active' : ''}`} onClick={() => setActiveTab('manual')}>
            <ArrowRightLeft size={18} /> Manual Progression
          </button>
          <button className={`tab-button ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
            <Clock size={18} /> Promotion History
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="settings-card">
              <div className="card-header flex-between">
                <h2>Manage Academic Years</h2>
                <button className="btn-save" onClick={handleAddYear}>
                  <Plus size={16} /> Add Year
                </button>
              </div>
              
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Academic Year</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {academicYears.map(year => (
                    <tr key={year.id}>
                      <td style={{ fontWeight: '600' }}>{year.name}</td>
                      <td>{year.startDate}</td>
                      <td>{year.endDate}</td>
                      <td>
                        <span className={`status-pill ${year.status.toLowerCase()}`}>
                          {year.status}
                        </span>
                      </td>
                      <td>
                        {year.status !== 'Active' && (
                          <button 
                            className="btn-action activate-btn" 
                            onClick={() => openActivateModal(year)}
                          >
                            Activate Year
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="settings-card">
              <div className="card-header">
                <h2>Manual Promotion Controls</h2>
                <div className="search-bar">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Current Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.course}</td>
                      <td><span className="year-badge">{student.year}</span></td>
                      <td>
                        <div className="action-buttons-group">
                          <button 
                            className="btn-icon promote" 
                            title="Promote to Next Year"
                            onClick={() => handleManualPromote(student.id)}
                          >
                            <ArrowUpCircle size={20} />
                          </button>
                          <button 
                            className="btn-icon depromote" 
                            title="De-promote to Previous Year"
                            onClick={() => handleManualDepromote(student.id)}
                          >
                            <ArrowDownCircle size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="settings-card">
              <div className="card-header flex-between">
                <h2>Promotion History Log</h2>
                {snapshot && (
                  <button className="btn-danger flex-align" onClick={handleRollback}>
                    <RotateCcw size={16} style={{ marginRight: '8px' }} /> Rollback Last Mass Promotion
                  </button>
                )}
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student Name (ID)</th>
                    <th>Type</th>
                    <th>Progression</th>
                    <th>Academic Year</th>
                    <th>Performed By</th>
                  </tr>
                </thead>
                <tbody>
                  {promotionLogs.length > 0 ? (
                    promotionLogs.map(log => (
                      <tr key={log.id}>
                        <td>{new Date(log.date).toLocaleString()}</td>
                        <td>{log.studentName} ({log.studentId})</td>
                        <td><span className={`log-type ${log.type.toLowerCase().replace(' ', '-')}`}>{log.type}</span></td>
                        <td>
                          {log.previousYear} <ArrowRightLeft size={14} style={{ verticalAlign: 'middle', margin: '0 4px', color: 'var(--text-secondary)' }} /> {log.newYear}
                        </td>
                        <td>{log.newAcademicYear}</td>
                        <td>{log.performedBy}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                        No promotion logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Activation Modal */}
        {showActivateModal && (
          <div className="modal-overlay">
            <div className="activate-modal-content">
              <h2>Activate Academic Year: {selectedYearToActivate?.name}</h2>
              
              <div className="alert-box warning">
                <AlertTriangle size={24} />
                <div className="alert-text">
                  <strong>Warning!</strong>
                  <p>Activating a new academic year will close the current active year ({activeYear?.name}).</p>
                </div>
              </div>

              <div className="auto-promote-section">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={autoPromote} 
                    onChange={(e) => setAutoPromote(e.target.checked)}
                  />
                  Automatically Promote Eligible Students
                </label>
                <p className="help-text">
                  If selected, all active students will be automatically progressed to their next year (e.g., I Year → II Year). Inactive or Detained students will be ignored.
                </p>
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowActivateModal(false)}>Cancel</button>
                <button className="btn-save" onClick={confirmActivation}>Confirm Activation</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </CollegeAdminLayout>
  );
};

export default AcademicYearManagement;
