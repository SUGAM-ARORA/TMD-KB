import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, 'yourSecretToken'); // Replace with your secret
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
