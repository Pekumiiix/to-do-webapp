function line(checkBox) {
    var taskContent = checkBox.closest('.task').querySelector('.task-content');

    if (checkBox.checked) {
        taskContent.style.textDecoration = 'line-through';
        taskContent.style.color = 'grey';
        saveData();
    } else {
        taskContent.style.textDecoration = 'none';
        taskContent.style.color = 'black';
        saveData();
    }
}

function edit(editButton) {
    var taskElement = editButton.closest('.task');
    var taskContent = taskElement.querySelector('.task-content');

    if (editButton.innerHTML === 'Save') {
        taskContent.contentEditable = 'false';
        taskContent.style.backgroundColor = 'transparent';
        editButton.innerHTML = 'Edit';
    } else if (editButton.innerHTML === 'Edit') {
        taskContent.contentEditable = 'true';
        editButton.innerHTML = 'Save';
        taskContent.style.backgroundColor = 'gainsboro';
    }
    saveData();
}

function deleteTask(element) {
    var taskElement = element.closest('.task');
    taskElement.remove();
    saveData();
}

function createNewTask(taskText) {
    var taskList = document.querySelector('.task-list');
    var newTask = document.createElement('div');
    newTask.className = 'task';

    var taskContent = document.createElement('div');
    taskContent.className = 'task-left';

    var checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'check';
    taskContent.appendChild(checkBox);

    var taskTextElement = document.createElement('p');
    taskTextElement.className = 'task-content';
    taskTextElement.textContent = taskText;
    taskContent.appendChild(taskTextElement);

    newTask.appendChild(taskContent);

    var taskActions = document.createElement('div');
    taskActions.className = 'task-right';

    var editButton = document.createElement('p');
    editButton.className = 'blue edit';
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        edit(this);
    };
    taskActions.appendChild(editButton);

    var deleteButton = document.createElement('p');
    deleteButton.className = 'red';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteTask(this);
    };

    var checkBox = newTask.querySelector('.check'); 
    checkBox.addEventListener('change', function() {
        line(this);
    });

    taskActions.appendChild(deleteButton);

    newTask.appendChild(taskActions);

    taskList.appendChild(newTask);

    saveData();
}

document.getElementById('new-task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var newTaskInput = document.getElementById('new-task-input');
    var taskText = newTaskInput.value.trim();

    if (taskText !== '') {
        createNewTask(taskText);
        newTaskInput.value = '';
    }
});

function saveData() {
    localStorage.setItem("data", document.getElementById('tasks').innerHTML)
}

function showTask() {
    document.getElementById('tasks').innerHTML = localStorage.getItem("data")
    
    var checkBoxes = document.querySelectorAll('.check') 
    checkBoxes.forEach(function(checkBox) {
        checkBox.addEventListener('change', function() {
            line(this)
        })
    })

    var editButtons = document.querySelectorAll('.edit');
    editButtons.forEach(function(editButton) {
        editButton.addEventListener('click', function() {
            edit(this);
        });
    });

    var deleteButtons = document.querySelectorAll('.red');
    deleteButtons.forEach(function(deleteButton) {
        deleteButton.addEventListener('click', function() {
            deleteTask(this);
        });
    });
}

showTask();