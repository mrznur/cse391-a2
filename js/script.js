
const fortunes = [
  "You will have a great day!",
  "Success is coming your way.",
  "Be prepared for a pleasant surprise.",
  "Adventure awaits you.",
  "Someone is praying for your success.",
  "Believe in your dreams.",
  "Hard work pays off.",
  "Better days are coming.",
  "A new opportunity will arise.",
  "No road is long with good company."
];

function changeFontColor() {
  document.getElementById("fortune").style.color = getRandomColor();
}

function changeBackgroundColor() {
  document.getElementById("fortune-box").style.backgroundColor = getRandomColor();
}

function changeBorderColor() {
  document.getElementById("fortune-box").style.borderColor = getRandomColor();
}

function changeFontStyle() {
  const fonts = ["Inter", "Arial", "Verdana", "Georgia", "Courier New", "Tahoma"];
  document.getElementById("fortune").style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
  document.getElementById("fortune").style.fontSize = `${Math.floor(Math.random() * 10) + 16}px`;
}

function getRandomColor() {

  return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
}

function convert() {
  const value = parseFloat(document.getElementById("weight").value);
  const unit = document.getElementById("unit").value;
  let result = 0;
  let resultUnit = "";
  if (unit === "kg") {
    result = value * 2.2046;
    resultUnit = "Lbs";
  } else {
    result = value * 0.4536;
    resultUnit = "Kg";
  }
  document.getElementById("result").innerText = `${result.toFixed(2)} ${resultUnit}`;
}

let timer = 0;
let interval = null;

function updateTimer() {
  timer += 10;
  const seconds = Math.floor(timer / 1000);
  const ms = Math.floor((timer % 1000) / 10);
  document.getElementById("timer").innerText = `${seconds}.${ms.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!interval) {
    interval = setInterval(updateTimer, 10);
  }
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  timer = 0;
  document.getElementById("timer").innerText = "0.00";
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})">
      <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.name}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  if (!taskInput.value.trim()) return; // Prevent empty tasks
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ name: taskInput.value, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  loadTasks();
}

function toggleTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("fortune").innerText = fortunes[Math.floor(Math.random() * fortunes.length)];
  loadTasks();

  document.querySelectorAll('.floating-row section').forEach(section => {
    let x = Math.floor(Math.random() * 241) - 120;
    let y = Math.floor(Math.random() * 241) - 120;
    if (Math.abs(x) < 40 && Math.abs(y) < 40) x += 60;

    section.style.opacity = '0';
    section.style.transform = `translate(${x}px, ${y}px) scale(0.95)`;

    setTimeout(() => {
      section.style.transition = 'transform 0.7s cubic-bezier(.23,1.02,.64,1), opacity 0.7s';
      section.style.opacity = '1';
      section.style.transform = 'translate(0,0) scale(1)';
    }, 80);
  });

  const themeBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀️ Light Mode';
  }

  themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      themeBtn.textContent = '☀️ Light Mode';
      localStorage.setItem('theme', 'dark');
    } else {
      themeBtn.textContent = '🌙 Dark Mode';
      localStorage.setItem('theme', 'light');
    }
  });
});
