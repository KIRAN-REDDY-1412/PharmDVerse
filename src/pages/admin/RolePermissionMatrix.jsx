import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useDatabase } from '../../context/DatabaseContext';
import { Shield, Check, X, Save, RotateCcw, Info, Lock } from 'lucide-react';
import './UserManagement.css';

const PERMISSION_GROUPS = [
  {
    group: 'Platform & Tenant Governance',
    permissions: [
      { key: 'dashboardAccess', label: 'View Portal Dashboard' },
      { key: 'manageColleges', label: 'College Onboarding & Registration (Super Admin)' },
      { key: 'manageSubscriptions', label: 'Subscription & License Management' },
      { key: 'manageGlobalUsers', label: 'Cross-Tenant Global User Control' },
      { key: 'rolePermissionMatrix', label: 'Manage Role Permission Matrix' },
      { key: 'platformSettings', label: 'Access Platform Settings' }
    ]
  },
  {
    group: 'Institutional & Academic Management',
    permissions: [
      { key: 'manageCollegePreceptors', label: 'Manage Preceptors / Faculty' },
      { key: 'manageCollegeStudents', label: 'Manage Student Enrolments' },
      { key: 'assignStudentsToPreceptors', label: 'Assign Students to Preceptors' },
      { key: 'manageAcademicYears', label: 'Academic Year & Progression Controls' },
      { key: 'manageCollegeSettings', label: 'Institution Profile & Settings' },
      { key: 'backupRestore', label: 'Database Backup & Restore' }
    ]
  },
  {
    group: 'Clinical Case Evaluation & Documentation',
    permissions: [
      { key: 'createClinicalCase', label: 'Create & Draft Clinical Cases' },
      { key: 'submitCaseForms', label: 'Submit Documentation Forms for Review' },
      { key: 'reviewClinicalCases', label: 'Review & Verify Student Clinical Cases' },
      { key: 'approveRejectForms', label: 'Approve or Return Form Sections' },
      { key: 'provideFeedbackComments', label: 'Add Preceptor Evaluation Comments' },
      { key: 'viewCaseAnalytics', label: 'Access Clinical Case Analytics' },
      { key: 'caseRepositoryView', label: 'Access Clinical Case Repository' }
    ]
  }
];

const ROLES = [
  { key: 'superadmin', name: 'Super Admin', description: 'Global Platform Administrator', badgeClass: 'badge-purple', editable: false },
  { key: 'admin', name: 'College Admin', description: 'Primary Institution Administrator', badgeClass: 'badge-blue', editable: true },
  { key: 'preceptor', name: 'Preceptor', description: 'Clinical Faculty / Supervisor', badgeClass: 'badge-green', editable: true },
  { key: 'student', name: 'Student', description: 'Pharm.D Trainee / Scholar', badgeClass: 'badge-amber', editable: true }
];

const RolePermissionMatrix = () => {
  const { rolePermissions, updateRolePermissions } = useDatabase();
  const [matrix, setMatrix] = useState(rolePermissions || {});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const togglePermission = (roleKey, permKey) => {
    if (roleKey === 'superadmin' && permKey === 'rolePermissionMatrix') return; // Cannot lock oneself out
    setMatrix(prev => ({
      ...prev,
      [roleKey]: {
        ...prev[roleKey],
        [permKey]: !prev[roleKey]?.[permKey]
      }
    }));
  };

  const handleSave = () => {
    updateRolePermissions(matrix);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    setMatrix(rolePermissions);
  };

  return (
    <AdminLayout>
      <div className="user-management-container">
        
        {/* Header */}
        <div className="command-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={28} color="var(--primary-color)" />
              <h1 className="page-title">Role Permission Matrix</h1>
            </div>
            <p className="page-subtitle">
              Centralized Role-Based Access Control (RBAC). Configure permissions across all platform portals.
            </p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={handleReset}>
              <RotateCcw size={16} /> Reset
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Permission Matrix
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="alert alert-success" style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '8px', backgroundColor: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Check size={18} />
            <span>Role permissions updated successfully across all multi-college portals.</span>
          </div>
        )}

        {/* Info Banner */}
        <div style={{ backgroundColor: 'var(--surface-color)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Info size={20} color="var(--primary-color)" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong>Super Admin Privilege:</strong> This Role Permission Matrix is rendered exclusively within the Super Admin Portal. Changes made here apply dynamically to College Admins, Preceptors, and Students.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="data-grid-container" style={{ overflowX: 'auto' }}>
          <table className="enterprise-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ width: '35%', textAlign: 'left' }}>Capability / Permission</th>
                {ROLES.map(role => (
                  <th key={role.key} style={{ textAlign: 'center', width: '16.25%' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>{role.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>{role.description}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERMISSION_GROUPS.map((group, gIdx) => (
                <React.Fragment key={gIdx}>
                  <tr style={{ backgroundColor: 'var(--bg-main)' }}>
                    <td colSpan={5} style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', color: 'var(--primary-color)', padding: '12px 16px' }}>
                      {group.group}
                    </td>
                  </tr>
                  {group.permissions.map((perm) => (
                    <tr key={perm.key}>
                      <td style={{ padding: '12px 16px', fontWeight: 500 }}>
                        {perm.label}
                      </td>
                      {ROLES.map(role => {
                        const isGranted = !!matrix[role.key]?.[perm.key];
                        const isSuperAdminLocked = role.key === 'superadmin';

                        return (
                          <td key={role.key} style={{ textAlign: 'center', padding: '12px' }}>
                            <button
                              onClick={() => togglePermission(role.key, perm.key)}
                              disabled={isSuperAdminLocked}
                              style={{
                                border: 'none',
                                background: isGranted ? '#dcfce7' : '#fee2e2',
                                color: isGranted ? '#15803d' : '#b91c1c',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                cursor: isSuperAdminLocked ? 'not-allowed' : 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                opacity: isSuperAdminLocked ? 0.8 : 1,
                                transition: 'all 0.2s ease'
                              }}
                              title={isSuperAdminLocked ? 'Super Admin root permissions cannot be revoked' : `Toggle ${perm.label} for ${role.name}`}
                            >
                              {isGranted ? <Check size={14} /> : <X size={14} />}
                              <span>{isGranted ? 'Allowed' : 'Denied'}</span>
                              {isSuperAdminLocked && <Lock size={12} style={{ marginLeft: '2px' }} />}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default RolePermissionMatrix;
