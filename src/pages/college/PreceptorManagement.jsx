import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCog, ListTodo } from 'lucide-react';
import CollegeAdminLayout from '../../components/college/CollegeAdminLayout';
import AddPreceptorModal from '../../components/college/preceptor/AddPreceptorModal';
import './PreceptorManagement.css';

const PreceptorManagement = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <CollegeAdminLayout>
      <div className="preceptor-page">
        
        <div className="page-header">
          <h1 className="page-title">Preceptor Management</h1>
          <div className="breadcrumbs">
            <Link to="/college-admin/dashboard" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span>Preceptor Management</span>
          </div>
        </div>

        <div className="preceptor-actions-grid">
          
          <div className="action-card" onClick={() => setIsAddModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="action-icon-wrapper blue">
              <UserCog size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Add Preceptor</span>
              <span className="action-subtitle">Register a new preceptor</span>
            </div>
          </div>

          <Link to="/college-admin/preceptors/list" className="action-card">
            <div className="action-icon-wrapper green">
              <ListTodo size={32} />
            </div>
            <div className="action-details">
              <span className="action-title">Preceptor List</span>
              <span className="action-subtitle">View and manage all preceptors</span>
            </div>
          </Link>

        </div>

      </div>

      <AddPreceptorModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </CollegeAdminLayout>
  );
};

export default PreceptorManagement;
