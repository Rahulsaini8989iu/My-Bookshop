const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Access denied. SuperAdmin or Admin rights required.' 
      });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = adminMiddleware;