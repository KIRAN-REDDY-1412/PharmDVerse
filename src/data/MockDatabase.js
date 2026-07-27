// Initial Seed Data for the ERP System
export const INITIAL_COLLEGES = [
  {
    id: 'COL-001',
    name: 'AMR College of Pharmacy',
    slug: 'amr',
    logo: 'AMR',
    domain: 'amrpharmacy.edu',
    status: 'active',
    plan: 'Enterprise',
    startDate: '2026-01-01',
    renewalDate: '2027-01-01',
    expiryDate: '2027-01-01',
    students: 450,
    studentsLimit: 'Unlimited',
    preceptors: 35,
    cases: 12400,
    storageUsed: '25 GB',
    storageLimit: 'Unlimited',
    primaryAdmin: {
      name: 'Dr. S. K. Rao',
      email: 'admin@amrpharmacy.edu',
      phone: '+91 98765 43210',
      username: 'amr_admin',
      status: 'Active'
    },
    address: 'Kukatpally, Hyderabad, TS, India - 500072',
    email: 'info@amrpharmacy.edu',
    phone: '+91 98765 43210',
    registeredDate: '2025-06-15',
    about: 'AMR College of Pharmacy is a premier institution dedicated to excellence in clinical pharmacy education, advanced research, and patient care.',
    principalMessage: 'Welcome to AMR College of Pharmacy. We empower future clinical pharmacists with state-of-the-art training and digital health tools.',
    bannerText: 'Leading Excellence in Pharmacy Education & Clinical rotations',
    principalPhoto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    website: 'https://amrpharmacy.edu',
    socialLinks: { facebook: 'https://facebook.com/amrpharmacy', twitter: 'https://twitter.com/amrpharmacy', linkedin: 'https://linkedin.com/school/amrpharmacy' },
    footerText: '© 2026 AMR College of Pharmacy. All Rights Reserved. Affiliated with PCI & JNTUH.',
    campusImages: [
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { date: '2025-06-15', time: '10:30 AM', performedBy: 'Super Admin', event: 'Registration', details: 'College registration request submitted via Method A' },
      { date: '2025-06-16', time: '02:15 PM', performedBy: 'Super Admin', event: 'Approval', details: 'Registration request approved' },
      { date: '2026-01-01', time: '09:00 AM', performedBy: 'Super Admin', event: 'Subscription', details: 'Assigned Enterprise Plan (Valid until 2027-01-01)' },
      { date: '2026-01-01', time: '09:05 AM', performedBy: 'Super Admin', event: 'Admin Created', details: 'Primary Admin ADM_COL-001 provisioned' },
      { date: '2026-01-05', time: '11:20 AM', performedBy: 'Super Admin', event: 'Landing Page Published', details: 'Custom institution landing page published at /amr' },
      { date: '2026-07-27', time: '10:00 AM', performedBy: 'Super Admin', event: 'Platform Update', details: 'Updated to PharmDVerse ERP v2.1.0' }
    ]
  },
  {
    id: 'COL-002',
    name: 'GITAM School of Pharmacy',
    slug: 'gitam',
    logo: 'GITAM',
    domain: 'gitampharmacy.edu',
    status: 'active',
    plan: 'Professional',
    startDate: '2026-02-01',
    renewalDate: '2027-02-01',
    expiryDate: '2027-02-01',
    students: 620,
    studentsLimit: 1000,
    preceptors: 48,
    cases: 18500,
    storageUsed: '38 GB',
    storageLimit: '250 GB',
    primaryAdmin: {
      name: 'Dr. V. Sharma',
      email: 'admin@gitampharmacy.edu',
      phone: '+91 89123 45678',
      username: 'gitam_admin',
      status: 'Active'
    },
    address: 'Rushikonda, Visakhapatnam, AP, India - 530045',
    email: 'contact@gitampharmacy.edu',
    phone: '+91 89123 45678',
    registeredDate: '2025-08-20',
    about: 'GITAM School of Pharmacy offers world-class infrastructure and comprehensive clinical rotation programs for Pharm.D scholars.',
    principalMessage: 'Empowering healthcare through research-driven pharmaceutical care and patient counselling.',
    bannerText: 'Innovating Healthcare & Pharmacy Leadership',
    principalPhoto: '',
    website: 'https://gitampharmacy.edu',
    socialLinks: { facebook: '', twitter: '', linkedin: '' },
    footerText: '© 2026 GITAM School of Pharmacy. All Rights Reserved.',
    campusImages: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { date: '2025-08-20', time: '11:00 AM', performedBy: 'Super Admin', event: 'Registration', details: 'Direct registration via Method B' },
      { date: '2026-02-01', time: '10:00 AM', performedBy: 'Super Admin', event: 'Subscription', details: 'Assigned Professional Plan' },
      { date: '2026-02-01', time: '10:05 AM', performedBy: 'Super Admin', event: 'Admin Created', details: 'Primary Admin ADM_COL-002 provisioned' },
      { date: '2026-07-27', time: '10:00 AM', performedBy: 'Super Admin', event: 'Platform Update', details: 'Updated to PharmDVerse ERP v2.1.0' }
    ]
  },
  {
    id: 'COL-003',
    name: 'Vignan Pharmacy College',
    slug: 'vignan',
    logo: 'VPC',
    domain: 'vignanpharmacy.edu',
    status: 'active',
    plan: 'Standard',
    startDate: '2026-03-01',
    renewalDate: '2027-03-01',
    expiryDate: '2027-03-01',
    students: 310,
    studentsLimit: 500,
    preceptors: 24,
    cases: 9200,
    storageUsed: '14 GB',
    storageLimit: '100 GB',
    primaryAdmin: {
      name: 'Dr. P. Reddy',
      email: 'admin@vignanpharmacy.edu',
      phone: '+91 86321 09876',
      username: 'vignan_admin',
      status: 'Active'
    },
    address: 'Vadlamudi, Guntur, AP, India - 522213',
    email: 'admin@vignanpharmacy.edu',
    phone: '+91 86321 09876',
    registeredDate: '2026-01-10',
    about: 'Vignan Pharmacy College is committed to producing compassionate and skilled pharmacy professionals.',
    principalMessage: 'Fostering innovation, clinical rigor, and ethical practice in modern pharmacy.',
    bannerText: 'Dedicated to Clinical Distinction & Pharmacovigilance',
    campusImages: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'
    ],
    timeline: [
      { date: '2026-01-10', time: '03:00 PM', performedBy: 'Super Admin', event: 'Registration', details: 'Registered via Method A' },
      { date: '2026-03-01', time: '09:30 AM', performedBy: 'Super Admin', event: 'Subscription', details: 'Assigned Standard Plan' },
      { date: '2026-07-27', time: '10:00 AM', performedBy: 'Super Admin', event: 'Platform Update', details: 'Updated to PharmDVerse ERP v2.1.0' }
    ]
  },
  {
    id: 'COL-004',
    name: 'Midwest Pharmacy Academy',
    slug: 'midwest',
    logo: 'MPA',
    domain: 'midwestpharm.org',
    status: 'expired',
    plan: 'Standard',
    startDate: '2025-05-01',
    renewalDate: '2026-05-01 (Expired)',
    expiryDate: '2026-05-01',
    students: 200,
    studentsLimit: 500,
    preceptors: 15,
    cases: 4100,
    storageUsed: '12 GB',
    storageLimit: '100 GB',
    primaryAdmin: {
      name: 'Dr. Robert Hale',
      email: 'rhale@midwestpharm.org',
      phone: '+1 (312) 555-0456',
      username: 'midwest_admin',
      status: 'Suspended'
    },
    address: 'Chicago, IL 60601, USA',
    email: 'info@midwestpharm.org',
    phone: '+1 312 555 0456',
    registeredDate: '2025-05-01',
    about: 'Midwest Pharmacy Academy subscription test entry (Expired State).',
    principalMessage: 'Notice: Renewal required.',
    bannerText: 'Midwest Clinical Training Portal',
    campusImages: [],
    timeline: [
      { date: '2025-05-01', time: '10:00 AM', performedBy: 'Super Admin', event: 'Registration', details: 'Registered on platform' },
      { date: '2026-05-01', time: '12:00 AM', performedBy: 'System', event: 'Subscription Expired', details: 'Subscription lapsed without renewal' }
    ]
  }
];

export const INITIAL_REGISTRATION_REQUESTS = [
  {
    id: 'REQ-2026-001',
    collegeName: 'Oxford College of Pharmacy',
    contactPerson: 'Dr. James Wilson',
    email: 'j.wilson@oxfordpharmacy.edu',
    phone: '+91 98765 11111',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    estimatedStudents: 450,
    requestedPlan: 'Enterprise',
    status: 'Pending',
    submittedDate: '2026-07-25T10:30:00',
    notes: 'Requesting cloud onboarding for Pharm.D 6-year batch and clinical hospital affiliations.'
  },
  {
    id: 'REQ-2026-002',
    collegeName: 'SRM Institute of Pharmaceutical Sciences',
    contactPerson: 'Dr. Meenakshi Sundaram',
    email: 'm.sundaram@srmpharmacy.edu',
    phone: '+91 98765 22222',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    estimatedStudents: 700,
    requestedPlan: 'Enterprise',
    status: 'Pending',
    submittedDate: '2026-07-26T14:15:00',
    notes: 'Seeking multi-preceptor evaluation workflow integration for 3 tertiary teaching hospitals.'
  }
];

export const INITIAL_SUBSCRIPTIONS = [
  {
    id: 'SUB-COL-001',
    collegeId: 'COL-001',
    collegeName: 'AMR College of Pharmacy',
    plan: 'Enterprise',
    startDate: '2026-01-01',
    expiryDate: '2027-01-01',
    renewal: 'Auto-Renew (Annual)',
    status: 'Active',
    invoiceReference: 'INV-2026-0014',
    paymentStatus: 'Paid',
    amount: '₹2,50,000 / year'
  },
  {
    id: 'SUB-COL-002',
    collegeId: 'COL-002',
    collegeName: 'GITAM School of Pharmacy',
    plan: 'Professional',
    startDate: '2026-02-01',
    expiryDate: '2027-02-01',
    renewal: 'Auto-Renew (Annual)',
    status: 'Active',
    invoiceReference: 'INV-2026-0028',
    paymentStatus: 'Paid',
    amount: '₹1,50,000 / year'
  },
  {
    id: 'SUB-COL-003',
    collegeId: 'COL-003',
    collegeName: 'Vignan Pharmacy College',
    plan: 'Standard',
    startDate: '2026-03-01',
    expiryDate: '2027-03-01',
    renewal: 'Manual Renewal',
    status: 'Active',
    invoiceReference: 'INV-2026-0041',
    paymentStatus: 'Paid',
    amount: '₹80,000 / year'
  },
  {
    id: 'SUB-COL-004',
    collegeId: 'COL-004',
    collegeName: 'Midwest Pharmacy Academy',
    plan: 'Standard',
    startDate: '2025-05-01',
    expiryDate: '2026-05-01',
    renewal: 'Overdue',
    status: 'Expired',
    invoiceReference: 'INV-2025-0899',
    paymentStatus: 'Overdue',
    amount: '$5,000 / year'
  }
];

export const INITIAL_ROLE_PERMISSIONS = {
  superadmin: {
    dashboardAccess: true,
    manageColleges: true,
    manageSubscriptions: true,
    manageGlobalUsers: true,
    rolePermissionMatrix: true,
    platformSettings: true,
    analyticsReports: true,
    auditLogs: true,
    caseRepositoryView: true
  },
  admin: {
    dashboardAccess: true,
    manageCollegePreceptors: true,
    manageCollegeStudents: true,
    assignStudentsToPreceptors: true,
    viewCollegeCases: true,
    viewCollegeReports: true,
    manageAcademicYears: true,
    manageCollegeSettings: true,
    backupRestore: true,
    rolePermissionMatrix: false
  },
  preceptor: {
    dashboardAccess: true,
    viewAssignedStudents: true,
    reviewClinicalCases: true,
    approveRejectForms: true,
    provideFeedbackComments: true,
    viewCaseAnalytics: true,
    rolePermissionMatrix: false
  },
  student: {
    dashboardAccess: true,
    createClinicalCase: true,
    submitCaseForms: true,
    viewCaseStatus: true,
    viewPersonalLibrary: true,
    manageProfile: true,
    rolePermissionMatrix: false
  }
};

export const INITIAL_USERS = [
  { id: 'STU001', collegeId: 'COL-001', role: 'student', name: 'Arun Kumar', email: 'arun.kumar@pharmdverse.com', phone: '9876543210', course: 'Pharm.D', year: '4th Year', hospital: 'City General Hospital', department: 'General Medicine', batch: 'Y25', status: 'Active', assignedPreceptorId: 'PRE001' },
  { id: 'STU002', collegeId: 'COL-001', role: 'student', name: 'Priya Sharma', email: 'priya.sharma@pharmdverse.com', phone: '9876543211', course: 'Pharm.D', year: '3rd Year', hospital: 'Apollo Hospital', department: 'Cardiology', batch: 'Y26', status: 'Active', assignedPreceptorId: 'PRE001' },
  { id: 'STU003', collegeId: 'COL-001', role: 'student', name: 'Rahul Verma', email: 'rahul.verma@pharmdverse.com', phone: '9876543212', course: 'M.Pharm', year: '2nd Year', hospital: 'City General Hospital', department: 'Oncology', batch: 'Y25', status: 'Active', assignedPreceptorId: 'PRE001' },
  { id: 'STU004', collegeId: 'COL-001', role: 'student', name: 'Sneha Reddy', email: 'sneha.reddy@pharmdverse.com', phone: '9876543213', course: 'Pharm.D', year: '5th Year', hospital: 'KIMS Hospital', department: 'Pediatrics', batch: 'Y24', status: 'Active', assignedPreceptorId: 'PRE001' },
  { id: 'STU005', collegeId: 'COL-001', role: 'student', name: 'Vikram Singh', email: 'vikram.singh@pharmdverse.com', phone: '9876543214', course: 'B.Pharm', year: '4th Year', hospital: 'Yashoda Hospital', department: 'General Medicine', batch: 'Y25', status: 'Inactive', assignedPreceptorId: 'PRE001' },
  { id: 'STU006', collegeId: 'COL-001', role: 'student', name: 'Ananya Patel', email: 'ananya.patel@pharmdverse.com', phone: '9876543215', course: 'Pharm.D', year: '3rd Year', hospital: 'City General Hospital', department: 'Neurology', batch: 'Y26', status: 'Active', assignedPreceptorId: 'PRE001' },
  { id: 'STU007', collegeId: 'COL-001', role: 'student', name: 'Karthik Nair', email: 'karthik.nair@pharmdverse.com', phone: '9876543216', course: 'D.Pharm', year: '2nd Year', hospital: 'Apollo Hospital', department: 'Dermatology', batch: 'Y27', status: 'Active', assignedPreceptorId: 'PRE001' },
  { id: 'STU008', collegeId: 'COL-001', role: 'student', name: 'Meera Joshi', email: 'meera.joshi@pharmdverse.com', phone: '9876543217', course: 'Pharm.D', year: '4th Year', hospital: 'KIMS Hospital', department: 'Endocrinology', batch: 'Y25', status: 'Active', assignedPreceptorId: 'PRE001' },
  { id: 'PRE001', collegeId: 'COL-001', role: 'preceptor', name: 'Dr. Ramesh Patel', email: 'ramesh.patel@pharmdverse.com', phone: '9876500001', hospital: 'City General Hospital', department: 'General Medicine', status: 'Active' },
  { id: 'ADM001', collegeId: 'COL-001', role: 'admin', name: 'AMR College Admin', email: 'admin@amrpharmacy.edu', hospital: 'All', department: 'All', status: 'Active' },
  { id: 'ADM002', collegeId: 'COL-002', role: 'admin', name: 'GITAM College Admin', email: 'admin@gitampharmacy.edu', hospital: 'All', department: 'All', status: 'Active' },
  { id: 'ADM003', collegeId: 'COL-003', role: 'admin', name: 'Vignan College Admin', email: 'admin@vignanpharmacy.edu', hospital: 'All', department: 'All', status: 'Active' },
  { id: 'SYS001', collegeId: 'ALL', role: 'system', name: 'PharmDVerse System', hospital: 'System', department: 'System', status: 'Active' }
];

export const INITIAL_CASES = [
  { 
    id: 'CASE-2026-000145', 
    studentId: 'STU001', 
    rollNo: '22M21A0001',
    preceptorId: 'PRE001',
    hospital: 'City General Hospital', 
    department: 'General Medicine', 
    status: 'Pending', 
    submittedDate: '2026-07-20T10:00:00',
    patientName: 'John Doe',
    age: 45,
    gender: 'Male',
    diagnosis: 'Hypertension',
    overallRemarks: '',
    history: [
      { date: '2026-07-20T10:00:00', action: 'Student Submitted Patient Profile Form', user: 'Arun Kumar' }
    ],
    forms: {
      patientProfile: { 
        status: 'Submitted', 
        data: { 
          patientInformation: 'John Doe, 45, Male, Admitted to General Medicine',
          chiefComplaints: 'Severe headache, dizziness, and blurred vision for 2 days. No history of LOC or vomiting.', 
          pastMedicalHistory: 'Hypertension (5 years), Type 2 Diabetes Mellitus (3 years), Appendectomy in 2015',
          pastMedicationHistory: 'Tab. Amlodipine 5mg OD (Irregular compliant)',
          familyMedicalHistory: 'Father had myocardial infarction at age 55',
          socialHistory: 'Smoker (1 pack/day for 10 years), Occasional alcohol use',
          allergies: 'Penicillin (Causes severe skin rash)',
          physicalExamination: 'Patient is conscious and oriented. CVS: S1S2 normal. RS: Bilateral air entry equal, clear. CNS: No focal neurological deficits.',
          vitalSigns: 'BP: 180/110 mmHg, HR: 92 bpm, Temp: 98.6°F, RR: 18/min, SpO2: 98% on RA',
          laboratoryInvestigations: 'Serum Creatinine: 1.1 mg/dL, BUN: 18 mg/dL, Fasting Blood Sugar: 145 mg/dL, HbA1c: 7.2%, Lipid Profile: Total Cholesterol 220 mg/dL',
          otherInvestigations: 'ECG: Left ventricular hypertrophy, no acute ischemic changes.',
          finalDiagnosis: 'Hypertensive Crisis, Uncontrolled Essential Hypertension',
          drugsPrescribed: 'Tab. Amlodipine 5mg OD, Tab. Telmisartan 40mg OD, Tab. Metformin 500mg BD',
          dischargeSummary: 'Patient stabilized. Advised strict BP monitoring every 4 hours. Requires urgent counselling on lifestyle and dietary modifications. Review in OPD after 1 week.'
        }, 
        comments: '' 
      },
      patientCounselling: { 
        status: 'Submitted', 
        data: {
          counsellingTopic: 'Hypertension Management and Lifestyle Modifications',
          medicationInformation: 'Explained the importance of taking Amlodipine and Telmisartan daily in the morning. Warned about potential ankle swelling with Amlodipine.',
          dietaryAdvice: 'Advised DASH diet (Dietary Approaches to Stop Hypertension). Recommended reducing sodium intake to less than 1.5g/day. Emphasized increasing fresh fruits and vegetables.',
          lifestyleModifications: 'Strongly advised smoking cessation. Suggested 30 minutes of moderate aerobic exercise daily.',
          patientUnderstanding: 'Patient acknowledged the instructions and agreed to monitor BP at home.',
          followUpPlan: 'Review in OPD after 1 week with home BP monitoring log.'
        }, 
        comments: '' 
      },
      drugInformation: { status: 'Not Applicable', data: null, comments: '' },
      pharmacistIntervention: { status: 'Not Submitted', data: null, comments: '' },
      adr: { status: 'Not Submitted', data: null, comments: '' }
    }
  },
  { 
    id: 'CASE-2026-000146', 
    studentId: 'STU001', 
    rollNo: '22M21A0001',
    preceptorId: 'PRE001',
    hospital: 'City General Hospital', 
    department: 'General Medicine', 
    status: 'Returned', 
    submittedDate: '2026-07-22T14:30:00',
    patientName: 'Jane Smith',
    age: 62,
    gender: 'Female',
    diagnosis: 'Type 2 Diabetes',
    overallRemarks: 'Please review the intervention.',
    history: [
      { date: '2026-07-22T14:30:00', action: 'Student Submitted Forms', user: 'Arun Kumar' },
      { date: '2026-07-23T10:00:00', action: 'Preceptor Returned Case', user: 'Dr. Ramesh Patel' }
    ],
    forms: {
      patientProfile: { status: 'Approved', data: { chiefComplaint: 'Polyuria, polydipsia, and fatigue for 2 weeks', pastMedicalHistory: 'DM2 for 10 years, non-compliant with medications.', vitalSigns: 'BP: 130/80, FBS: 280 mg/dL' }, comments: 'Good history, but please include HbA1c in future.' },
      patientCounselling: { status: 'Not Applicable', data: null, comments: '' },
      drugInformation: { status: 'Not Applicable', data: null, comments: '' },
      pharmacistIntervention: { 
        status: 'Returned', 
        data: { 
          identifiedProblem: 'Sub-therapeutic dosage of oral hypoglycemic agent leading to uncontrolled hyperglycemia.',
          currentTherapy: 'Tab. Metformin 500mg OD',
          proposedIntervention: 'Recommend increasing Metformin to 500mg BD or adding a DPP4 inhibitor.',
          physicianResponse: 'Agreed. Changed to Metformin 500mg BD.',
          clinicalOutcome: 'Awaiting next FBS reading.'
        }, 
        comments: 'Please elaborate on the exact mechanism and justification for increasing the dosage rather than adding a new class of drug.' 
      },
      adr: { status: 'Not Applicable', data: null, comments: '' }
    }
  },
  { 
    id: 'CASE-2026-000147', 
    studentId: 'STU001', 
    rollNo: '22M21A0001',
    preceptorId: 'PRE001',
    hospital: 'City General Hospital', 
    department: 'General Medicine', 
    status: 'Approved', 
    submittedDate: '2026-07-24T09:15:00',
    patientName: 'Michael Brown',
    age: 55,
    gender: 'Male',
    diagnosis: 'Asthma Exacerbation',
    overallRemarks: 'Excellent comprehensive case.',
    history: [
      { date: '2026-07-24T09:15:00', action: 'Student Submitted Forms', user: 'Arun Kumar' },
      { date: '2026-07-25T11:00:00', action: 'Preceptor Approved Case', user: 'Dr. Ramesh Patel' }
    ],
    forms: {
      patientProfile: { status: 'Approved', data: { chiefComplaint: 'Severe shortness of breath, wheezing, and chest tightness', pastMedicalHistory: 'Asthma since childhood (frequent exacerbations)', vitalSigns: 'SpO2: 88% on RA, RR: 28/min, HR: 110 bpm', diagnosis: 'Acute Severe Asthma Exacerbation' }, comments: '' },
      patientCounselling: { status: 'Approved', data: { topic: 'Inhaler Technique', demonstration: 'Demonstrated correct use of pMDI with spacer.', pointsDiscussed: 'Rinse mouth after steroid inhaler use to prevent oral thrush.' }, comments: '' },
      drugInformation: { 
        status: 'Approved', 
        data: { 
          queryReceivedFrom: 'Dr. Sharma (Pulmonologist)',
          query: 'Is IV Magnesium Sulfate indicated for this patient?',
          informationProvided: 'Yes, IV Magnesium Sulfate 2g over 20 minutes is recommended by GINA guidelines for acute severe asthma unresponsive to initial bronchodilator therapy.',
          references: 'Global Initiative for Asthma (GINA) 2023 Guidelines.'
        }, 
        comments: '' 
      },
      pharmacistIntervention: { status: 'Not Applicable', data: null, comments: '' },
      adr: { 
        status: 'Approved', 
        data: { 
          suspectedDrug: 'Nebulized Salbutamol',
          reactionDescription: 'Patient developed severe tachycardia (HR 145 bpm) and fine tremors in hands 15 minutes after administration.',
          onsetOfReaction: '15 mins post-dose',
          severity: 'Moderate',
          management: 'Dose reduced and patient observed. Heart rate settled to 110 bpm after 1 hour.',
          naranjoScore: '7 (Probable)'
        }, 
        comments: '' 
      }
    }
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

export const INITIAL_ACADEMIC_YEARS = [
  {
    id: 'AY26-27',
    name: '2026-2027',
    startDate: '2026-07-01',
    endDate: '2027-06-30',
    status: 'Active'
  },
  {
    id: 'AY25-26',
    name: '2025-2026',
    startDate: '2025-07-01',
    endDate: '2026-06-30',
    status: 'Closed'
  },
  {
    id: 'AY24-25',
    name: '2024-2025',
    startDate: '2024-07-01',
    endDate: '2025-06-30',
    status: 'Closed'
  }
];

export const INITIAL_PROMOTION_LOGS = [];

export const INITIAL_RELEASES = [
  {
    id: 'REL-v2.1.0',
    versionNumber: '2.1.0',
    releaseDate: '2026-07-27',
    releasedBy: 'Super Admin (Lead Architect)',
    releaseNotes: 'Enhanced Clinical Case Viewer navigation, Dual College Onboarding, SaaS Multi-Tenancy Architecture, Dynamic Institution Landing Pages, Enterprise Release System & Sandbox Testing Environment.',
    rollbackStatus: 'Available',
    deploymentStatus: 'Deployed', // 'Pending' | 'Tested' | 'Deployed' | 'Rolled Back'
    tested: true
  },
  {
    id: 'REL-v2.0.0',
    versionNumber: '2.0.0',
    releaseDate: '2026-06-01',
    releasedBy: 'Super Admin (Lead Architect)',
    releaseNotes: 'Initial SaaS Architecture Launch, Multi-Tenant Database Context, Preceptor Review Framework, Academic Year Management, Student Promotion Workflows.',
    rollbackStatus: 'Archived',
    deploymentStatus: 'Deployed',
    tested: true
  },
  {
    id: 'REL-v2.2.0-RC1',
    versionNumber: '2.2.0-RC1',
    releaseDate: '2026-08-15 (Scheduled)',
    releasedBy: 'Core Development Team',
    releaseNotes: 'Upcoming AI Assistant Integration, Advanced Pharmacovigilance Analytics, Expanded Regional Hospital Affiliations support.',
    rollbackStatus: 'N/A',
    deploymentStatus: 'Pending', // Ready for Platform Testing
    tested: false
  }
];

export const INITIAL_PLATFORM_SETTINGS = {
  erpVersion: '2.1.0',
  maintenanceMode: false,
  maintenanceMessage: 'PharmDVerse ERP is currently undergoing scheduled platform updates. Access will be restored shortly.',
  allowSelfRegistration: true,
  defaultStorageLimit: '100 GB',
  autoBackupFrequency: 'Daily (02:00 UTC)',
  lastBackupTime: '2026-07-27T02:00:00Z',
  activeThemeDefault: 'Dark'
};

