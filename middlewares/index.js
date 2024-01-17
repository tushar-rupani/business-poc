const jwt = require('jsonwebtoken');
const checkAuthorization = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'User is unauthorized!' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'User is unauthorized!' });
    }
    req.user = decoded.data;
    next();
  });
};

module.exports = {checkAuthorization};
