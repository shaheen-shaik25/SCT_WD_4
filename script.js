let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");

    const now = new Date();
    const taskTime = new Date(task.datetime);
    const isExpired = !task.completed && taskTime < now;

    li.className = task.completed ? "completed" : isExpired ? "expired" : "";

    li.innerHTML = `
      <span>${task.text} <small>(${task.datetime})</small></span>
      <div class="actions">
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTask() {
  const input = document.getElementById("task-input");
  const datetime = document.getElementById("task-datetime");

  const text = input.value.trim();
  const dt = datetime.value;

  if (!text || !dt) return alert("Please enter task and date-time!");

  taskList.push({ text, datetime: dt, completed: false });
  input.value = "";
  datetime.value = "";
  renderTasks();
}

function toggleComplete(index) {
  taskList[index].completed = !taskList[index].completed;
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", taskList[index].text);
  if (newText) {
    taskList[index].text = newText;
    renderTasks();
  }
}

renderTasks();
