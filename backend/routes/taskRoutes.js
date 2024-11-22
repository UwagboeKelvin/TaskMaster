const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');  // Make sure path is correct

// Define route for getting all tasks
router.get('/', taskController.getAllTasks);  // Ensure this route points to the correct controller function

// Other routes for CRUD operations...

module.exports = router;
