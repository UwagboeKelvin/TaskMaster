require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Database Connection
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmaster';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Mock Login Route
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  // Mock credentials for demo purposes
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';

  if (email === mockEmail && password === mockPassword) {
    const token = jwt.sign({ userId: 'mockUserId' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Mock Task Route
app.get('/api/tasks', (req, res) => {
  // Example tasks for demo purposes
  const tasks = [
    { title: 'Task 1', description: 'This is task 1', deadline: '2024-11-30', priority: 'high' },
    { title: 'Task 2', description: 'This is task 2', deadline: '2024-12-05', priority: 'medium' },
  ];
  res.json(tasks);
});

// Default Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to TaskMaster!');
});

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
