const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/server.config');

// const verifyToken = (req, res, next) => {
//     const token = req.cookies?.token || ""; // Access token from cookies
    
//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         console.log(token);
//         const decoded = jwt.verify(token, JWT_SECRET);
//         console.log(token);
//         req.user = decoded; // Attach decoded token payload to req.user
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: 'Invalid or expired token.' });
//     }
// };

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  };

// Middleware to check isAdmin
const isAdmin = (req, res, next) => {
  console.log("Checking middleware", req.user);
  
    if (req.user.isAdmin) {
        console.log(req.user.isAdmin);
        next(); // User is admin, proceed to the route
    } else {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

module.exports = { verifyToken, isAdmin };
