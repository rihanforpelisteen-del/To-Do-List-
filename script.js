let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {

    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function(event) {
            event.stopPropagation();

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

displayTasks();