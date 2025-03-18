const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    if (!decodedToken) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    // Add user information to request
    req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
      };
      
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ error: 'Unauthorized - Authentication failed' });
    }
  };
  
  module.exports = authMiddleware;