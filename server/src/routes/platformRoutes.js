const express = require('express');
const router = express.Router();
const { authenticateToken, requireRoles } = require('../middlewares/authMiddleware');

let SETTINGS_DB = {
  erpVersion: '2.1.0',
  maintenanceMode: false,
  maintenanceMessage: 'PharmDVerse ERP is performing scheduled platform updates.',
  autoBackupFrequency: 'Daily (02:00 UTC)',
  lastBackupTime: new Date().toISOString()
};

let BACKUPS_DB = [
  { id: 'BAK-FULL-20260727-01', name: 'FULL-PLATFORM-BACKUP-2026-07-27.bak', date: new Date().toISOString(), size: '1.24 GB', createdBy: 'Super Admin', type: 'Full Platform', status: 'Completed', scope: 'Full Platform Database & Config' }
];

let AUDIT_LOGS_DB = [
  { id: 'AUDIT-101', module: 'BACKUP_CREATED', modifiedBy: 'Super Admin', timestamp: new Date().toISOString(), details: 'Created Full Platform Backup' }
];

// GET /api/v1/platform/settings
router.get('/settings', (req, res) => {
  res.json({ success: true, data: SETTINGS_DB });
});

// PUT /api/v1/platform/settings
router.put('/settings', authenticateToken, requireRoles('superadmin'), (req, res) => {
  Object.assign(SETTINGS_DB, req.body);
  res.json({ success: true, data: SETTINGS_DB });
});

// GET /api/v1/platform/backups
router.get('/backups', authenticateToken, requireRoles('superadmin'), (req, res) => {
  res.json({ success: true, count: BACKUPS_DB.length, data: BACKUPS_DB });
});

// POST /api/v1/platform/backups
router.post('/backups', authenticateToken, requireRoles('superadmin'), (req, res) => {
  const newBak = {
    id: `BAK-${Date.now()}`,
    name: `FULL-PLATFORM-BACKUP-${Date.now()}.bak`,
    date: new Date().toISOString(),
    size: '1.25 GB',
    createdBy: req.user.name || 'Super Admin',
    type: req.body.scope || 'Full Platform',
    status: 'Completed',
    scope: 'Full Platform Database & Media'
  };
  BACKUPS_DB.unshift(newBak);
  res.status(201).json({ success: true, data: newBak });
});

// GET /api/v1/platform/audit-logs
router.get('/audit-logs', authenticateToken, requireRoles('superadmin'), (req, res) => {
  res.json({ success: true, count: AUDIT_LOGS_DB.length, data: AUDIT_LOGS_DB });
});

module.exports = router;
