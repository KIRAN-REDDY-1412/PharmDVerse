const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { enforceTenantIsolation } = require('../middlewares/tenantMiddleware');

let CASES_DB = [
  {
    id: 'CASE-2026-001',
    collegeId: 'COL-001',
    studentId: 'USR-26-441',
    studentName: 'David Smith',
    rollNo: 'Y26PHD0301',
    preceptorId: 'USR-26-833',
    preceptorName: 'Dr. Emily Roberts',
    caseTitle: 'Hypertension Management in Type 2 Diabetes Patient',
    patientName: 'John Doe',
    patientAge: 58,
    gender: 'Male',
    ward: 'Cardiology - Ward B',
    diagnosis: 'Essential Hypertension & T2DM',
    overallStatus: 'UNDER_REVIEW',
    submissionDate: new Date().toISOString(),
    formStatuses: {
      patientProfile: 'COMPLETE',
      patientCounselling: 'COMPLETE',
      drugInformation: 'PENDING',
      pharmacistIntervention: 'PENDING',
      adrReporting: 'PENDING'
    },
    reviews: {
      patientProfile: { comment: 'Well documented patient demographics.', rating: 4 },
      patientCounselling: { comment: 'Clear dietary advice included.', rating: 5 }
    },
    history: [
      { action: 'Case Draft Created', performedBy: 'David Smith', timestamp: new Date().toISOString() },
      { action: 'Submitted for Preceptor Review', performedBy: 'David Smith', timestamp: new Date().toISOString() }
    ]
  }
];

// GET /api/v1/cases (Tenant & Role Scoped)
router.get('/', authenticateToken, enforceTenantIsolation, (req, res) => {
  let list = CASES_DB;

  if (req.user.role === 'student') {
    list = list.filter(c => c.studentId === req.user.id || c.rollNo === req.user.id);
  } else if (req.user.role === 'preceptor') {
    list = list.filter(c => c.preceptorId === req.user.id || c.collegeId === req.collegeId);
  } else if (req.user.role !== 'superadmin') {
    list = list.filter(c => c.collegeId === req.collegeId);
  }

  res.json({ success: true, count: list.length, data: list });
});

// GET /api/v1/cases/:id
router.get('/:id', authenticateToken, (req, res) => {
  const c = CASES_DB.find(caseObj => caseObj.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Clinical case not found' });
  res.json({ success: true, data: c });
});

// POST /api/v1/cases (Create/Save Draft)
router.post('/', authenticateToken, enforceTenantIsolation, (req, res) => {
  const newCase = {
    id: req.body.id || `CASE-${Date.now()}`,
    collegeId: req.collegeId,
    studentId: req.user.id || 'USR-26-441',
    studentName: req.user.name || 'Student User',
    preceptorId: req.body.preceptorId || 'USR-26-833',
    caseTitle: req.body.caseTitle || 'New Clinical Case',
    patientName: req.body.patientName || '',
    patientAge: req.body.patientAge || 0,
    gender: req.body.gender || 'Male',
    overallStatus: req.body.status || 'DRAFT',
    submissionDate: req.body.status === 'SUBMITTED' ? new Date().toISOString() : null,
    formStatuses: req.body.formStatuses || { patientProfile: 'PENDING', patientCounselling: 'PENDING', drugInformation: 'PENDING', pharmacistIntervention: 'PENDING', adrReporting: 'PENDING' },
    reviews: {},
    history: [{ action: 'Case Created', performedBy: req.user.name || 'Student', timestamp: new Date().toISOString() }],
    createdAt: new Date().toISOString()
  };

  CASES_DB.push(newCase);
  res.status(201).json({ success: true, data: newCase });
});

// PUT /api/v1/cases/:id/status (Approve / Return / Review)
router.put('/:id/status', authenticateToken, (req, res) => {
  const c = CASES_DB.find(caseObj => caseObj.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Case not found' });

  const { status, formKey, reviewComment, rating } = req.body;
  
  if (status) c.overallStatus = status;

  if (formKey) {
    if (!c.reviews) c.reviews = {};
    c.reviews[formKey] = { comment: reviewComment, rating: rating || 5, reviewer: req.user.name };
  }

  c.history.push({
    action: `Status updated to ${status || 'Reviewed'}`,
    performedBy: req.user.name || 'Preceptor',
    timestamp: new Date().toISOString()
  });

  res.json({ success: true, data: c });
});

module.exports = router;
