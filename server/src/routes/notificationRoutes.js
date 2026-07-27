const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const { authenticateToken } = require('../middlewares/authMiddleware');

// GET /api/v1/notifications
router.get('/', authenticateToken, async (req, res) => {
  try {
    const list = await prisma.notification.findMany({
      where: { recipientId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// POST /api/v1/notifications
router.post('/', authenticateToken, async (req, res) => {
  try {
    const created = await prisma.notification.create({
      data: {
        recipientId: req.body.recipientId,
        senderId: req.user ? req.user.id : null,
        title: req.body.title,
        message: req.body.message,
        category: req.body.category || 'System Alert',
        status: 'Unread'
      }
    });
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// PUT /api/v1/notifications/:id/read
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    const updated = await prisma.notification.update({
      where: { id: req.params.id },
      data: { status: 'Read' }
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

// DELETE /api/v1/notifications/:id
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.notification.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

module.exports = router;
