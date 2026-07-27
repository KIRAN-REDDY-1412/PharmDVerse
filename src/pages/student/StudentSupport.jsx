import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../../components/student/StudentLayout';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';

// Import Tabs
import RaiseRequestTab from '../../components/student/support/RaiseRequestTab';
import MyRequestsTab from '../../components/student/support/MyRequestsTab';
import FaqContactTab from '../../components/student/support/FaqContactTab';

// Import CSS
import './StudentSupport.css';

const StudentSupport = () => {
  const [activeTab, setActiveTab] = useState('raise');
  const { currentUser } = useAuth();
  const { users } = useDatabase();
  const user = users.find(u => u.id === currentUser?.id);

  if (!user) return <StudentLayout><div style={{ padding: '2rem' }}>Loading...</div></StudentLayout>;

  return (
    <StudentLayout>
      <div style={{ padding: '1rem 2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            <Link to="/student/dashboard" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Dashboard</Link>
            <span> / </span>
            <span style={{ color: 'var(--text-primary)' }}>Help & Support</span>
          </div>

          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Help & Support</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Get assistance, track your requests, and find answers to common questions.</p>
          </div>
        </div>

        <div className="support-container">
          <div className="support-tabs">
            <button 
              className={`support-tab ${activeTab === 'raise' ? 'active' : ''}`}
              onClick={() => setActiveTab('raise')}
            >
              Raise Support Request
            </button>
            <button 
              className={`support-tab ${activeTab === 'my-requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-requests')}
            >
              My Requests
            </button>
            <button 
              className={`support-tab ${activeTab === 'faq' ? 'active' : ''}`}
              onClick={() => setActiveTab('faq')}
            >
              FAQ & Contact
            </button>
          </div>

          <div className="support-content-area">
            {activeTab === 'raise' && <RaiseRequestTab user={user} />}
            {activeTab === 'my-requests' && <MyRequestsTab user={user} />}
            {activeTab === 'faq' && <FaqContactTab />}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentSupport;
