const { verifyToken, getTokenFromHeader } = require('../utils/jwtUtils');
const User = require('../models/User.model');

const authenticateToken = async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = verifyToken(token);

    const user = await User.findUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Token is invalid.'
      });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.message === 'Invalid or expired token') {
      return res.status(401).json({
        success: false,
        message: 'Token is invalid or expired.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
};

module.exports = authenticateToken;