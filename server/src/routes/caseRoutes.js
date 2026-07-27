const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { enforceTenantIsolation } = require('../middlewares/tenantMiddleware');

// GET /api/v1/cases (Tenant & Role Scoped)
router.get('/', authenticateToken, enforceTenantIsolation, async (req, res) => {
  try {
    const whereClause = {};

    if (req.user.role === 'student') {
      whereClause.studentId = req.user.id;
    } else if (req.user.role === 'preceptor') {
      whereClause.OR = [
        { preceptorId: req.user.id },
        { collegeId: req.collegeId }
      ];
    } else if (req.user.role !== 'superadmin' && req.collegeId) {
      whereClause.collegeId = req.collegeId;
    }

    const list = await prisma.clinicalCase.findMany({
      where: whereClause,
      include: {
        student: { select: { id: true, name: true, email: true, rollNo: true } },
        preceptor: { select: { id: true, name: true, email: true } },
        caseReviews: true,
        historyEvents: true
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    console.error('Error fetching clinical cases:', err);
    res.status(500).json({ error: 'Failed to fetch clinical cases' });
  }
});

// GET /api/v1/cases/:id
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const c = await prisma.clinicalCase.findUnique({
      where: { id: req.params.id },
      include: {
        student: { select: { id: true, name: true, email: true, rollNo: true } },
        preceptor: { select: { id: true, name: true, email: true } },
        caseReviews: true,
        historyEvents: true
      }
    });

    if (!c) return res.status(404).json({ error: 'Clinical case not found' });
    res.json({ success: true, data: c });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching case detail' });
  }
});

// POST /api/v1/cases (Create / Save Draft Case)
router.post('/', authenticateToken, enforceTenantIsolation, async (req, res) => {
  try {
    const caseId = req.body.id || `CAS-26-${Date.now().toString().slice(-4)}`;

    const created = await prisma.clinicalCase.create({
      data: {
        id: caseId,
        collegeId: req.collegeId || req.body.collegeId || 'COL-001',
        studentId: req.user.id,
        preceptorId: req.body.preceptorId || req.user.assignedPreceptorId,
        caseTitle: req.body.caseTitle || req.body.title || 'New Clinical Case',
        patientName: req.body.patientName,
        patientAge: req.body.patientAge ? parseInt(req.body.patientAge, 10) : null,
        gender: req.body.gender,
        ward: req.body.ward,
        diagnosis: req.body.diagnosis,
        overallStatus: (req.body.status || 'DRAFT').toUpperCase(),
        submissionDate: req.body.status === 'Submitted' ? new Date() : null,
        clinicalData: req.body.forms || req.body.clinicalData || {},
        historyEvents: {
          create: [
            {
              action: req.body.status === 'Submitted' ? 'Submitted by Student' : 'Draft Created',
              performedBy: req.user.name,
              role: req.user.role
            }
          ]
        }
      }
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('Error creating case:', err);
    res.status(500).json({ error: 'Failed to create case' });
  }
});

// PUT /api/v1/cases/:id/status (Preceptor Review / Approval / Return)
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, formKey, reviewComment, rating } = req.body;

    const caseObj = await prisma.clinicalCase.findUnique({ where: { id: req.params.id } });
    if (!caseObj) return res.status(404).json({ error: 'Case not found' });

    const updateData = { updatedAt: new Date() };

    if (status) {
      updateData.overallStatus = status.toUpperCase();
      if (status === 'Approved') updateData.approvalDate = new Date();
    }

    const updated = await prisma.clinicalCase.update({
      where: { id: req.params.id },
      data: updateData
    });

    if (formKey) {
      await prisma.caseReview.create({
        data: {
          caseId: req.params.id,
          reviewerId: req.user.id,
          formKey,
          comments: reviewComment,
          rating: rating || 5,
          status: 'COMPLETE'
        }
      });
    }

    await prisma.caseHistory.create({
      data: {
        caseId: req.params.id,
        action: `Status updated to ${status || 'Reviewed'}`,
        performedBy: req.user.name,
        role: req.user.role
      }
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Error updating case status:', err);
    res.status(500).json({ error: 'Failed to update case status' });
  }
});

module.exports = router;
