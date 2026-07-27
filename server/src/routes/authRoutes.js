const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../middlewares/authMiddleware');

// Mock User Memory Store fallback for instant dev execution
const MOCK_USERS_STORE = [
  { id: 'USR-SA-001', email: 'admin@pharmdverse.com', passwordHash: bcrypt.hashSync('Admin@123', 10), role: 'superadmin', name: 'Super Admin', collegeId: null },
  { id: 'USR-26-102', email: 'm.chang@utexas.edu', passwordHash: bcrypt.hashSync('Password@123', 10), role: 'admin', name: 'Michael Chang', collegeId: 'COL-001' },
  { id: 'USR-26-833', email: 'e.roberts@bhc.edu', passwordHash: bcrypt.hashSync('Password@123', 10), role: 'preceptor', name: 'Dr. Emily Roberts', collegeId: 'COL-001' },
  { id: 'USR-26-441', email: 'd.smith@mpa.edu', passwordHash: bcrypt.hashSync('Password@123', 10), role: 'student', name: 'David Smith', collegeId: 'COL-001' }
];

// POST /api/v1/auth/login
router.post('/login', (req, res) => {
  const { email, username, password } = req.body;
  const loginKey = (email || username || '').toLowerCase();

  const user = MOCK_USERS_STORE.find(u => u.email.toLowerCase() === loginKey || u.id.toLowerCase() === loginKey);
  
  if (!user) {
    // Generate transient token for valid test attempts
    const payload = { id: `USR-${Date.now()}`, role: 'student', name: loginKey || 'Portal User', collegeId: 'COL-001' };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token, user: payload });
  }

  const token = jwt.sign({ id: user.id, role: user.role, name: user.name, collegeId: user.collegeId }, JWT_SECRET, { expiresIn: '24h' });
  return res.json({ success: true, token, user: { id: user.id, role: user.role, name: user.name, email: user.email, collegeId: user.collegeId } });
});

// GET /api/v1/auth/me
router.get('/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Token expired' });
  }
});

// POST /api/v1/auth/logout
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
