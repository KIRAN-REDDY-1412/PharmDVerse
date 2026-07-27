import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_USERS, INITIAL_CASES, INITIAL_NOTIFICATIONS, INITIAL_ACADEMIC_YEARS, 
  INITIAL_PROMOTION_LOGS, INITIAL_COLLEGES, INITIAL_REGISTRATION_REQUESTS, 
  INITIAL_SUBSCRIPTIONS, INITIAL_ROLE_PERMISSIONS, INITIAL_RELEASES, INITIAL_PLATFORM_SETTINGS 
} from '../data/MockDatabase';
import { useAuth } from './AuthContext';

const DatabaseContext = createContext();

export const WORKFLOW_TRANSITIONS = {
  'Draft': ['Submitted'],
  'Submitted': ['Assigned to Preceptor'],
  'Assigned to Preceptor': ['Under Review'],
  'Under Review': ['Returned', 'Approved'],
  'Returned': ['Resubmitted'],
  'Resubmitted': ['Assigned to Preceptor', 'Under Review'],
  'Approved': ['Archived'],
  'Archived': []
};

export const useDatabase = () => {
  return useContext(DatabaseContext);
};

export const DatabaseProvider = ({ children }) => {
  const auth = useAuth() || {};
  const { currentUser } = auth;

  // Load from localStorage or use initial seed data
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('erp_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('erp_cases');
    let parsedCases = saved ? JSON.parse(saved) : INITIAL_CASES;
    
    // Migration: If cases exist but lack the new comprehensive nested forms structure, reset to INITIAL_CASES
    if (parsedCases.length > 0 && (!parsedCases[0].forms || !parsedCases[0].forms.patientProfile.data.patientInformation)) {
      console.warn("Old minimal case structure detected. Migrating to new comprehensive forms structure.");
      parsedCases = INITIAL_CASES;
      localStorage.setItem('erp_cases', JSON.stringify(INITIAL_CASES));
    }
    
    return parsedCases;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('erp_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [academicYears, setAcademicYears] = useState(() => {
    const saved = localStorage.getItem('erp_academic_years');
    return saved ? JSON.parse(saved) : INITIAL_ACADEMIC_YEARS;
  });

  const [promotionLogs, setPromotionLogs] = useState(() => {
    const saved = localStorage.getItem('erp_promotion_logs');
    return saved ? JSON.parse(saved) : INITIAL_PROMOTION_LOGS;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('erp_audit_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [colleges, setColleges] = useState(() => {
    const saved = localStorage.getItem('erp_colleges');
    return saved ? JSON.parse(saved) : INITIAL_COLLEGES;
  });

  const [registrationRequests, setRegistrationRequests] = useState(() => {
    const saved = localStorage.getItem('erp_registration_requests');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATION_REQUESTS;
  });

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('erp_subscriptions');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  const [rolePermissions, setRolePermissions] = useState(() => {
    const saved = localStorage.getItem('erp_role_permissions');
    return saved ? JSON.parse(saved) : INITIAL_ROLE_PERMISSIONS;
  });

  const [releases, setReleases] = useState(() => {
    const saved = localStorage.getItem('erp_releases');
    return saved ? JSON.parse(saved) : INITIAL_RELEASES;
  });

  const [platformSettings, setPlatformSettings] = useState(() => {
    const saved = localStorage.getItem('erp_platform_settings');
    return saved ? JSON.parse(saved) : INITIAL_PLATFORM_SETTINGS;
  });

  const INITIAL_BACKUPS_SEED = [
    {
      id: 'BAK-FULL-20260727-01',
      name: 'FULL-PLATFORM-BACKUP-2026-07-27.bak',
      date: '2026-07-27T02:00:00Z',
      size: '1.24 GB',
      createdBy: 'Super Admin',
      type: 'Full Platform',
      status: 'Completed',
      scope: 'Full Platform (Database, Cases, Landing Pages, Config)'
    },
    {
      id: 'BAK-COL001-20260720-02',
      name: 'AMR-COLLEGE-SNAPSHOT-2026-07-20.bak',
      date: '2026-07-20T14:30:00Z',
      size: '340 MB',
      createdBy: 'Super Admin',
      type: 'College Specific (AMR)',
      status: 'Completed',
      scope: 'AMR College of Pharmacy Tenant Data'
    },
    {
      id: 'BAK-SCHED-20260726-03',
      name: 'NIGHTLY-AUTO-BACKUP-2026-07-26.bak',
      date: '2026-07-26T02:00:00Z',
      size: '1.21 GB',
      createdBy: 'System Scheduler',
      type: 'Scheduled (Daily)',
      status: 'Completed',
      scope: 'Full Platform Database & System Configuration'
    }
  ];

  const [backups, setBackups] = useState(() => {
    const saved = localStorage.getItem('erp_backups');
    return saved ? JSON.parse(saved) : INITIAL_BACKUPS_SEED;
  });

  // Sandbox testing mode simulation state
  const [testingSession, setTestingSession] = useState(null); // { role: 'admin'|'preceptor'|'student', collegeId: 'COL-001' }

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

  useEffect(() => {
    localStorage.setItem('erp_academic_years', JSON.stringify(academicYears));
  }, [academicYears]);

  useEffect(() => {
    localStorage.setItem('erp_promotion_logs', JSON.stringify(promotionLogs));
  }, [promotionLogs]);

  useEffect(() => {
    localStorage.setItem('erp_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('erp_colleges', JSON.stringify(colleges));
  }, [colleges]);

  useEffect(() => {
    localStorage.setItem('erp_registration_requests', JSON.stringify(registrationRequests));
  }, [registrationRequests]);

  useEffect(() => {
    localStorage.setItem('erp_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('erp_role_permissions', JSON.stringify(rolePermissions));
  }, [rolePermissions]);

  useEffect(() => {
    localStorage.setItem('erp_releases', JSON.stringify(releases));
  }, [releases]);

  useEffect(() => {
    localStorage.setItem('erp_platform_settings', JSON.stringify(platformSettings));
  }, [platformSettings]);

  useEffect(() => {
    localStorage.setItem('erp_backups', JSON.stringify(backups));
  }, [backups]);

  const logAudit = (module, prevValue, updatedValue, modifiedBy) => {
    const newLog = {
      id: `AUDIT${Date.now()}`,
      module,
      prevValue: JSON.stringify(prevValue),
      updatedValue: JSON.stringify(updatedValue),
      modifiedBy,
      date: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // --- ACTIONS ---

  // -------------------------------------------------------------
  // CENTRALIZED CASE STATUS WORKFLOW ENGINE
  // -------------------------------------------------------------
  const transitionCaseStatus = (caseId, newStatus, remarks = '') => {
    if (!currentUser) return false;

    // ENFORCE: Ownership Policy
    if (['Returned', 'Approved'].includes(newStatus)) {
      if (currentUser.role !== 'preceptor') {
        console.error('Unauthorized: Only preceptors can return or approve cases.');
        return false;
      }
    }
    if (['Submitted', 'Resubmitted'].includes(newStatus)) {
      if (currentUser.role !== 'student') {
        console.error('Unauthorized: Only students can submit or resubmit cases.');
        return false;
      }
    }

    let success = false;

    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const allowedTransitions = WORKFLOW_TRANSITIONS[c.status] || [];
        
        let isValid = allowedTransitions.includes(newStatus);
        
        if (c.status === 'Draft' && newStatus === 'Assigned to Preceptor') isValid = true;
        if (c.status === 'Returned' && newStatus === 'Under Review') isValid = true;
        if (c.status === 'Submitted' && newStatus === 'Under Review') isValid = true;

        if (!isValid) {
          console.warn(`Invalid workflow transition for case ${caseId}: ${c.status} -> ${newStatus}`);
        }

        let title = `Case Status Updated: ${newStatus}`;
        let message = `Clinical Case ${caseId} is now ${newStatus}.`;
        let notifyStudent = false;
        let notifyPreceptor = false;
        
        if (newStatus === 'Submitted' || newStatus === 'Assigned to Preceptor' || newStatus === 'Resubmitted') {
          title = `Case ${newStatus}: ${c.diagnosis || 'Untitled'}`;
          message = `Student ${c.studentName || 'Student'} has ${newStatus.toLowerCase()} Clinical Case ${caseId}.`;
          notifyPreceptor = true;
        } else if (newStatus === 'Under Review') {
          title = `Clinical Case Under Review`;
          message = `${currentUser.name} has started reviewing your Clinical Case ${caseId}.`;
          notifyStudent = true;
        } else if (newStatus === 'Returned') {
          title = `Clinical Case Returned`;
          message = `Your Clinical Case ${caseId} has been returned for correction.`;
          notifyStudent = true;
        } else if (newStatus === 'Approved') {
          title = `Congratulations! Case Approved`;
          message = `Your Clinical Case ${caseId} has been approved.`;
          notifyStudent = true;
        }

        if (notifyPreceptor && c.preceptorId) {
          sendNotification({
            recipientId: c.preceptorId,
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderRole: currentUser.role,
            title, message,
            category: newStatus === 'Resubmitted' ? 'Case Resubmitted' : 'New Clinical Case',
            caseId,
            studentName: c.studentName || 'Student',
            rollNo: c.rollNo,
            diagnosis: c.diagnosis,
            actionLink: `/preceptor/cases/view/${caseId}`
          });
        }

        if (notifyStudent && c.studentId) {
          sendNotification({
            recipientId: c.studentId,
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderRole: currentUser.role,
            title, message,
            category: newStatus === 'Returned' ? 'Case Returned' : newStatus === 'Approved' ? 'Case Approved' : 'Clinical Cases',
            caseId,
            studentName: c.studentName || 'Student',
            rollNo: c.rollNo,
            diagnosis: c.diagnosis,
            actionLink: `/student/cases/view/${caseId}`
          });
        }

        const historyAction = newStatus === 'Assigned to Preceptor' ? 'Submitted & Assigned to Preceptor' : `Status Updated to ${newStatus}`;
        const newHistory = c.history ? [...c.history, { 
          date: new Date().toISOString(), 
          action: historyAction, 
          user: currentUser.name 
        }] : [{ date: new Date().toISOString(), action: historyAction, user: currentUser.name }];

        success = true;
        return { 
          ...c, 
          status: newStatus, 
          overallRemarks: remarks || c.overallRemarks, 
          history: newHistory,
          lastModified: new Date().toISOString()
        };
      }
      return c;
    }));

    return success;
  };

  // 1. Submit a New Case or Resubmit (Student Action)
  const submitCase = (caseData) => {
    if (!currentUser || currentUser.role !== 'student') {
      console.error('Unauthorized: Only students can submit cases.');
      return;
    }

    if (caseData.id) {
      const existing = cases.find(c => c.id === caseData.id);
      if (existing && !['Draft', 'Returned'].includes(existing.status)) {
        console.error('Unauthorized: Cannot edit a case that is already submitted or approved.');
        return;
      }
      
      // Sanitize fields (students cannot overwrite preceptor comments)
      delete caseData.overallRemarks;
      delete caseData.preceptorComments;

      const isResubmission = existing.status === 'Returned';
      setCases(prev => prev.map(c => 
        c.id === caseData.id ? { ...c, ...caseData } : c
      ));
      
      setTimeout(() => {
        transitionCaseStatus(caseData.id, isResubmission ? 'Under Review' : 'Assigned to Preceptor');
      }, 0);
    } else {
      const newSubmitted = {
        ...caseData,
        id: `CAS-24-${String(cases.length + 1).padStart(3, '0')}`,
        studentId: currentUser.id,
        preceptorId: currentUser.assignedPreceptorId,
        status: 'Submitted',
        date: new Date().toISOString(),
        submittedDate: new Date().toISOString(),
        history: [{ date: new Date().toISOString(), action: 'Submitted by Student', user: currentUser.name }]
      };
      setCases(prev => [newSubmitted, ...prev]);
      
      setTimeout(() => {
        transitionCaseStatus(newSubmitted.id, 'Assigned to Preceptor');
      }, 0);
    }
  };

  // 1b. Save Case as Draft (Student Action)
  const saveDraftCase = (caseData) => {
    if (!currentUser || currentUser.role !== 'student') {
      console.error('Unauthorized: Only students can save cases.');
      return;
    }

    if (caseData.id) {
      const existing = cases.find(c => c.id === caseData.id);
      if (existing && existing.status !== 'Draft') {
        console.error('Unauthorized: Cannot modify a non-draft case.');
        return;
      }
      // Sanitize
      delete caseData.overallRemarks;
      delete caseData.preceptorComments;
      
      // Update existing draft
      setCases(prev => prev.map(c => 
        c.id === caseData.id ? { ...c, ...caseData, status: 'Draft', lastModified: new Date().toISOString() } : c
      ));
    } else {
      // Create new draft
      const newDraft = {
        ...caseData,
        id: `CAS-24-${String(cases.length + 1).padStart(3, '0')}`,
        studentId: currentUser.id,
        preceptorId: currentUser.assignedPreceptorId,
        status: 'Draft',
        date: new Date().toISOString(),
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

  // 1d. Mark Case Under Review (Preceptor Action)
  const markCaseUnderReview = (caseId) => {
    transitionCaseStatus(caseId, 'Under Review');
  };

  // 2. Update Case Status (Preceptor Action)
  const updateCaseStatus = (caseId, newStatus, remarks = '') => {
    transitionCaseStatus(caseId, newStatus, remarks);
  };

  const updateFormStatus = (caseId, formKey, newStatus, comments = '') => {
    if (!currentUser || currentUser.role !== 'preceptor') {
      console.error('Unauthorized: Only assigned preceptors can review documentation.');
      return;
    }
    
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const formNames = {
          patientProfile: 'Patient Profile Form',
          patientCounselling: 'Patient Counselling Form',
          drugInformation: 'Drug Information Request Form',
          pharmacistIntervention: 'Pharmacist Intervention Form',
          adr: 'ADR Form'
        };
        const formName = formNames[formKey] || formKey;
        
        const newHistory = c.history ? [...c.history, { 
          date: new Date().toISOString(), 
          action: `Preceptor ${newStatus} ${formName}`, 
          user: currentUser.name 
        }] : [{ date: new Date().toISOString(), action: `Preceptor ${newStatus} ${formName}`, user: currentUser.name }];
        
        const updatedComments = comments !== undefined && comments !== null ? comments : (c.forms?.[formKey]?.comments || '');

        // Notify Student of Form Status Change or Comment
        if (newStatus === 'Returned') {
          sendNotification({
            recipientId: c.studentId,
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderRole: 'Preceptor',
            title: 'Form Returned',
            message: `Your ${formName} (Case ${caseId}) has been returned for correction.`,
            category: 'Returned Case',
            caseId: caseId,
            formKey: formKey,
            actionLink: `/student/new-case/${caseId}`
          });
        }

        if (comments && comments.trim() !== '' && comments !== c.forms?.[formKey]?.comments) {
          sendNotification({
            recipientId: c.studentId,
            senderId: currentUser.id,
            senderName: currentUser.name,
            senderRole: 'Preceptor',
            title: 'New Review Comments Added',
            message: `New review comments have been added by ${currentUser.name} for ${formName} (Case ${caseId}).`,
            category: 'Clinical Cases',
            caseId: caseId,
            formKey: formKey,
            actionLink: `/student/cases/view/${caseId}` // or wherever comments are best viewed
          });
        }

        return {
          ...c,
          history: newHistory,
          forms: {
            ...c.forms,
            [formKey]: {
              ...c.forms?.[formKey],
              status: newStatus,
              comments: updatedComments
            }
          }
        };
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
          message: `Student ${currentUser.name} has resubmitted Clinical Case ${caseId}.`,
          category: 'Clinical Cases',
          caseId: caseId,
          actionLink: `/preceptor/cases/view/${caseId}`
        });

        // Notify Student of success (System Notification)
        sendNotification({
          recipientId: currentUser.id,
          senderId: 'SYSTEM',
          senderName: 'System',
          senderRole: 'System',
          title: 'Resubmission Successful',
          message: `Your updated Clinical Case ${caseId} has been resubmitted successfully.`,
          category: 'System',
          caseId: caseId,
          actionLink: `/student/cases/view/${caseId}`
        });
        const newHistory = c.history ? [...c.history, { date: new Date().toISOString(), action: 'Resubmitted by Student', user: currentUser.name }] : [{ date: new Date().toISOString(), action: 'Resubmitted by Student', user: currentUser.name }];
        return { ...c, ...updatedData, status: 'Submitted', remarks: '', submittedDate: new Date().toISOString(), history: newHistory };
      }
      return c;
    }));
  }

  // 4. Send Notification (Generic)
  const sendNotification = ({ recipientId, senderId, senderName, senderRole, title, message, category, caseId = null, formKey = null, actionLink = null, ...rest }) => {
    const newNotification = {
      id: `NOTIF${Date.now()}`,
      recipientId,
      senderId,
      senderName,
      senderRole,
      title,
      message,
      category,
      caseId,
      formKey,
      actionLink,
      status: 'Unread',
      date: new Date().toISOString(),
      ...rest
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // 5. Mark Notification as Read
  const markNotificationRead = (notificationId) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, status: 'Read' } : n
    ));
  };

  const markAllNotificationsRead = (userId) => {
    setNotifications(prev => prev.map(n => 
      n.recipientId === userId ? { ...n, status: 'Read' } : n
    ));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const deleteAllReadNotifications = (userId) => {
    setNotifications(prev => prev.filter(n => !(n.recipientId === userId && n.status === 'Read')));
  };

  // 6. Update User Profile
  const updateUser = (userId, updatedData) => {
    // ENFORCE: Ownership Policy
    if (currentUser?.role !== 'admin') {
      if (currentUser?.id !== userId) {
        console.error('Unauthorized: You can only update your own profile.');
        return;
      }
      // Sanitize fields to prevent non-admins from changing admin-owned data
      const forbiddenFields = ['role', 'status', 'assignedPreceptorId', 'preceptorId', 'course', 'year', 'academicYear', 'collegeName'];
      forbiddenFields.forEach(field => delete updatedData[field]);
    }

    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        // Enforce: Inactive preceptors shall not receive new assignments
        const targetPreceptorId = updatedData.assignedPreceptorId || updatedData.preceptorId;
        if (targetPreceptorId && targetPreceptorId !== u.assignedPreceptorId) {
          const preceptor = prev.find(p => p.id === targetPreceptorId);
          if (preceptor && preceptor.status === 'Inactive') {
            console.error('Cannot assign student to an inactive preceptor.');
            return u; // Block update
          }
        }
        const updated = { ...u, ...updatedData };
        logAudit('User Management', u, updated, currentUser?.name || 'System');
        return updated;
      }
      return u;
    }));

    // Real-time synchronization: if the logged-in user's profile is updated, update the AuthContext state immediately
    if (currentUser && currentUser.id === userId && auth.setCurrentUser) {
      auth.setCurrentUser(prev => ({ ...prev, ...updatedData }));
    }
  };

  // 7. Add New User (Admin Action)
  const addUser = (newUser) => {
    if (currentUser?.role !== 'admin') {
      console.error('Unauthorized: Only admins can add users.');
      return;
    }
    const isDuplicate = users.some(u => u.id === newUser.id || (u.email && u.email === newUser.email));
    if (isDuplicate) {
      throw new Error(`User with ID ${newUser.id} or Email ${newUser.email} already exists.`);
    }
    setUsers(prev => [newUser, ...prev]);
  };

  // 8. Delete User (Admin Action)
  const deleteUser = (userId) => {
    if (currentUser?.role !== 'admin') {
      console.error('Unauthorized: Only admins can delete users.');
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    setCases(prev => prev.filter(c => c.studentId !== userId).map(c => 
      c.preceptorId === userId ? { ...c, preceptorId: null } : c
    ));
    setNotifications(prev => prev.filter(n => n.recipientId !== userId && n.senderId !== userId));
  };

  // 9. Reset User Password (Admin Action)
  const resetUserPassword = (userId, newPassword) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, password: newPassword } : u
    ));
  };

  // --- ACADEMIC PROGRESSION SYSTEM ---
  const COURSE_YEARS = {
    'Pharm.D': ['I Year', 'II Year', 'III Year', 'IV Year', 'V Year', 'VI Year'],
    'B.Pharm': ['I Year', 'II Year', 'III Year', 'IV Year'],
    'M.Pharm': ['I Year', 'II Year'],
    'D.Pharm': ['I Year', 'II Year']
  };

  const getNextYear = (course, currentYear) => {
    const years = COURSE_YEARS[course] || COURSE_YEARS['Pharm.D'];
    const currentIndex = years.indexOf(currentYear);
    if (currentIndex === -1 || currentIndex === years.length - 1) return 'Alumni';
    return years[currentIndex + 1];
  };

  const getPreviousYear = (course, currentYear) => {
    if (currentYear === 'Alumni') {
      const years = COURSE_YEARS[course] || COURSE_YEARS['Pharm.D'];
      return years[years.length - 1];
    }
    const years = COURSE_YEARS[course] || COURSE_YEARS['Pharm.D'];
    const currentIndex = years.indexOf(currentYear);
    if (currentIndex <= 0) return currentYear;
    return years[currentIndex - 1];
  };

  const addAcademicYear = (newYear) => {
    if (currentUser?.role !== 'admin') return;
    const isDuplicate = academicYears.some(ay => ay.name === newYear.name);
    if (isDuplicate) throw new Error('Academic Year already exists.');
    setAcademicYears(prev => [newYear, ...prev]);
  };

  const updateAcademicYear = (id, data) => {
    if (currentUser?.role !== 'admin') return;
    setAcademicYears(prev => prev.map(ay => ay.id === id ? { ...ay, ...data } : ay));
  };

  const activateAcademicYear = (id, autoPromote = false) => {
    if (currentUser?.role !== 'admin') return;
    const yearToActivate = academicYears.find(ay => ay.id === id);
    if (!yearToActivate) return;
    
    const previousActive = academicYears.find(ay => ay.status === 'Active');

    setAcademicYears(prev => prev.map(ay => {
      if (ay.id === id) return { ...ay, status: 'Active' };
      if (ay.status === 'Active') return { ...ay, status: 'Closed' };
      return ay;
    }));

    if (autoPromote && previousActive) {
      massPromoteStudents(previousActive.name, yearToActivate.name);
    }
  };

  // State snapshot for rollback
  const [snapshot, setSnapshot] = useState(() => {
    const saved = localStorage.getItem('erp_users_snapshot');
    return saved ? JSON.parse(saved) : null;
  });
  useEffect(() => {
    if (snapshot) localStorage.setItem('erp_users_snapshot', JSON.stringify(snapshot));
    else localStorage.removeItem('erp_users_snapshot');
  }, [snapshot]);

  const massPromoteStudents = (oldAcYear, newAcYear) => {
    if (currentUser?.role !== 'admin') return;
    // Save snapshot for rollback
    setSnapshot(users);

    const logs = [];
    const updatedUsers = users.map(user => {
      if (user.role === 'student' && user.status === 'Active') {
        const nextYear = getNextYear(user.course, user.year);
        
        logs.push({
          id: `LOG${Date.now()}_${user.id}`,
          studentId: user.id,
          studentName: user.name,
          previousYear: user.year,
          newYear: nextYear,
          previousAcademicYear: oldAcYear,
          newAcademicYear: newAcYear,
          type: 'Automatic',
          date: new Date().toISOString(),
          performedBy: currentUser ? currentUser.name : 'System'
        });

        // Notify student
        sendNotification({
          recipientId: user.id,
          senderId: 'SYS001',
          senderName: 'PharmDVerse System',
          senderRole: 'System',
          title: `You have been promoted to ${nextYear} for ${newAcYear}.`,
          category: 'System Alert'
        });

        return {
          ...user,
          year: nextYear,
          academicYear: newAcYear,
          status: nextYear === 'Alumni' ? 'Alumni' : user.status
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setPromotionLogs(prev => [...logs, ...prev]);
  };

  const manualPromoteStudent = (studentId, currentAcYear, newAcYear) => {
    if (currentUser?.role !== 'admin') return;
    const student = users.find(u => u.id === studentId);
    if (!student) return;

    const nextYear = getNextYear(student.course, student.year);
    
    const log = {
      id: `LOG${Date.now()}_${student.id}`,
      studentId: student.id,
      studentName: student.name,
      previousYear: student.year,
      newYear: nextYear,
      previousAcademicYear: currentAcYear,
      newAcademicYear: newAcYear,
      type: 'Manual',
      date: new Date().toISOString(),
      performedBy: currentUser ? currentUser.name : 'Admin'
    };

    setUsers(prev => prev.map(u => 
      u.id === studentId ? { ...u, year: nextYear, academicYear: newAcYear, status: nextYear === 'Alumni' ? 'Alumni' : u.status } : u
    ));
    setPromotionLogs(prev => [log, ...prev]);

    sendNotification({
      recipientId: student.id,
      senderId: 'SYS001',
      senderName: 'PharmDVerse System',
      senderRole: 'System',
      title: `You have been manually promoted to ${nextYear} for ${newAcYear}.`,
      category: 'System Alert'
    });
  };

  const manualDepromoteStudent = (studentId, currentAcYear, newAcYear) => {
    if (currentUser?.role !== 'admin') return;
    const student = users.find(u => u.id === studentId);
    if (!student) return;

    const prevYear = getPreviousYear(student.course, student.year);
    
    const log = {
      id: `LOG${Date.now()}_${student.id}`,
      studentId: student.id,
      studentName: student.name,
      previousYear: student.year,
      newYear: prevYear,
      previousAcademicYear: currentAcYear,
      newAcademicYear: newAcYear,
      type: 'Manual De-promotion',
      date: new Date().toISOString(),
      performedBy: currentUser ? currentUser.name : 'Admin'
    };

    setUsers(prev => prev.map(u => 
      u.id === studentId ? { ...u, year: prevYear, academicYear: newAcYear, status: 'Active' } : u
    ));
    setPromotionLogs(prev => [log, ...prev]);

    sendNotification({
      recipientId: student.id,
      senderId: 'SYS001',
      senderName: 'PharmDVerse System',
      senderRole: 'System',
      title: `Your academic year has been updated to ${prevYear} for ${newAcYear}.`,
      category: 'System Alert'
    });
  };

  // --- MULTI-COLLEGE SAAS METHODS ---

  // Method A: Public Registration Request
  const submitRegistrationRequest = (formData) => {
    const newRequest = {
      id: `REQ-${Date.now()}`,
      collegeName: formData.collegeName || formData.name,
      contactPerson: formData.contactPerson || formData.adminName,
      email: formData.email,
      phone: formData.phone || formData.mobile,
      city: formData.city || '',
      state: formData.state || '',
      country: formData.country || 'India',
      estimatedStudents: formData.estimatedStudents || 500,
      requestedPlan: formData.plan || 'Professional',
      status: 'Pending',
      submittedDate: new Date().toISOString(),
      notes: formData.notes || formData.message || 'Submitted via PharmDVerse portal'
    };
    setRegistrationRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  // Method A Review: Super Admin Approve / Reject / Request Additional Info
  const reviewRegistrationRequest = (requestId, status, notes = '') => {
    let approvedCollege = null;

    setRegistrationRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const updated = { ...req, status, reviewNotes: notes, reviewedDate: new Date().toISOString() };
        if (status === 'Approved') {
          // Create candidate college object waiting for subscription
          const slug = req.collegeName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
          approvedCollege = {
            id: `COL-${String(colleges.length + 1).padStart(3, '0')}`,
            name: req.collegeName,
            slug: slug || `college-${Date.now()}`,
            logo: req.collegeName.substring(0, 3).toUpperCase(),
            domain: `${slug || 'college'}.pharmdverse.com`,
            status: 'pending_subscription',
            plan: req.requestedPlan || 'Standard',
            startDate: '',
            expiryDate: '',
            renewalDate: '',
            students: 0,
            studentsLimit: 500,
            preceptors: 0,
            cases: 0,
            storageUsed: '0 GB',
            storageLimit: '100 GB',
            primaryAdmin: {
              name: req.contactPerson,
              email: req.email,
              phone: req.phone,
              username: `${slug}_admin`,
              status: 'Pending Provisioning'
            },
            address: `${req.city || ''}, ${req.state || ''}, ${req.country || ''}`,
            email: req.email,
            phone: req.phone,
            registeredDate: new Date().toISOString().split('T')[0],
            about: `${req.collegeName} clinical pharmacy training portal.`,
            principalMessage: `Welcome to ${req.collegeName}.`,
            bannerText: `Excellence in Pharmaceutical Care`
          };
        }
        return updated;
      }
      return req;
    }));

    if (approvedCollege) {
      setColleges(prev => [approvedCollege, ...prev]);
    }
    return approvedCollege;
  };

  // Method B: Register New College Directly (No approval workflow needed)
  const registerCollegeDirect = (collegeData) => {
    const slug = (collegeData.slug || collegeData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''));
    const newCollege = {
      id: collegeData.id || `COL-${String(colleges.length + 1).padStart(3, '0')}`,
      name: collegeData.name,
      slug,
      logo: collegeData.logo || collegeData.name.substring(0, 3).toUpperCase(),
      domain: collegeData.domain || `${slug}.pharmdverse.com`,
      status: 'pending_subscription',
      plan: collegeData.plan || 'Standard',
      startDate: '',
      expiryDate: '',
      renewalDate: '',
      students: 0,
      studentsLimit: collegeData.studentsLimit || 500,
      preceptors: 0,
      cases: 0,
      storageUsed: '0 GB',
      storageLimit: collegeData.storageLimit || '100 GB',
      primaryAdmin: {
        name: collegeData.adminName || 'College Admin',
        email: collegeData.adminEmail || collegeData.email,
        phone: collegeData.adminPhone || collegeData.phone,
        username: collegeData.adminUsername || `${slug}_admin`,
        status: 'Pending Provisioning'
      },
      address: collegeData.address || '',
      email: collegeData.email,
      phone: collegeData.phone,
      registeredDate: new Date().toISOString().split('T')[0],
      about: collegeData.about || `${collegeData.name} clinical pharmacy portal.`,
      principalMessage: collegeData.principalMessage || `Welcome to ${collegeData.name}.`,
      bannerText: collegeData.bannerText || `Excellence in Pharmacy Practice`
    };

    setColleges(prev => [newCollege, ...prev]);
    return newCollege;
  };

  // Condition 3 & 4: Assign Subscription & Create Primary College Admin
  const assignSubscription = (collegeId, subData, primaryAdminData = null) => {
    const college = colleges.find(c => c.id === collegeId);
    if (!college) return false;

    const startDate = subData.startDate || new Date().toISOString().split('T')[0];
    const expiryDate = subData.expiryDate || new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0];

    const newSubscription = {
      id: `SUB-${collegeId}-${Date.now()}`,
      collegeId: college.id,
      collegeName: college.name,
      plan: subData.plan || 'Enterprise',
      startDate,
      expiryDate,
      renewal: subData.renewal || 'Auto-Renew (Annual)',
      status: 'Active',
      invoiceReference: subData.invoiceReference || `INV-${Date.now()}`,
      paymentStatus: subData.paymentStatus || 'Paid',
      amount: subData.amount || '₹2,50,000 / year'
    };

    // Update subscription list
    setSubscriptions(prev => [newSubscription, ...prev.filter(s => s.collegeId !== collegeId)]);

    // Automatically create Primary College Admin if provided or generated
    const adminFullName = primaryAdminData?.fullName || college.primaryAdmin?.name || `${college.name} Admin`;
    const adminEmail = primaryAdminData?.email || college.primaryAdmin?.email || `admin@${college.slug}.edu`;
    const adminMobile = primaryAdminData?.mobile || college.primaryAdmin?.phone || '+91 98765 00000';
    const adminUsername = primaryAdminData?.username || college.primaryAdmin?.username || `${college.slug}_admin`;
    const adminPassword = primaryAdminData?.password || 'Admin@123';

    const newPrimaryAdminUser = {
      id: `ADM_${collegeId}`,
      collegeId: college.id,
      role: 'admin',
      name: adminFullName,
      email: adminEmail,
      phone: adminMobile,
      username: adminUsername,
      password: adminPassword,
      hospital: 'All',
      department: 'All',
      status: 'Active',
      createdDate: new Date().toISOString()
    };

    setUsers(prev => [newPrimaryAdminUser, ...prev.filter(u => u.id !== `ADM_${collegeId}`)]);

    // Activate College Portal
    setColleges(prev => prev.map(c => {
      if (c.id === collegeId) {
        return {
          ...c,
          status: 'active',
          plan: newSubscription.plan,
          startDate,
          expiryDate,
          renewalDate: expiryDate,
          primaryAdmin: {
            name: adminFullName,
            email: adminEmail,
            phone: adminMobile,
            username: adminUsername,
            status: 'Active'
          }
        };
      }
      return c;
    }));

    return true;
  };

  // Role Permission Matrix update (Super Admin only)
  const updateRolePermissions = (newMatrix) => {
    setRolePermissions(newMatrix);
  };

  // --- CONDITION 10.B: College Activity Timeline Helper ---
  const addCollegeTimelineEvent = (collegeId, event, details, performedBy = 'Super Admin') => {
    const now = new Date();
    const newEvent = {
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      performedBy: currentUser?.name || performedBy,
      event,
      details
    };

    setColleges(prev => prev.map(c => {
      if (c.id === collegeId) {
        return {
          ...c,
          timeline: [newEvent, ...(c.timeline || [])]
        };
      }
      return c;
    }));
  };

  // --- CONDITION 10.A: College Status Lifecycle Management ---
  // Statuses: 'Pending Approval' | 'Approved' | 'Subscription Pending' | 'Active' | 'Subscription Expired' | 'Suspended' | 'Archived'
  const updateCollegeStatus = (collegeId, newStatus, notes = '') => {
    setColleges(prev => prev.map(c => {
      if (c.id === collegeId) {
        return {
          ...c,
          status: newStatus.toLowerCase().replace(/ /g, '_'),
          statusLabel: newStatus
        };
      }
      return c;
    }));

    addCollegeTimelineEvent(collegeId, 'Status Changed', `Status updated to ${newStatus}. ${notes}`.trim());
  };

  // --- CONDITION 9: Landing Page Settings, Draft & Publishing ---
  const updateCollegeLandingPageDraft = (collegeId, draftData) => {
    setColleges(prev => prev.map(c => {
      if (c.id === collegeId) {
        return {
          ...c,
          landingPageDraft: {
            ...c.landingPageDraft,
            ...draftData
          }
        };
      }
      return c;
    }));
  };

  const publishCollegeLandingPage = (collegeId, publishedData) => {
    setColleges(prev => prev.map(c => {
      if (c.id === collegeId) {
        const dataToPublish = publishedData || c.landingPageDraft || c;
        return {
          ...c,
          ...dataToPublish,
          landingPageContent: { ...dataToPublish },
          landingPagePublishedDate: new Date().toISOString()
        };
      }
      return c;
    }));

    addCollegeTimelineEvent(collegeId, 'Landing Page Published', 'Published institution landing page settings live.');
  };

  // --- CONDITION 8: Enterprise Release Management ---
  const testRelease = (releaseId) => {
    setReleases(prev => prev.map(r => {
      if (r.id === releaseId) {
        return {
          ...r,
          tested: true,
          deploymentStatus: r.deploymentStatus === 'Pending' ? 'Tested' : r.deploymentStatus
        };
      }
      return r;
    }));
  };

  const deployReleaseToProduction = (releaseId) => {
    const rel = releases.find(r => r.id === releaseId);
    if (!rel) return { success: false, message: 'Release not found.' };

    if (!rel.tested && rel.deploymentStatus !== 'Tested') {
      return { success: false, message: 'Only successfully tested releases can be deployed to production.' };
    }

    const versionStr = rel.versionNumber;

    // 1. Update release status
    setReleases(prev => prev.map(r => {
      if (r.id === releaseId) {
        return {
          ...r,
          deploymentStatus: 'Deployed',
          releaseDate: new Date().toISOString().split('T')[0],
          rollbackStatus: 'Available'
        };
      }
      return r;
    }));

    // 2. Update platform version in global settings
    setPlatformSettings(prev => ({
      ...prev,
      erpVersion: versionStr
    }));

    // 3. Automatically update every ACTIVE college & log timeline event
    const activeCollegesList = getActiveColleges();
    activeCollegesList.forEach(col => {
      addCollegeTimelineEvent(col.id, 'Platform Update', `Updated to PharmDVerse ERP v${versionStr}`);
    });

    // 4. Automatically notify all College Admins (Condition 10.D)
    const collegeAdmins = users.filter(u => u.role === 'admin');
    collegeAdmins.forEach(adminUser => {
      sendNotification({
        recipientId: adminUser.id,
        senderId: 'SYS001',
        senderName: 'PharmDVerse Release Engine',
        senderRole: 'System',
        title: `Platform Updated to Version ${versionStr}`,
        message: `PharmDVerse ERP has been updated to v${versionStr}. Release Notes: ${rel.releaseNotes}`,
        category: 'System Alert'
      });
    });

    return { success: true, count: activeCollegesList.length };
  };

  const rollbackRelease = (releaseId) => {
    setReleases(prev => prev.map(r => {
      if (r.id === releaseId) {
        return {
          ...r,
          deploymentStatus: 'Rolled Back',
          rollbackStatus: 'Rolled Back'
        };
      }
      return r;
    }));

    const activeCollegesList = getActiveColleges();
    activeCollegesList.forEach(col => {
      addCollegeTimelineEvent(col.id, 'Platform Rollback', `Rolled back release ${releaseId}`);
    });

    return { success: true };
  };

  // --- CONDITION 11.B: Enterprise Backup & Restore Engine ---
  const createPlatformBackup = (options = {}) => {
    const scope = options.scope || 'Full Platform';
    const collegeId = options.collegeId;
    const col = collegeId ? colleges.find(c => c.id === collegeId) : null;
    const now = new Date();
    
    const timestampStr = now.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const backupName = col ? `${col.slug.toUpperCase()}-SNAPSHOT-${timestampStr}.bak` : `FULL-PLATFORM-BACKUP-${timestampStr}.bak`;

    const newBackup = {
      id: `BAK-${Date.now()}`,
      name: backupName,
      date: now.toISOString(),
      size: col ? '380 MB' : '1.25 GB',
      createdBy: currentUser?.name || 'Super Admin',
      type: col ? `College Specific (${col.slug.toUpperCase()})` : 'Full Platform',
      status: 'Completed',
      scope: col ? `${col.name} Tenant Data (Cases, Users, Settings)` : 'Full Platform (Database, Cases, Landing Pages, Config)'
    };

    setBackups(prev => [newBackup, ...prev]);
    logAudit('BACKUP_CREATED', null, newBackup, currentUser?.name || 'Super Admin');

    return newBackup;
  };

  const deleteBackup = (backupId) => {
    const bak = backups.find(b => b.id === backupId);
    setBackups(prev => prev.filter(b => b.id !== backupId));
    if (bak) {
      logAudit('BACKUP_DELETED', bak, null, currentUser?.name || 'Super Admin');
    }
  };

  const restoreBackup = ({ backupId, createPreRestoreSnapshot = true }) => {
    const bak = backups.find(b => b.id === backupId);
    if (!bak) return { success: false, message: 'Backup point not found.' };

    // 1. Create pre-restore snapshot if requested
    let preRestoreSnap = null;
    if (createPreRestoreSnapshot) {
      preRestoreSnap = createPlatformBackup({ scope: 'Pre-Restore Auto Snapshot' });
    }

    // 2. Perform safe restore simulation
    setPlatformSettings(prev => ({
      ...prev,
      lastRestorePoint: bak.name,
      lastRestoreDate: new Date().toISOString()
    }));

    logAudit('BACKUP_RESTORED', null, { restoredFrom: bak.name, preRestoreSnapshot: preRestoreSnap?.name || 'None' }, currentUser?.name || 'Super Admin');

    return { success: true, backupName: bak.name, preRestoreSnapshot: preRestoreSnap?.name };
  };

  // --- CONDITION 7: Maintenance Mode & Backup ---
  const toggleMaintenanceMode = (enabled, customMessage) => {
    setPlatformSettings(prev => ({
      ...prev,
      maintenanceMode: enabled,
      maintenanceMessage: customMessage || prev.maintenanceMessage
    }));
  };

  // Getters
  const getCollegeBySlug = (slug) => {
    return colleges.find(c => c.slug.toLowerCase() === slug.toLowerCase());
  };

  const getCollegeById = (id) => {
    return colleges.find(c => c.id === id);
  };

  const getActiveColleges = () => {
    return colleges.filter(c => {
      if (c.status !== 'active') return false;
      const sub = subscriptions.find(s => s.collegeId === c.id);
      if (sub && sub.status === 'Expired') return false;
      return true;
    });
  };

  const rollbackLastMassPromotion = () => {
    if (currentUser?.role !== 'admin') return;
    if (!snapshot) throw new Error('No recent mass promotion found to rollback.');
    setUsers(snapshot);
    setSnapshot(null);
    // Note: This leaves the logs and notifications intact for audit purposes, 
    // but we could also optionally prune the logs.
    
    // Create a rollback log
    const log = {
      id: `LOG${Date.now()}_ROLLBACK`,
      studentId: 'ALL',
      studentName: 'Mass Rollback',
      previousYear: '-',
      newYear: '-',
      previousAcademicYear: '-',
      newAcademicYear: '-',
      type: 'Rollback',
      date: new Date().toISOString(),
      performedBy: currentUser ? currentUser.name : 'Admin'
    };
    setPromotionLogs(prev => [log, ...prev]);
  };

  // --- GETTERS (Derived State) ---
  
  const getStudentCases = (studentId) => cases.filter(c => c.studentId === studentId);
  const getPreceptorAssignedStudents = (preceptorId) => users.filter(u => (u.preceptorId === preceptorId || u.assignedPreceptorId === preceptorId) && u.role === 'student' && u.status !== 'Inactive');
  const getPreceptorAssignedCases = (preceptorId) => {
    const activeStudentIds = getPreceptorAssignedStudents(preceptorId).map(s => s.id);
    return cases.filter(c => c.preceptorId === preceptorId && activeStudentIds.includes(c.studentId));
  };
  const getUserNotifications = (userId) => notifications.filter(n => n.recipientId === userId).sort((a,b) => new Date(b.date) - new Date(a.date));
  const getActiveAcademicYear = () => academicYears.find(ay => ay.status === 'Active') || academicYears[0];

  return (
    <DatabaseContext.Provider value={{
      users,
      cases,
      notifications,
      academicYears,
      promotionLogs,
      snapshot,
      colleges,
      registrationRequests,
      subscriptions,
      rolePermissions,
      releases,
      platformSettings,
      backups,
      testingSession,
      setTestingSession,
      submitRegistrationRequest,
      reviewRegistrationRequest,
      registerCollegeDirect,
      assignSubscription,
      updateRolePermissions,
      addCollegeTimelineEvent,
      updateCollegeStatus,
      updateCollegeLandingPageDraft,
      publishCollegeLandingPage,
      testRelease,
      deployReleaseToProduction,
      rollbackRelease,
      toggleMaintenanceMode,
      createPlatformBackup,
      deleteBackup,
      restoreBackup,
      getCollegeBySlug,
      getCollegeById,
      getActiveColleges,
      getPreceptorAssignedCases,
      submitCase,
      saveDraftCase,
      markCaseUnderReview,
      updateCaseStatus,
      updateFormStatus,
      sendNotification,
      markNotificationRead,
      markAllNotificationsRead,
      deleteNotification,
      deleteAllReadNotifications,
      updateUser,
      addUser,
      deleteUser,
      resetUserPassword,
      addAcademicYear,
      updateAcademicYear,
      activateAcademicYear,
      manualPromoteStudent,
      manualDepromoteStudent,
      rollbackLastMassPromotion,
      getStudentCases,
      getPreceptorAssignedStudents,
      getUserNotifications,
      getActiveAcademicYear,
      COURSE_YEARS
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};
