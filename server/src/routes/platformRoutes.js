const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const { authenticateToken } = require('../middlewares/authMiddleware');

// GET /api/v1/platform/settings
router.get('/settings', async (req, res) => {
  try {
    let settings = await prisma.platformSetting.findUnique({ where: { id: 'GLOBAL' } });
    if (!settings) {
      settings = await prisma.platformSetting.create({
        data: { id: 'GLOBAL', erpVersion: '2.1.0', maintenanceMode: false }
      });
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch platform settings' });
  }
});

// PUT /api/v1/platform/settings
router.put('/settings', authenticateToken, async (req, res) => {
  try {
    const updated = await prisma.platformSetting.upsert({
      where: { id: 'GLOBAL' },
      update: {
        maintenanceMode: req.body.maintenanceMode,
        maintenanceMessage: req.body.maintenanceMessage,
        autoBackupFrequency: req.body.autoBackupFrequency
      },
      create: {
        id: 'GLOBAL',
        maintenanceMode: req.body.maintenanceMode || false,
        maintenanceMessage: req.body.maintenanceMessage || ''
      }
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update platform settings' });
  }
});

// GET /api/v1/platform/backups
router.get('/backups', authenticateToken, async (req, res) => {
  try {
    const list = await prisma.backupRecord.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch backup records' });
  }
});

// POST /api/v1/platform/backups
router.post('/backups', authenticateToken, async (req, res) => {
  try {
    const created = await prisma.backupRecord.create({
      data: {
        id: `BAK-${Date.now()}`,
        name: `FULL-PLATFORM-BACKUP-${new Date().toISOString().split('T')[0]}.bak`,
        size: '1.24 GB',
        createdBy: req.user ? req.user.name : 'Super Admin',
        type: req.body.scope || 'Full Platform',
        scope: req.body.scope || 'Full Platform'
      }
    });
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create backup' });
  }
});

// GET /api/v1/platform/audit-logs
router.get('/audit-logs', authenticateToken, async (req, res) => {
  try {
    const list = await prisma.auditLog.findMany({ orderBy: { timestamp: 'desc' }, take: 100 });
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

module.exports = router;
