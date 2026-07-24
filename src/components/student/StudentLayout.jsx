import React from 'react';
import StudentSidebar from './StudentSidebar';
import StudentHeader from './StudentHeader';

const StudentLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-main)', padding: '1rem', gap: '1rem', overflow: 'hidden' }}>
      <StudentSidebar />
      
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '1rem', overflow: 'hidden' }}>
        <StudentHeader />
        
        <main style={{ 
          flex: 1, 
          backgroundColor: 'var(--bg-surface)', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
          border: '1px solid var(--border-color)',
          overflowY: 'auto' 
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
