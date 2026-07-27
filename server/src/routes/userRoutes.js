const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { enforceTenantIsolation } = require('../middlewares/tenantMiddleware');

let USERS_DB = [
  { id: 'USR-SA-001', name: 'Dr. Sarah Jenkins', role: 'superadmin', email: 'admin@pharmdverse.com', phone: '+1 (555) 019-2831', status: 'Active', collegeId: null },
  { id: 'USR-26-102', name: 'Michael Chang', role: 'admin', email: 'm.chang@utexas.edu', phone: '+1 (555) 112-9904', status: 'Active', collegeId: 'COL-001', department: 'Administration' },
  { id: 'USR-26-833', name: 'Dr. Emily Roberts', role: 'preceptor', email: 'e.roberts@bhc.edu', phone: '+1 (555) 993-2211', status: 'Active', collegeId: 'COL-001', department: 'Clinical Practice', designation: 'Senior Clinical Pharmacist' },
  { id: 'USR-26-441', name: 'David Smith', role: 'student', email: 'd.smith@mpa.edu', phone: '+1 (555) 441-8822', status: 'Active', collegeId: 'COL-001', course: 'Pharm.D', batch: 'Y26', year: 'PharmD Year 4', assignedPreceptorId: 'USR-26-833' }
];

// GET /api/v1/users (Tenant Scoped)
router.get('/', authenticateToken, enforceTenantIsolation, (req, res) => {
  const { role, search } = req.query;
  let list = USERS_DB;

  if (req.user && req.user.role !== 'superadmin') {
    list = list.filter(u => u.collegeId === req.collegeId);
  }

  if (role) {
    list = list.filter(u => u.role.toLowerCase() === role.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(u => u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }

  res.json({ success: true, count: list.length, data: list });
});

// POST /api/v1/users (Create User)
router.post('/', authenticateToken, enforceTenantIsolation, (req, res) => {
  const newUser = {
    id: req.body.studentId || req.body.preceptorId || `USR-${Date.now()}`,
    name: req.body.fullName || req.body.name,
    role: req.body.role || 'student',
    email: req.body.email,
    phone: req.body.mobileNumber || req.body.phone,
    collegeId: req.collegeId,
    status: 'Active',
    createdAt: new Date().toISOString()
  };
  USERS_DB.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// PUT /api/v1/users/:id
router.put('/:id', authenticateToken, (req, res) => {
  const user = USERS_DB.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  Object.assign(user, req.body, { updatedAt: new Date().toISOString() });
  res.json({ success: true, data: user });
});

module.exports = router;
