const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router(); // Create a new router instance

// POST /users/login (mock login for demo purposes)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Use mock email and password for demo purposes
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';

  // Skip database lookup, just check with mock credentials
  if (email === mockEmail && password === mockPassword) {
    // Generate a mock JWT token using the JWT_SECRET from .env
    const token = jwt.sign({ userId: 'mockUserId' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
});

module.exports = router; // Export the router to use in server.js
