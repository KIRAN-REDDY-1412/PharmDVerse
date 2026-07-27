const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');

let NOTIFICATIONS_DB = [
  { id: 'NOTIF-001', recipientId: 'USR-SA-001', senderName: 'AMR College Admin', title: 'New Registration Request', message: 'AMR College submitted direct subscription request.', status: 'Unread', date: new Date().toISOString() },
  { id: 'NOTIF-002', recipientId: 'USR-26-833', senderName: 'David Smith', title: 'New Case Submitted', message: 'Case #CASE-2026-001 submitted for your SOAP evaluation.', status: 'Unread', date: new Date().toISOString() }
];

// GET /api/v1/notifications
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const list = NOTIFICATIONS_DB.filter(n => n.recipientId === userId || req.user.role === 'superadmin');
  res.json({ success: true, count: list.length, data: list });
});

// PUT /api/v1/notifications/:id/read
router.put('/:id/read', authenticateToken, (req, res) => {
  const n = NOTIFICATIONS_DB.find(item => item.id === req.params.id);
  if (n) n.status = 'Read';
  res.json({ success: true });
});

// DELETE /api/v1/notifications/:id
router.delete('/:id', authenticateToken, (req, res) => {
  NOTIFICATIONS_DB = NOTIFICATIONS_DB.filter(item => item.id !== req.params.id);
  res.json({ success: true });
});

module.exports = router;
