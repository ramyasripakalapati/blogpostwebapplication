const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Bearer token

  if (!token) {
    return res.status(401).json({ success: false, message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Use correct secret
    req.user = decoded;  // Attach user info to req.user
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
