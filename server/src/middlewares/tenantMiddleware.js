const enforceTenantIsolation = (req, res, next) => {
  // Super Admin can access all tenants
  if (req.user && req.user.role === 'superadmin') {
    req.collegeId = req.query.collegeId || req.body.collegeId || req.user.collegeId;
    return next();
  }

  // College Admin, Preceptor, Student are strictly isolated to their own college
  if (req.user && req.user.collegeId) {
    req.collegeId = req.user.collegeId;
    return next();
  }

  // Fallback to headers
  req.collegeId = req.headers['x-college-id'] || 'COL-001';
  next();
};

module.exports = { enforceTenantIsolation };
