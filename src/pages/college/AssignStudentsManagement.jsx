import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, UserPlus, Search, ChevronDown, CheckCircle, 
  AlertCircle, ChevronRight, X, UserX, ShieldCheck
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import './AssignStudentsManagement.css';

const AssignStudentsManagement = () => {
  const { users, updateUser } = useDatabase();
  
  // Data
  const allStudents = useMemo(() => users.filter(u => u.role === 'student'), [users]);
  const allPreceptors = useMemo(() => users.filter(u => u.role === 'preceptor'), [users]);
  
  const assignedStudents = useMemo(() => allStudents.filter(s => s.assignedPreceptorId), [allStudents]);
  const unassignedStudents = useMemo(() => allStudents.filter(s => !s.assignedPreceptorId), [allStudents]);
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBatch, setFilterBatch] = useState('All');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [expandedPreceptorId, setExpandedPreceptorId] = useState(null);

  // Derive Unassigned Pool
  const filteredUnassigned = useMemo(() => {
    return unassignedStudents.filter(s => {
      const matchesSearch = !searchQuery || 
        (s.name || s.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.id || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBatch = filterBatch === 'All' || s.batch === filterBatch;
      return matchesSearch && matchesBatch;
    });
  }, [unassignedStudents, searchQuery, filterBatch]);

  // Derive Preceptor Workloads
  const preceptorMatrix = useMemo(() => {
    return allPreceptors.map(p => {
      const assigned = assignedStudents.filter(s => s.assignedPreceptorId === p.id);
      return { ...p, assigned, headcount: assigned.length };
    }).sort((a, b) => a.headcount - b.headcount);
  }, [allPreceptors, assignedStudents]);

  // KPIs
  const highLoadPreceptors = preceptorMatrix.filter(p => p.headcount >= 15).length;
  const uniqueBatches = Array.from(new Set(allStudents.map(s => s.batch).filter(Boolean)));

  // Handlers
  const toggleStudentSelection = (id) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudentIds.length === filteredUnassigned.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(filteredUnassigned.map(s => s.id));
    }
  };

  const handleAssignToPreceptor = (preceptorId) => {
    if (selectedStudentIds.length === 0) return;
    
    // Soft cap check
    const preceptor = preceptorMatrix.find(p => p.id === preceptorId);
    if (preceptor.headcount + selectedStudentIds.length > 15) {
      const confirm = window.confirm(`Warning: Assigning these students will exceed the recommended limit of 15 for ${preceptor.name || preceptor.fullName}. Proceed?`);
      if (!confirm) return;
    }

    selectedStudentIds.forEach(studentId => {
      updateUser(studentId, { assignedPreceptorId: preceptorId });
    });
    setSelectedStudentIds([]);
  };

  const handleRemoveAssignment = (studentId, e) => {
    e.stopPropagation();
    if (window.confirm('Remove this student from the preceptor?')) {
      updateUser(studentId, { assignedPreceptorId: '' });
    }
  };

  // Helper for progress bar
  const getWorkloadStatus = (count) => {
    if (count >= 15) return 'danger';
    if (count >= 10) return 'warning';
    return 'safe';
  };

  return (
    <CollegeAdminLayout>
      <div className="list-page-container">
        
        {/* Header */}
        <div className="list-page-header">
          <div className="header-left">
            <h1 className="page-title">Assignment Dashboard</h1>
            <div className="breadcrumbs">
              <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
              <span className="breadcrumb-separator">&gt;</span>
              <span>Student-Preceptor Assignment</span>
            </div>
          </div>
          <div className="header-right">
            <Link to="/college-admin/assign-students/list" className="btn-secondary">
              <Users size={18} /> View All Assignments
            </Link>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="quick-stats-grid" style={{ marginTop: '1rem' }}>
          <div className="stat-card">
            <div className="stat-icon active"><ShieldCheck size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{assignedStudents.length}</span>
              <span className="stat-label">Students Assigned</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon inactive"><UserX size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{unassignedStudents.length}</span>
              <span className="stat-label">Unassigned Students</span>
            </div>
          </div>
          <div className="stat-card" style={{ borderColor: highLoadPreceptors > 0 ? 'var(--color-warning)' : 'transparent' }}>
            <div className="stat-icon warning"><AlertCircle size={24} /></div>
            <div className="stat-details">
              <span className="stat-value">{highLoadPreceptors}</span>
              <span className="stat-label">High-Load Preceptors (&gt;15)</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="assignment-dashboard-grid">
          
          {/* Left Pane: Unassigned Pool */}
          <div className="pane-container">
            <div className="pane-header">
              <div className="pane-title">
                Unassigned Pool 
                <span className="pane-badge">{filteredUnassigned.length}</span>
              </div>
            </div>
            
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
              <div className="search-box" style={{ width: '100%', marginBottom: '0.75rem' }}>
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search students..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="select-wrapper" style={{ width: '100%' }}>
                <select value={filterBatch} onChange={(e) => setFilterBatch(e.target.value)}>
                  <option value="All">All Batches</option>
                  {uniqueBatches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>

            <div className="pane-content">
              {filteredUnassigned.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                  <p>All students in this view are assigned!</p>
                </div>
              ) : (
                filteredUnassigned.map(s => (
                  <div 
                    key={s.id} 
                    className={`student-pool-item ${selectedStudentIds.includes(s.id) ? 'selected' : ''}`}
                    onClick={() => toggleStudentSelection(s.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedStudentIds.includes(s.id)} 
                        readOnly
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <div className="student-info">
                        <span className="student-name">{s.name || s.fullName}</span>
                        <span className="student-meta">{s.id} • {s.batch} • {s.year}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {filteredUnassigned.length > 0 && (
              <div className="pane-footer">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedStudentIds.length === filteredUnassigned.length && filteredUnassigned.length > 0} 
                    onChange={handleSelectAll}
                  /> Select All
                </label>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{selectedStudentIds.length} Selected</span>
              </div>
            )}
          </div>

          {/* Right Pane: Preceptor Matrix */}
          <div className="pane-container">
            <div className="pane-header">
              <div className="pane-title">Preceptor Matrix</div>
              {selectedStudentIds.length > 0 && (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, animation: 'fadeIn 0.3s ease' }}>
                  Select a preceptor below to assign {selectedStudentIds.length} student(s)
                </div>
              )}
            </div>

            <div className="pane-content" style={{ background: 'var(--bg-surface-alt)' }}>
              {preceptorMatrix.map(p => {
                const status = getWorkloadStatus(p.headcount);
                const isExpanded = expandedPreceptorId === p.id;
                const fillWidth = Math.min(100, (p.headcount / 20) * 100); // Visual max 20

                return (
                  <div key={p.id} className={`preceptor-matrix-card ${isExpanded ? 'expanded' : ''}`}>
                    <div className="preceptor-card-header" onClick={() => setExpandedPreceptorId(isExpanded ? null : p.id)}>
                      <div className="preceptor-card-left">
                        <ChevronRight size={18} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{p.name || p.fullName}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.department || p.dept} • {p.designation}</div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        {selectedStudentIds.length > 0 && (
                          <button 
                            className="btn-primary" 
                            style={{ padding: '0.3rem 0.75rem', fontSize: '0.85rem' }}
                            onClick={(e) => { e.stopPropagation(); handleAssignToPreceptor(p.id); }}
                          >
                            <UserPlus size={14} /> Assign Here
                          </button>
                        )}
                        <div className="workload-indicator">
                          <span className={`workload-text ${status}`}>{p.headcount} Students</span>
                          <div className="workload-bar-bg">
                            <div className={`workload-bar-fill ${status}`} style={{ width: `${fillWidth}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="assigned-students-list">
                        {p.assigned.length === 0 ? (
                          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', padding: '0.5rem' }}>No students assigned currently.</div>
                        ) : (
                          p.assigned.map(s => (
                            <div key={s.id} className="assigned-student-chip">
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 600 }}>{s.name || s.fullName}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.id}</span>
                              </div>
                              <button className="remove-btn" title="Remove Assignment" onClick={(e) => handleRemoveAssignment(s.id, e)}>
                                <X size={16} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </CollegeAdminLayout>
  );
};

export default AssignStudentsManagement;
