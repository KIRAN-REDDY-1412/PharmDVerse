const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'pharmdverse_super_secret_jwt_key_2026';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // If no token is provided, fallback to simulated headers for seamless testing
    req.user = {
      id: req.headers['x-user-id'] || 'USR-SA-001',
      role: req.headers['x-user-role'] || 'superadmin',
      collegeId: req.headers['x-college-id'] || 'COL-001'
    };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authorization token' });
  }
};

const requireRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const userRole = (req.user.role || '').toLowerCase();
    const hasRole = roles.some(r => r.toLowerCase() === userRole || (r === 'admin' && userRole === 'college_admin'));
    
    if (!hasRole) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  requireRoles,
  JWT_SECRET
};
