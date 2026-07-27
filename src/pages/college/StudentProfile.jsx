import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Phone, Edit, Trash2, 
  ShieldAlert, CheckCircle, Activity, FileText, 
  Users, Clock3, BadgeCheck, RotateCcw, Download, Eye, GraduationCap
} from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import AddStudentModal from '../../components/college/student/AddStudentModal';
import { useDatabase } from '../../context/DatabaseContext';
import '../college/PreceptorProfile.css'; // Reuse enterprise CSS

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, cases, updateUser } = useDatabase();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const student = users.find(u => u.id === id && u.role === 'student');

  if (!student) {
    return (
      <CollegeAdminLayout>
        <div className="profile-page-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <ShieldAlert size={48} style={{ color: 'var(--color-danger)', marginBottom: '1rem' }} />
          <h2>Student Not Found</h2>
          <p>The student ID {id} does not exist in the system.</p>
          <button className="btn-primary" onClick={() => navigate('/college-admin/students/list')}>
            <ArrowLeft size={16} /> Back to Students
          </button>
        </div>
      </CollegeAdminLayout>
    );
  }

  // Derived Data
  const assignedPreceptor = users.find(u => u.id === student.assignedPreceptorId);
  const studentCases = cases.filter(c => c.studentId === student.id || c.student === (student.name || student.fullName));
  
  const approvedCases = studentCases.filter(c => c.status === 'Approved').length;
  const pendingCases = studentCases.filter(c => c.status === 'Pending' || c.status === 'Submitted' || c.status === 'Under Review').length;
  const returnedCases = studentCases.filter(c => c.status === 'Returned').length;

  const handleDeactivate = () => {
    const newStatus = student.status === 'Active' ? 'Inactive' : 'Active';
    updateUser(student.id, { status: newStatus });
  };

  return (
    <CollegeAdminLayout>
      <div className="profile-page-container">
        
        {/* Breadcrumb & Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="breadcrumbs" style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            <Link to="/college-admin/dashboard" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Dashboard</Link>
            <span>&gt;</span>
            <Link to="/college-admin/students/list" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Student Management</Link>
            <span>&gt;</span>
            <span>Student Profile</span>
          </div>
          <button 
            className="btn-bulk" 
            onClick={() => navigate('/college-admin/students/list')}
            style={{ display: 'inline-flex', padding: '0.4rem 0.75rem' }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {/* Profile Header */}
        <div className="profile-header-card">
          <div className="profile-header-left">
            {student.profilePhoto ? (
              <img src={student.profilePhoto} alt="Profile" className="profile-avatar-large" />
            ) : (
              <div className="profile-avatar-large"><User size={48} /></div>
            )}
            <div className="profile-header-info">
              <h1>{student.name || student.fullName}</h1>
              <div className="profile-badges">
                <span className="profile-badge"><BadgeCheck size={14} /> {student.id}</span>
                <span className="profile-badge"><GraduationCap size={14} /> {student.course}</span>
                <span className="profile-badge"><Activity size={14} /> {student.year} ({student.batch})</span>
                <span className={`status-pill ${student.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                  {student.status}
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
              style={{ color: student.status === 'Active' ? 'var(--color-danger)' : 'var(--color-success)', borderColor: student.status === 'Active' ? 'var(--color-danger)' : 'var(--color-success)' }}
            >
              {student.status === 'Active' ? <><Trash2 size={16} /> Deactivate</> : <><CheckCircle size={16} /> Activate</>}
            </button>
            <button className="btn-bulk" onClick={() => window.print()}>
              <Download size={16} /> Export Profile
            </button>
          </div>
        </div>

        {/* Global Summary Statistics */}
        <div className="kpi-grid">
          <div className="kpi-card" onClick={() => assignedPreceptor && navigate(`/college-admin/preceptors/${assignedPreceptor.id}`)} style={{ cursor: assignedPreceptor ? 'pointer' : 'default' }}>
            <div className="kpi-icon" style={{ background: 'rgba(15,76,129,0.1)', color: 'var(--color-primary)' }}><User size={24} /></div>
            <div className="kpi-details">
              <h4 style={{ fontSize: assignedPreceptor ? '1rem' : '1.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                {assignedPreceptor ? (assignedPreceptor.name || assignedPreceptor.fullName) : 'Unassigned'}
              </h4>
              <p>Assigned Preceptor</p>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon" style={{ background: 'rgba(15,76,129,0.1)', color: 'var(--color-primary)' }}><FileText size={24} /></div>
            <div className="kpi-details">
              <h4>{studentCases.length}</h4>
              <p>Total Cases</p>
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
          <button className={`profile-tab ${activeTab === 'academic' ? 'active' : ''}`} onClick={() => setActiveTab('academic')}>
            Academic Record
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
              <div className="info-row"><span className="info-label">Full Name</span><span className="info-value">{student.name || student.fullName || '-'}</span></div>
              <div className="info-row"><span className="info-label">Gender</span><span className="info-value">{student.gender || '-'}</span></div>
              <div className="info-row"><span className="info-label">Date of Birth</span><span className="info-value">{student.dateOfBirth || student.dob || '-'}</span></div>
              <div className="info-row"><span className="info-label">Blood Group</span><span className="info-value">{student.bloodGroup || '-'}</span></div>
              <div className="info-row"><span className="info-label">Aadhaar Number</span><span className="info-value">{student.aadhaarNumber || '-'}</span></div>
            </div>

            <div className="info-card">
              <div className="info-card-header"><Phone size={18} /> Contact Information</div>
              <div className="info-row"><span className="info-label">Email Address</span><span className="info-value">{student.email || '-'}</span></div>
              <div className="info-row"><span className="info-label">Mobile Number</span><span className="info-value">{student.phone || student.mobileNumber || student.mobile || '-'}</span></div>
              <div className="info-row"><span className="info-label">Parent Name</span><span className="info-value">{student.parentName || '-'}</span></div>
              <div className="info-row"><span className="info-label">Parent Mobile</span><span className="info-value">{student.parentMobile || '-'}</span></div>
            </div>
            
            <div className="info-card">
              <div className="info-card-header"><ShieldAlert size={18} /> Account Information</div>
              <div className="info-row"><span className="info-label">Username</span><span className="info-value">{student.username || student.id || '-'}</span></div>
              <div className="info-row"><span className="info-label">Account Status</span>
                <span className="info-value" style={{ color: student.status === 'Active' ? 'var(--color-success)' : 'var(--text-secondary)' }}>
                  {student.status}
                </span>
              </div>
              <div className="info-row"><span className="info-label">Created Date</span><span className="info-value">Aug 12, 2023</span></div>
              <div className="info-row"><span className="info-label">Last Updated</span><span className="info-value">Today</span></div>
            </div>
          </div>
        )}

        {/* Tab Content: Academic Record */}
        {activeTab === 'academic' && (
          <div className="tab-content-grid">
            <div className="info-card">
              <div className="info-card-header"><GraduationCap size={18} /> Academic Details</div>
              <div className="info-row"><span className="info-label">Roll Number</span><span className="info-value">{student.id || '-'}</span></div>
              <div className="info-row"><span className="info-label">Course</span><span className="info-value">{student.course || '-'}</span></div>
              <div className="info-row"><span className="info-label">Batch</span><span className="info-value">{student.batch || '-'}</span></div>
              <div className="info-row"><span className="info-label">Current Year</span><span className="info-value">{student.year || '-'}</span></div>
              <div className="info-row"><span className="info-label">Academic Year</span><span className="info-value">{student.academicYear || '-'}</span></div>
            </div>
            
            <div className="info-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
               <Activity size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
               <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Academic Performance (Future)</h3>
               <p style={{ textAlign: 'center' }}>Integration with university marks and examination records will appear here.</p>
            </div>
          </div>
        )}

        {/* Tab Content: Cases */}
        {activeTab === 'cases' && (
          <div>
            <div className="info-card" style={{ width: '100%', padding: 0, overflow: 'hidden' }}>
              <div className="info-card-header" style={{ padding: '1.5rem', borderBottom: 'none', marginBottom: 0 }}>Clinical Cases History</div>
              {studentCases.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No clinical cases available.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>Case ID</th>
                        <th>Patient Initials</th>
                        <th>Final Diagnosis</th>
                        <th>Submission Date</th>
                        <th>Current Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentCases.map((c, i) => (
                        <tr key={c.id || i}>
                          <td style={{ fontWeight: 600 }}>{c.id || `CASE-00${i+1}`}</td>
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
            <div className="info-card-header"><Activity size={18} /> System Activity Log</div>
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
              {student.assignedPreceptorId && (
                <div className="timeline-item">
                  <div className="timeline-icon" style={{ background: 'var(--color-primary)' }}></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Preceptor Assigned: {assignedPreceptor?.name}</div>
                    <div className="timeline-date">Administrator • Sep 01, 2023 11:30 AM</div>
                  </div>
                </div>
              )}
              <div className="timeline-item">
                <div className="timeline-icon" style={{ background: student.status === 'Active' ? 'var(--color-success)' : 'var(--color-danger)' }}></div>
                <div className="timeline-content">
                  <div className="timeline-title">Status Changed: {student.status}</div>
                  <div className="timeline-date">System • Current State</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      
      {isEditModalOpen && (
        <AddStudentModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          mode="edit" 
          initialData={student} 
        />
      )}
    </CollegeAdminLayout>
  );
};

export default StudentProfile;
