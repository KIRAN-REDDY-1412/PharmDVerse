// Initial Seed Data for the ERP System
export const INITIAL_USERS = [
  { id: 'STU001', role: 'student', name: 'Arun Kumar', hospital: 'City General Hospital', department: 'General Medicine', batch: 'Y25', assignedPreceptorId: 'PRE001' },
  { id: 'PRE001', role: 'preceptor', name: 'Dr. Ramesh Patel', hospital: 'City General Hospital', department: 'General Medicine' },
  { id: 'ADM001', role: 'admin', name: 'College Admin', hospital: 'All', department: 'All' },
  { id: 'SYS001', role: 'system', name: 'PharmDVerse System', hospital: 'System', department: 'System' }
];

export const INITIAL_CASES = [
  { 
    id: 'CC001', 
    studentId: 'STU001', 
    preceptorId: 'PRE001',
    docType: 'Patient Profile',
    hospital: 'City General Hospital', 
    department: 'General Medicine', 
    status: 'Approved', 
    submittedDate: '2026-07-20T10:00:00',
    patientName: 'John Doe',
    age: 45,
    gender: 'Male',
    diagnosis: 'Hypertension',
    remarks: 'Good documentation.'
  },
  { 
    id: 'CC002', 
    studentId: 'STU001', 
    preceptorId: 'PRE001',
    docType: 'Pharmacist Intervention',
    hospital: 'City General Hospital', 
    department: 'General Medicine', 
    status: 'Returned', 
    submittedDate: '2026-07-22T14:30:00',
    patientName: 'Jane Smith',
    age: 62,
    gender: 'Female',
    diagnosis: 'Type 2 Diabetes',
    remarks: 'Please elaborate on the proposed intervention for metformin dosage.'
  },
  { 
    id: 'CC003', 
    studentId: 'STU001', 
    preceptorId: 'PRE001',
    docType: 'Adverse Drug Reaction',
    hospital: 'City General Hospital', 
    department: 'General Medicine', 
    status: 'Submitted', 
    submittedDate: '2026-07-24T09:15:00',
    patientName: 'Michael Brown',
    age: 55,
    gender: 'Male',
    diagnosis: 'Asthma',
    remarks: ''
  }
];

export const INITIAL_NOTIFICATIONS = [
  { 
    id: 'NOTIF001', 
    recipientId: 'STU001', 
    senderId: 'SYS001', 
    senderName: 'PharmDVerse System', 
    senderRole: 'System', 
    title: 'System Maintenance Scheduled', 
    category: 'System Alert', 
    status: 'Unread', 
    date: '2026-07-24T10:30:00' 
  },
  { 
    id: 'NOTIF002', 
    recipientId: 'STU001', 
    senderId: 'PRE001', 
    senderName: 'Dr. Ramesh Patel', 
    senderRole: 'Preceptor', 
    title: 'Case Approval: Patient Profile CC001', 
    category: 'Clinical Cases', 
    status: 'Read', 
    date: '2026-07-20T11:00:00' 
  },
  { 
    id: 'NOTIF003', 
    recipientId: 'STU001', 
    senderId: 'PRE001', 
    senderName: 'Dr. Ramesh Patel', 
    senderRole: 'Preceptor', 
    title: 'Action Required: Returned Intervention CC002', 
    category: 'Returned Case', 
    status: 'Unread', 
    date: '2026-07-22T15:00:00' 
  },
  { 
    id: 'NOTIF004', 
    recipientId: 'PRE001', 
    senderId: 'STU001', 
    senderName: 'Arun Kumar', 
    senderRole: 'Student', 
    title: 'New Case Submitted: ADR CC003', 
    category: 'Clinical Cases', 
    status: 'Unread', 
    date: '2026-07-24T09:15:00' 
  }
];
