import express from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = express.Router();
import auth from '../middleware/auth.js';

// Create a new task (only accessible by authenticated users)
router.post('/tasks', auth, async () => {
  // Task creation logic here
});

// Registration Route
router.post(
  '/register',
  [
    body('username', 'Username is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create new user instance
      user = new User({
        username,
        email,
        password,
      });

      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user in the database
      await user.save();

      // Create a JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        'yourSecretToken', // Replace with an environment variable in production
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Login Route
router.post(
    '/login',
    [
      body('email', 'Please include a valid email').isEmail(),
      body('password', 'Password is required').exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        // Find the user by email
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }
  
        // Compare the input password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }
  
        // If credentials are valid, create a JWT token
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          'yourSecretToken', // Replace with an environment variable
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  

export default router;
