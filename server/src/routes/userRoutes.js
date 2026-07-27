const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { enforceTenantIsolation } = require('../middlewares/tenantMiddleware');

// GET /api/v1/users (Tenant & Role Scoped)
router.get('/', authenticateToken, enforceTenantIsolation, async (req, res) => {
  try {
    const { role, search } = req.query;
    const whereClause = {};

    if (req.user && req.user.role !== 'superadmin' && req.collegeId) {
      whereClause.collegeId = req.collegeId;
    }

    if (role) {
      whereClause.role = role.toUpperCase();
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { id: { contains: search, mode: 'insensitive' } }
      ];
    }

    const list = await prisma.user.findMany({
      where: whereClause,
      include: { college: true },
      orderBy: { createdAt: 'desc' }
    });

    const mappedList = list.map(u => ({
      ...u,
      role: u.role.toLowerCase(),
      collegeName: u.college ? u.college.name : null
    }));

    res.json({ success: true, count: mappedList.length, data: mappedList });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /api/v1/users (Create User in PostgreSQL)
router.post('/', authenticateToken, enforceTenantIsolation, async (req, res) => {
  try {
    const defaultPassword = bcrypt.hashSync(req.body.password || 'Password@123', 10);
    const userRole = (req.body.role || 'student').toUpperCase();

    const newUser = await prisma.user.create({
      data: {
        id: req.body.id || req.body.studentId || req.body.preceptorId || `USR-${Date.now()}`,
        name: req.body.fullName || req.body.name,
        role: userRole,
        email: req.body.email,
        passwordHash: defaultPassword,
        phone: req.body.mobileNumber || req.body.phone,
        collegeId: req.collegeId || req.body.collegeId,
        status: req.body.status || 'Active',
        department: req.body.department,
        designation: req.body.designation,
        qualification: req.body.qualification,
        course: req.body.course,
        batch: req.body.batch || req.body.year,
        assignedPreceptorId: req.body.assignedPreceptorId || req.body.preceptorId
      }
    });

    res.status(201).json({ success: true, data: { ...newUser, role: newUser.role.toLowerCase() } });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: err.message || 'Failed to create user' });
  }
});

// PUT /api/v1/users/:id
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        phone: req.body.phone,
        status: req.body.status,
        department: req.body.department,
        designation: req.body.designation,
        assignedPreceptorId: req.body.assignedPreceptorId
      }
    });
    res.json({ success: true, data: { ...updated, role: updated.role.toLowerCase() } });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

module.exports = router;
