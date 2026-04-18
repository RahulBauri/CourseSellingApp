const jwt = require('jsonwebtoken');
require('dotenv').config();

function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({
      message: 'auth header is not present/correct',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD);
    const { id } = decoded;
    req.userId = { id };
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'you are not signed in' });
  }
}

module.exports = { adminMiddleware };
