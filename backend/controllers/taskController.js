const Task = require('../models/Task'); // Import Task model

// Define the functions before exporting them
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Other controller functions...

module.exports = {
  getAllTasks,  // Export functions after they're declared
  // other exports like createTask, updateTask, etc.
};
