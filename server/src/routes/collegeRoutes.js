const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const { authenticateToken } = require('../middlewares/authMiddleware');

// GET /api/v1/colleges
router.get('/', async (req, res) => {
  try {
    const list = await prisma.college.findMany({
      include: { subscriptions: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// GET /api/v1/colleges/by-slug/:slug
router.get('/by-slug/:slug', async (req, res) => {
  try {
    const col = await prisma.college.findUnique({
      where: { slug: req.params.slug },
      include: { subscriptions: true, landingPage: true }
    });

    if (!col) return res.status(404).json({ error: 'Institution not found' });
    res.json({ success: true, data: col });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching institution' });
  }
});

// POST /api/v1/colleges
router.post('/', authenticateToken, async (req, res) => {
  try {
    const slug = (req.body.slug || req.body.name).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const created = await prisma.college.create({
      data: {
        id: req.body.id || `COL-${Date.now()}`,
        slug,
        name: req.body.name,
        code: req.body.code || slug.toUpperCase(),
        domain: req.body.domain || `${slug}.pharmdverse.com`,
        principalName: req.body.principalName,
        principalEmail: req.body.principalEmail,
        contactMobile: req.body.contactMobile || req.body.phone,
        address: req.body.address,
        status: 'ACTIVE'
      }
    });

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error('[collegeRoutes] POST /colleges failed:', err);
    res.status(500).json({ error: err.message || 'Failed to create college' });
  }
});

// PUT /api/v1/colleges/:id/status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const updated = await prisma.college.update({
      where: { id: req.params.id },
      data: { status: req.body.status ? req.body.status.toUpperCase() : 'ACTIVE' }
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update college status' });
  }
});

module.exports = router;
