// Get the necessary DOM elements
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');
const filterSelect = document.getElementById('filter-select');

// Function to add a new task
function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
      <input type="checkbox">
      <span>${taskText}</span>
      <button class="delete-task-button">Delete</button>
    `;
    taskList.appendChild(taskItem);
    newTaskInput.value = '';
    applyFilter();
  }
}

// Function to handle task completion
function completeTask(event) {
  const taskItem = event.target.parentNode;
  taskItem.classList.toggle('completed');
}

// Function to delete a task
function deleteTask(event) {
  const taskItem = event.target.parentNode;
  taskList.removeChild(taskItem);
}

// Function to apply task filters
function applyFilter() {
  const filterValue = filterSelect.value;
  const taskItems = taskList.querySelectorAll('.task-item');

  taskItems.forEach((taskItem) => {
    if (filterValue === 'completed' && !taskItem.classList.contains('completed')) {
      taskItem.style.display = 'none';
    } else if (filterValue === 'incomplete' && taskItem.classList.contains('completed')) {
      taskItem.style.display = 'none';
    } else {
      taskItem.style.display = 'flex';
    }
  });
}

// Add event listeners
addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', function(event) {
  if (event.target.matches('.delete-task-button')) {
    deleteTask(event);
  } else if (event.target.matches('input[type="checkbox"]')) {
    completeTask(event);
  }
});
filterSelect.addEventListener('change', applyFilter);
