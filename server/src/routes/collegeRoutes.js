const express = require('express');
const router = express.Router();
const { authenticateToken, requireRoles } = require('../middlewares/authMiddleware');

// In-Memory Colleges Store
let COLLEGES_DB = [
  { id: 'COL-001', slug: 'amr', name: 'AMR College of Pharmacy', code: 'AMRCP-01', domain: 'amr.pharmdverse.com', status: 'Active', plan: 'Enterprise', students: 1250, preceptors: 120, cases: 4500 },
  { id: 'COL-002', slug: 'gitam', name: 'GITAM Institute of Pharmacy', code: 'GITAM-02', domain: 'gitam.pharmdverse.com', status: 'Active', plan: 'Professional', students: 850, preceptors: 45, cases: 2800 },
  { id: 'COL-003', slug: 'vignan', name: 'Vignan Pharmacy College', code: 'VIGNAN-03', domain: 'vignan.pharmdverse.com', status: 'Active', plan: 'Standard', students: 620, preceptors: 30, cases: 1900 }
];

// GET /api/v1/colleges (Super Admin or Landing Pages)
router.get('/', (req, res) => {
  res.json({ success: true, count: COLLEGES_DB.length, data: COLLEGES_DB });
});

// GET /api/v1/colleges/by-slug/:slug
router.get('/by-slug/:slug', (req, res) => {
  const col = COLLEGES_DB.find(c => c.slug.toLowerCase() === req.params.slug.toLowerCase());
  if (!col) return res.status(404).json({ error: 'College not found' });
  res.json({ success: true, data: col });
});

// POST /api/v1/colleges (Super Admin Direct Registration)
router.post('/', authenticateToken, requireRoles('superadmin'), (req, res) => {
  const newCol = {
    id: `COL-${Date.now()}`,
    slug: (req.body.name || 'college').toLowerCase().replace(/[^a-z0-9]/g, ''),
    name: req.body.name,
    code: req.body.code || `CODE-${Date.now()}`,
    domain: req.body.domain || `${req.body.slug}.pharmdverse.com`,
    status: 'Active',
    plan: req.body.subscriptionPlan || 'Enterprise',
    students: 0,
    preceptors: 0,
    cases: 0,
    createdAt: new Date().toISOString()
  };
  COLLEGES_DB.push(newCol);
  res.status(201).json({ success: true, data: newCol });
});

// PUT /api/v1/colleges/:id/status
router.put('/:id/status', authenticateToken, requireRoles('superadmin'), (req, res) => {
  const col = COLLEGES_DB.find(c => c.id === req.params.id);
  if (!col) return res.status(404).json({ error: 'College not found' });
  col.status = req.body.status || col.status;
  res.json({ success: true, data: col });
});

module.exports = router;
