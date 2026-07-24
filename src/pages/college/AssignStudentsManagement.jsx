import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, ClipboardList, Users } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import AssignStudentModal from '../../components/college/students/AssignStudentModal';
import '../college/PreceptorManagement.css'; 

const AssignStudentsManagement = () => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  return (
    <CollegeAdminLayout>
      <div className="preceptor-page">
        
        <div className="page-header">
          <h1 className="page-title">Assign Students</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Assign Students</span>
          </div>
        </div>

        <div className="preceptor-actions-grid">
          
          <div className="action-card" onClick={() => setIsAssignModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="action-icon-wrapper blue">
              <UserPlus size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Assign Student</span>
              <span className="action-subtitle">Assign a student to a preceptor</span>
            </div>
          </div>

          <Link to="/college-admin/assign-students/list" className="action-card">
            <div className="action-icon-wrapper green">
              <Users size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Assigned Students</span>
              <span className="action-subtitle">View and manage assigned students</span>
            </div>
          </Link>

        </div>

      </div>

      <AssignStudentModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} />

    </CollegeAdminLayout>
  );
};

export default AssignStudentsManagement;
