
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');


function AddTask() {
    if (taskInput.value === '') {
        alert("You must write the Task");
    } else {
        let li = document.createElement("li");
        li.className = "flex items-center space-x-2 mb-5"; 
        li.innerHTML = `
            <input type="checkbox" id="checkbox"class="form-checkbox h-5 w-5 text-blue-600 gap-3">
            <span class="text-gray-800 ">${taskInput.value}</span>
            <button class="deleteBtn bg-sky-200 rounded gap-10">Delete</button>
        `;
        taskList.appendChild(li);

     
        li.querySelector('.deleteBtn').addEventListener('click', function() {
            taskList.removeChild(li);
            savedata(); 
        });

        savedata();  
    }
    taskInput.value = ''; 
}


function savedata() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        tasks.push({
            text: li.querySelector('span').innerText,
            checked: checkbox.checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function showdata() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = ""; 
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.className = "flex items-center space-x-2 mb-5";
        li.innerHTML = `
            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600 gap-5" ${task.checked ? 'checked' : ''}>
            <span class="text-gray-800">${task.text}</span>
            <button class="deleteBtn bg-sky-200 rounded p-1 gap-5">Delete</button>
        `;
        taskList.appendChild(li);

        li.querySelector('.deleteBtn').addEventListener('click', function() {
            taskList.removeChild(li);
            savedata(); 
        });

        li.querySelector('input[type="checkbox"]').addEventListener('change', savedata);
    });
}

addTaskButton.addEventListener('click', AddTask);
showdata();
