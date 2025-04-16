
// Original data structure
let data = {
    "periods": {
      "0": {
        "tasks": [
          {
            "task": "Make a Sandwich",
            "status": "incomplete"
          }
        ]
      },
      "1": {
        "tasks": [
          {
            "task": "Build a home",
            "status": "incomplete"
          },
          {
            "task": "Build universe",
            "status": "completed"
          }
        ]
      }
    }
  };


const menu = document.getElementById("menu");
const taskMenu = document.getElementById("add-task-menu");
const toggleLogo = document.getElementById("toggle-logo");
const inputForAddElem = document.getElementById("inputForAdd");
const selectForAddElem = document.getElementById("selectForAdd");



// Toggles main options
function toggleMenu(){

    // Rotates the logo on the input item
    toggleLogo.classList.toggle('rotate45');
    
    // If user toggles options without closing input modal it automatically hides input modal
    if(taskMenu.classList.contains("active")){
        taskMenu.classList.remove("active");
    }

    // Toggles main options
    menu.classList.toggle("active");
}



// Toggles extended input menu 
function toggleTaskMenu(){
    taskMenu.classList.toggle("active");
}



// Add task function
// function add(task, period) {
//     console.log("add run hoilo")
//     // Ensure the period exists
//     if (!data.periods[period]) {
//       data.periods[period] = { tasks: [] };
//     }
    
//     // Create new task object and add it to the period's tasks array
//     data.periods[period].tasks.push({
//       task: task,
//       status: "incomplete"
//     });

//     document.getElementsByClassName("period_tasks_container")[period].innerHTML += `<li onclick="strikeMe()">${data.periods[period].tasks[data.periods[period].tasks.length - 1].task}</li>`;
    
// }





// // Remove task function
// function remove(period, index) {
//     // Check if period exists
//     if (!data.periods[period]) {
//       console.warn(`Period ${period} does not exist`);
//       return data;
//     }
    
//     // Get tasks array for the period
//     const tasks = data.periods[period].tasks;
    
//     // Check if index is valid
//     if (index < 0 || index >= tasks.length) {
//       console.warn(`Invalid index ${index} for period ${period}`);
//       return data;
//     }
    
//     // Remove task at specified index
//     tasks.splice(index, 1);
    
// }





// Task management functions
const taskManager = {
    // Add a new task to a period
    addTask(task, period) {
      // Validate inputs
      if (!task || typeof task !== 'string') {
        throw new Error('Task must be a non-empty string');
      }
      
      // Ensure period exists
      if (!data.periods[period]) {
        data.periods[period] = { tasks: [] };
      }
      
      // Create and add task
      const newTask = {
        id: Date.now(),
        text: task,
        status: "incomplete",
        createdAt: new Date().toISOString()
      };
      
      data.periods[period].tasks.push(newTask);
      this.renderTask(period, newTask);
      
      return newTask;
    },
    
    // Render a single task
    renderTask(period, task) {
      const container = document.getElementsByClassName("period_tasks_container")[period];
      if (!container) return;
      
      const taskElement = document.createElement('li');
      taskElement.className = 'task-item';
      taskElement.dataset.taskId = task.id;
      taskElement.innerHTML = `
        <span class="task-text" onclick="strikeMe()">${task.text}</span>
        <button class="delete-task" onclick="taskManager.deleteTask(${period}, ${task.id})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></button>
      `;
      container.appendChild(taskElement);
    },
    
    // Delete a task
    deleteTask(period, taskId) {
      if (!data.periods[period]) return;
      
      data.periods[period].tasks = data.periods[period].tasks.filter(
        task => task.id !== taskId
      );
      
      const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
      if (taskElement) {
        taskElement.remove();
      }
    }
  };





// Append new task on click from 'done' button
function addNewTask(){

    var text = inputForAddElem.value;
    var period = selectForAddElem.value;

    // Add a new task
try {
    taskManager.addTask(text, period);

    // hide dialogue
    inputForAddElem.value = "";
    toggleTaskMenu();
  } catch (error) {
    console.error("Error adding task:", error);
  }
    

}


// Delete a task
// taskManager.deleteTask(1, taskId);



function strikeMe(){
    event.target.classList.toggle("through");
}