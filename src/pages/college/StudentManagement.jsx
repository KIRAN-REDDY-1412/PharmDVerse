import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ListTodo } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import AddStudentModal from '../../components/college/student/AddStudentModal';
import '../college/PreceptorManagement.css';

const StudentManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <CollegeAdminLayout>
      <div className="preceptor-page">
        
        <div className="page-header">
          <h1 className="page-title">Student Management</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Student Management</span>
          </div>
        </div>

        <div className="preceptor-actions-grid">
          
          <div className="action-card" onClick={() => setIsAddModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="action-icon-wrapper blue">
              <Users size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Add Student</span>
              <span className="action-subtitle">Register a new student</span>
            </div>
          </div>

          <Link to="/college-admin/student-list" className="action-card">
            <div className="action-icon-wrapper green">
              <ListTodo size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Student List</span>
              <span className="action-subtitle">View and manage all students</span>
            </div>
          </Link>

        </div>

      </div>

      <AddStudentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </CollegeAdminLayout>
  );
};

export default StudentManagement;
