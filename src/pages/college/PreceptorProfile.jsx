import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Phone, Edit, Trash2, 
  ShieldAlert, CheckCircle, Activity, FileText, 
  Users, Clock3, BadgeCheck, RotateCcw, Download, Eye
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import AddPreceptorModal from '../../components/college/preceptor/AddPreceptorModal';
import { useDatabase } from '../../context/DatabaseContext';
import './PreceptorProfile.css';

const PreceptorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, cases, updateUser } = useDatabase();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const preceptor = users.find(u => u.id === id && u.role === 'preceptor');

  if (!preceptor) {
    return (
      <CollegeAdminLayout>
        <div className="profile-page-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <ShieldAlert size={48} style={{ color: 'var(--color-danger)', marginBottom: '1rem' }} />
          <h2>Preceptor Not Found</h2>
          <p>The preceptor ID {id} does not exist in the system.</p>
          <button className="btn-primary" onClick={() => navigate('/college-admin/preceptors/list')}>
            <ArrowLeft size={16} /> Back to Preceptors
          </button>
        </div>
      </CollegeAdminLayout>
    );
  }

  // Derived Data
  const assignedStudents = users.filter(u => u.role === 'student' && u.assignedPreceptorId === preceptor.id);
  const preceptorCases = cases.filter(c => c.preceptorId === preceptor.id || c.preceptor === (preceptor.name || preceptor.fullName));
  
  const approvedCases = preceptorCases.filter(c => c.status === 'Approved').length;
  const pendingCases = preceptorCases.filter(c => c.status === 'Pending' || c.status === 'Submitted' || c.status === 'Under Review').length;
  const returnedCases = preceptorCases.filter(c => c.status === 'Returned').length;

  const handleDeactivate = () => {
    if (preceptor.status === 'Inactive') {
      updateUser(preceptor.id, { status: 'Active' });
      return;
    }

    if (assignedStudents.length > 0) {
      alert(`Cannot deactivate preceptor. There are ${assignedStudents.length} student(s) currently assigned. Please reassign them first.`);
    } else {
      updateUser(preceptor.id, { status: 'Inactive' });
    }
  };

  const getStudentCaseStatus = (studentId) => {
    const studentCases = cases.filter(c => c.studentId === studentId || c.student === studentId);
    if (studentCases.length === 0) return 'No Cases';
    const hasPending = studentCases.some(c => ['Pending', 'Submitted', 'Under Review'].includes(c.status));
    if (hasPending) return 'Pending Review';
    const hasReturned = studentCases.some(c => c.status === 'Returned');
    if (hasReturned) return 'Needs Update';
    return 'Up to Date';
  };

  return (
    <CollegeAdminLayout>
      <div className="profile-page-container">
        
        {/* Breadcrumb & Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="breadcrumbs" style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            <Link to="/college-admin/dashboard" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Dashboard</Link>
            <span>&gt;</span>
            <Link to="/college-admin/preceptors/list" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Preceptor Management</Link>
            <span>&gt;</span>
            <span>Preceptor Profile</span>
          </div>
          <button 
            className="btn-bulk" 
            onClick={() => navigate('/college-admin/preceptors/list')}
            style={{ display: 'inline-flex', padding: '0.4rem 0.75rem' }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {/* Profile Header */}
        <div className="profile-header-card">
          <div className="profile-header-left">
            {preceptor.profilePhoto ? (
              <img src={preceptor.profilePhoto} alt="Profile" className="profile-avatar-large" />
            ) : (
              <div className="profile-avatar-large"><User size={48} /></div>
            )}
            <div className="profile-header-info">
              <h1>{preceptor.name || preceptor.fullName}</h1>
              <div className="profile-badges">
                <span className="profile-badge"><BadgeCheck size={14} /> {preceptor.id}</span>
                <span className="profile-badge"><User size={14} /> {preceptor.designation}</span>
                <span className="profile-badge"><Activity size={14} /> {preceptor.qualification}</span>
                <span className="profile-badge" style={{ backgroundColor: 'rgba(15, 76, 129, 0.1)', color: 'var(--color-primary)' }}>
                  {preceptor.department || preceptor.dept}
                </span>
                <span className={`status-pill ${preceptor.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                  {preceptor.status}
                </span>
              </div>
            </div>
          </div>
          <div className="profile-header-actions">
            <button className="btn-bulk" onClick={() => setIsEditModalOpen(true)}>
              <Edit size={16} /> Edit Profile
            </button>
            <button 
              className="btn-bulk" 
              onClick={handleDeactivate}
              style={{ color: preceptor.status === 'Active' ? 'var(--color-danger)' : 'var(--color-success)', borderColor: preceptor.status === 'Active' ? 'var(--color-danger)' : 'var(--color-success)' }}
            >
              {preceptor.status === 'Active' ? <><Trash2 size={16} /> Deactivate</> : <><CheckCircle size={16} /> Activate</>}
            </button>
            <button className="btn-bulk" onClick={() => window.print()}>
              <Download size={16} /> Export Profile
            </button>
          </div>
        </div>

        {/* Global Summary Statistics */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon" style={{ background: 'rgba(15,76,129,0.1)', color: 'var(--color-primary)' }}><Users size={24} /></div>
            <div className="kpi-details">
              <h4>{assignedStudents.length}</h4>
              <p>Assigned Students</p>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon" style={{ background: 'rgba(15,76,129,0.1)', color: 'var(--color-primary)' }}><FileText size={24} /></div>
            <div className="kpi-details">
              <h4>{preceptorCases.length}</h4>
              <p>Clinical Cases</p>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon" style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--color-warning)' }}><Clock3 size={24} /></div>
            <div className="kpi-details">
              <h4>{pendingCases}</h4>
              <p>Under Review</p>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--color-success)' }}><CheckCircle size={24} /></div>
            <div className="kpi-details">
              <h4>{approvedCases}</h4>
              <p>Approved</p>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--color-danger)' }}><RotateCcw size={24} /></div>
            <div className="kpi-details">
              <h4>{returnedCases}</h4>
              <p>Returned</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs-container">
          <button className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            Profile
          </button>
          <button className={`profile-tab ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}>
            Assignments
          </button>
          <button className={`profile-tab ${activeTab === 'cases' ? 'active' : ''}`} onClick={() => setActiveTab('cases')}>
            Clinical Cases
          </button>
          <button className={`profile-tab ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
            Activity Log
          </button>
        </div>

        {/* Tab Content: Profile */}
        {activeTab === 'profile' && (
          <div className="tab-content-grid">
            <div className="info-card">
              <div className="info-card-header"><User size={18} /> Personal Information</div>
              <div className="info-row"><span className="info-label">Full Name</span><span className="info-value">{preceptor.name || preceptor.fullName || '-'}</span></div>
              <div className="info-row"><span className="info-label">Gender</span><span className="info-value">{preceptor.gender || '-'}</span></div>
              <div className="info-row"><span className="info-label">Date of Birth</span><span className="info-value">{preceptor.dateOfBirth || preceptor.dob || '-'}</span></div>
            </div>

            <div className="info-card">
              <div className="info-card-header"><BadgeCheck size={18} /> Professional Information</div>
              <div className="info-row"><span className="info-label">Preceptor ID</span><span className="info-value">{preceptor.id || '-'}</span></div>
              <div className="info-row"><span className="info-label">Qualification</span><span className="info-value">{preceptor.qualification || '-'}</span></div>
              <div className="info-row"><span className="info-label">Department</span><span className="info-value">{preceptor.department || preceptor.dept || '-'}</span></div>
              <div className="info-row"><span className="info-label">Designation</span><span className="info-value">{preceptor.designation || '-'}</span></div>
              <div className="info-row"><span className="info-label">Employment Status</span><span className="info-value">{preceptor.status || '-'}</span></div>
              <div className="info-row"><span className="info-label">Registration Number</span><span className="info-value" style={{ color: 'var(--text-secondary)' }}>Pending (Future)</span></div>
              <div className="info-row"><span className="info-label">Joining Date</span><span className="info-value" style={{ color: 'var(--text-secondary)' }}>Pending (Future)</span></div>
            </div>

            <div className="info-card">
              <div className="info-card-header"><Phone size={18} /> Contact Information</div>
              <div className="info-row"><span className="info-label">Email Address</span><span className="info-value">{preceptor.email || '-'}</span></div>
              <div className="info-row"><span className="info-label">Mobile Number</span><span className="info-value">{preceptor.phone || preceptor.mobileNumber || preceptor.mobile || '-'}</span></div>
            </div>
            
            <div className="info-card">
              <div className="info-card-header"><ShieldAlert size={18} /> Account Information</div>
              <div className="info-row"><span className="info-label">Username</span><span className="info-value">{preceptor.username || preceptor.id || '-'}</span></div>
              <div className="info-row"><span className="info-label">Account Status</span>
                <span className="info-value" style={{ color: preceptor.status === 'Active' ? 'var(--color-success)' : 'var(--text-secondary)' }}>
                  {preceptor.status}
                </span>
              </div>
              <div className="info-row"><span className="info-label">Created Date</span><span className="info-value">Aug 12, 2023</span></div>
              <div className="info-row"><span className="info-label">Last Updated</span><span className="info-value">Today</span></div>
            </div>
          </div>
        )}

        {/* Tab Content: Assignments */}
        {activeTab === 'assignments' && (
          <div>
            <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className="kpi-card">
                <div className="kpi-details">
                  <h4 style={{ color: 'var(--color-primary)' }}>{assignedStudents.length}</h4>
                  <p>Total Assigned Students</p>
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-details">
                  <h4 style={{ color: 'var(--color-success)' }}>{assignedStudents.length}</h4>
                  <p>Active Students</p>
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-details">
                  <h4 style={{ color: 'var(--text-secondary)' }}>0</h4>
                  <p>Completed Students</p>
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-details">
                  <h4 style={{ color: 'var(--text-secondary)' }}>View</h4>
                  <p>Assignment History</p>
                </div>
              </div>
            </div>

            <div className="info-card" style={{ width: '100%', padding: 0, overflow: 'hidden' }}>
              <div className="info-card-header" style={{ padding: '1.5rem', borderBottom: 'none', marginBottom: 0 }}>Student Roster</div>
              {assignedStudents.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No assigned students.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>Roll Number</th>
                        <th>Student Name</th>
                        <th>Academic Year</th>
                        <th>Current Year</th>
                        <th>Case Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedStudents.map(student => (
                        <tr key={student.id}>
                          <td style={{ fontWeight: 600 }}>{student.id}</td>
                          <td>
                            <Link to={`/college-admin/students/view/${student.id}`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                              {student.name}
                            </Link>
                          </td>
                          <td>{student.academicYear || '2023-2024'}</td>
                          <td>{student.year || 'Pharm.D'}</td>
                          <td>
                            <span className="status-pill" style={{ background: 'var(--bg-surface-alt)', color: 'var(--text-secondary)' }}>
                              {getStudentCaseStatus(student.id)}
                            </span>
                          </td>
                          <td>
                            <button className="btn-bulk" onClick={() => navigate(`/college-admin/students/view/${student.id}`)}>
                              <Eye size={14} /> Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: Cases */}
        {activeTab === 'cases' && (
          <div>
            <div className="info-card" style={{ width: '100%', padding: 0, overflow: 'hidden' }}>
              <div className="info-card-header" style={{ padding: '1.5rem', borderBottom: 'none', marginBottom: 0 }}>Recent Clinical Cases</div>
              {preceptorCases.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No clinical cases available.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>Case ID</th>
                        <th>Student</th>
                        <th>Patient Initials</th>
                        <th>Final Diagnosis</th>
                        <th>Submission Date</th>
                        <th>Current Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preceptorCases.map((c, i) => (
                        <tr key={c.id || i}>
                          <td style={{ fontWeight: 600 }}>{c.id || `CASE-00${i+1}`}</td>
                          <td>
                            <Link to={`/college-admin/students/view/${c.studentId || c.student}`} style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                              {c.studentName || c.student}
                            </Link>
                          </td>
                          <td>{c.patientInitials || 'P.I.'}</td>
                          <td>{c.finalDiagnosis || c.topic || c.disease || c.diagnosis || '-'}</td>
                          <td>{c.submissionDate || c.date || '2023-11-20'}</td>
                          <td>
                            <span className="status-pill" style={{ 
                              background: c.status === 'Approved' ? 'rgba(16,185,129,0.1)' : c.status === 'Returned' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                              color: c.status === 'Approved' ? 'var(--color-success)' : c.status === 'Returned' ? 'var(--color-danger)' : 'var(--color-warning)'
                            }}>
                              {c.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn-bulk" onClick={() => navigate(`/college-admin/cases/view/${c.id}`)}>
                              <Eye size={14} /> Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: Activity */}
        {activeTab === 'activity' && (
          <div className="info-card" style={{ width: '100%', maxWidth: '800px' }}>
            <div className="info-card-header"><Activity size={18} /> System Activity</div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-icon"></div>
                <div className="timeline-content">
                  <div className="timeline-title">Profile Created</div>
                  <div className="timeline-date">Administrator • Aug 12, 2023 10:00 AM</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon"></div>
                <div className="timeline-content">
                  <div className="timeline-title">Last Login</div>
                  <div className="timeline-date">System • Nov 25, 2023 09:15 AM</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon" style={{ background: 'var(--color-warning)' }}></div>
                <div className="timeline-content">
                  <div className="timeline-title">Password Reset</div>
                  <div className="timeline-date">Administrator • Sep 05, 2023 02:30 PM</div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon" style={{ background: preceptor.status === 'Active' ? 'var(--color-success)' : 'var(--color-danger)' }}></div>
                <div className="timeline-content">
                  <div className="timeline-title">Status Changed: {preceptor.status}</div>
                  <div className="timeline-date">System • Current State</div>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', display: 'none' }}>
              No activity recorded.
            </div>
          </div>
        )}

      </div>
      
      {isEditModalOpen && (
        <AddPreceptorModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          mode="edit" 
          initialData={preceptor} 
        />
      )}
    </CollegeAdminLayout>
  );
};

export default PreceptorProfile;
