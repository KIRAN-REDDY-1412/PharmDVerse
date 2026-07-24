import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS, INITIAL_CASES, INITIAL_NOTIFICATIONS } from '../data/MockDatabase';
import { useAuth } from './AuthContext';

const DatabaseContext = createContext();

export const useDatabase = () => {
  return useContext(DatabaseContext);
};

export const DatabaseProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // Load from localStorage or use initial seed data
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('erp_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('erp_cases');
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('erp_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem('erp_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('erp_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('erp_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // --- ACTIONS ---

  // 1. Submit a New Case (Student Action)
  const submitCase = (caseData) => {
    if (!currentUser || currentUser.role !== 'student') return;

    const newCase = {
      ...caseData,
      id: `CC00${cases.length + 1}`,
      studentId: currentUser.id,
      preceptorId: currentUser.assignedPreceptorId,
      status: 'Submitted',
      submittedDate: new Date().toISOString()
    };
    
    setCases(prev => [newCase, ...prev]);

    // Automatically notify the preceptor
    sendNotification({
      recipientId: currentUser.assignedPreceptorId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: 'Student',
      title: `New Case Submitted: ${caseData.docType}`,
      category: 'Clinical Cases'
    });
  };

  // 1b. Save Case as Draft (Student Action)
  const saveDraftCase = (caseData) => {
    if (!currentUser || currentUser.role !== 'student') return;

    if (caseData.id) {
      // Update existing draft
      setCases(prev => prev.map(c => 
        c.id === caseData.id ? { ...c, ...caseData, status: 'Draft', lastModified: new Date().toISOString() } : c
      ));
    } else {
      // Create new draft
      const newDraft = {
        ...caseData,
        id: `DRAFT00${cases.length + 1}`,
        studentId: currentUser.id,
        preceptorId: currentUser.assignedPreceptorId,
        status: 'Draft',
        createdDate: new Date().toISOString(),
        lastModified: new Date().toISOString()
      };
      setCases(prev => [newDraft, ...prev]);
    }
  };

  // 1c. Delete Draft Case
  const deleteDraftCase = (draftId) => {
    setCases(prev => prev.filter(c => c.id !== draftId));
  };

  // 2. Update Case Status (Preceptor Action)
  const updateCaseStatus = (caseId, newStatus, remarks = '') => {
    if (!currentUser || currentUser.role !== 'preceptor') return;

    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        // Notify the student about the status change
        sendNotification({
          recipientId: c.studentId,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: 'Preceptor',
          title: `Case ${newStatus}: ${c.docType}`,
          category: newStatus === 'Returned' ? 'Returned Case' : 'Clinical Cases',
        });
        return { ...c, status: newStatus, remarks };
      }
      return c;
    }));
  };

  // 3. Resubmit Case (Student Action)
  const resubmitCase = (caseId, updatedData) => {
    if (!currentUser || currentUser.role !== 'student') return;

    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        // Notify the preceptor
        sendNotification({
          recipientId: c.preceptorId,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: 'Student',
          title: `Case Resubmitted: ${c.docType}`,
          category: 'Clinical Cases',
        });
        return { ...c, ...updatedData, status: 'Submitted', remarks: '', submittedDate: new Date().toISOString() };
      }
      return c;
    }));
  }

  // 4. Send Notification (Generic)
  const sendNotification = ({ recipientId, senderId, senderName, senderRole, title, category }) => {
    const newNotification = {
      id: `NOTIF00${notifications.length + 1}`,
      recipientId,
      senderId,
      senderName,
      senderRole,
      title,
      category,
      status: 'Unread',
      date: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // 5. Mark Notification as Read
  const markNotificationRead = (notificationId) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, status: 'Read' } : n
    ));
  };

  // 6. Update User Profile
  const updateUser = (userId, updatedData) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, ...updatedData } : u
    ));
  };

  // 7. Add New User (Admin Action)
  const addUser = (newUser) => {
    const isDuplicate = users.some(u => u.id === newUser.id || (u.email && u.email === newUser.email));
    if (isDuplicate) {
      throw new Error(`User with ID ${newUser.id} or Email ${newUser.email} already exists.`);
    }
    setUsers(prev => [newUser, ...prev]);
  };

  // --- GETTERS (Derived State) ---
  
  const getStudentCases = (studentId) => cases.filter(c => c.studentId === studentId);
  const getPreceptorAssignedCases = (preceptorId) => cases.filter(c => c.preceptorId === preceptorId);
  const getUserNotifications = (userId) => notifications.filter(n => n.recipientId === userId).sort((a,b) => new Date(b.date) - new Date(a.date));

  return (
    <DatabaseContext.Provider value={{
      users,
      cases,
      notifications,
      submitCase,
      saveDraftCase,
      deleteDraftCase,
      updateCaseStatus,
      resubmitCase,
      sendNotification,
      markNotificationRead,
      updateUser,
      addUser,
      getStudentCases,
      getPreceptorAssignedCases,
      getUserNotifications
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};
