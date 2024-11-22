 const apiBaseUrl = 'http://localhost:5000/api'; // Replace with your backend URL

// Elements
const authSection = document.getElementById('auth-section');
const taskSection = document.getElementById('task-section');
const authForm = document.getElementById('auth-form');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const priorityFilter = document.getElementById('priority-filter');
const searchBar = document.getElementById('search-bar');

// Store JWT token
let token = '';

// Login or Register
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Save the token
      const token = data.token;
      localStorage.setItem('token', token);

      // Use token for further API requests
      console.log('Logged in successfully. Token:', token);
    } else {
      alert(data.message || 'Authentication failed.');
    }
  } catch (err) {
    console.error('Error during login:', err);
  }
});


// Fetch Tasks
async function fetchTasks() {
  try {
    const response = await fetch(`${apiBaseUrl}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }, // Use Bearer token
    });
    if (response.ok) {
      const tasks = await response.json();
      displayTasks(tasks);
    } else {
      alert('Failed to fetch tasks.');
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    alert('Failed to connect to the server while fetching tasks.');
  }
}

// Display Tasks
function displayTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item', task.priority);
    taskItem.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Deadline: ${new Date(task.deadline).toLocaleDateString()}</p>
      <button onclick="deleteTask('${task._id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}

// Add Task
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  const deadline = document.getElementById('task-deadline').value;
  const priority = document.getElementById('task-priority').value;

  try {
    const response = await fetch(`${apiBaseUrl}/tasks`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ title, description, deadline, priority }),
    });
    if (response.ok) {
      fetchTasks();
      taskForm.reset();
    } else {
      alert('Failed to add task.');
    }
  } catch (error) {
    console.error('Error adding task:', error);
    alert('Failed to connect to the server while adding a task.');
  }
});

// Delete Task
async function deleteTask(taskId) {
  try {
    const response = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      fetchTasks();
    } else {
      alert('Failed to delete task.');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('Failed to connect to the server while deleting a task.');
  }
}



