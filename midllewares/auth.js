const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('Welbex=')) {
    res.status(401).send({ message: 'Unauthorized' });
  }

  const token = cookie.replace('Welbex==', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    res.status(500).send({ message: 'INTERNAL ERROR' });
  }
  req.user = payload
  next();
};

module.exports = {
  auth
};
