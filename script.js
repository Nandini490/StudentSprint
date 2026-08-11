console.log("Hello Nandini!");

let arr = [];
const savedtasks = localStorage.getItem("tasks");

if (savedtasks) {
    arr = JSON.parse(savedtasks);
}

const addtast = document.getElementById("addtask");

// Function to renumber tasks
function renumberTasks() {
    const container = document.getElementById("Taskcontainer");

    for (let i = 0; i < container.children.length; i++) {
        const taskDiv = container.children[i];

        // Get current text (without the button)
        const fullText = taskDiv.firstChild.textContent;

        // Remove old number
        const parts = fullText.split(". | ");

        // Add new number
        taskDiv.firstChild.textContent = `${i + 1}. | ${parts[1]}`;
    }
}

function updatetask() {
    const tasktotal = document.getElementById("totaltask");
    const totaltask = arr.length;

    tasktotal.textContent = `Total task: ${totaltask}`;
}

function updateemptymessage() {
    const msg = document.getElementById("emptystg");

    if (arr.length === 0)
        msg.style.display = "block";
    else
        msg.style.display = "none";
}

function savetolocalstorage() {
    localStorage.setItem("tasks", JSON.stringify(arr));
}

function updatecompletedtask() {
    const completedtasks = arr.filter(task => task.completed === true);
    const completedcount = completedtasks.length;

    const completetask = document.getElementById("completedtasks");
    

    completetask.textContent = `Completed: ${completedcount}`;
}


// ADD TASK
addtast.addEventListener('click', () => {

    const subvalue = document.getElementById("subject");
    const durationmin = document.getElementById("duration");
    const prioritytask = document.getElementById("priority");

    // Validation
    if (subvalue.value === "" || durationmin.value === "") {
        alert("Invalid input!");
        return;
    }

    const subject = subvalue.value;
    const duration = durationmin.value;
    const priority = prioritytask.value;

    // Create task object
    const tasks = {
        subject: subject,
        duration: duration,
        priority: priority,
        completed: false
    };

    // Store in array
    arr.push(tasks);

    savetolocalstorage();
    updatetask();
    updateemptymessage();
    updatecompletedtask();

    const tasknumber = arr.length;

    console.log("Task Added");
    console.log(arr);

    // Create task div
    const newdiv = document.createElement("div");
    newdiv.className="task-card";
    newdiv.textContent =
        `${tasknumber}. | ${subject} | ${duration} | ${priority} `;

    const container = document.getElementById("Taskcontainer");

    // Delete button
    const deletebutton = document.createElement("button");
    deletebutton.className="delete-btn";
    deletebutton.textContent = "Delete";

    // Complete button
    const completebutton = document.createElement("button");
    completebutton.className="complete-btn";
    completebutton.textContent = "Complete";


    // COMPLETE BUTTON
    completebutton.addEventListener('click', () => {

        if (newdiv.style.textDecoration === "line-through") {

            // Undo
            newdiv.style.textDecoration = "none";
            newdiv.style.color = "black";
            completebutton.textContent = "Complete";

            tasks.completed = false;

        } else {

            // Mark complete
            newdiv.style.textDecoration = "line-through";
            newdiv.style.color = "gray";
            completebutton.textContent = "Undo";

            tasks.completed = true;
        }

        savetolocalstorage();
        updatecompletedtask();
    });


    // DELETE BUTTON
    deletebutton.addEventListener('click', () => {

        const index = arr.findIndex(item => item === tasks);

        if (index !== -1) {
            arr.splice(index, 1);
            savetolocalstorage();
        }

        // Remove task from webpage
        newdiv.remove();

        // Renumber remaining tasks
        renumberTasks();

        updatetask();
        updateemptymessage();
        updatecompletedtask();

        console.log(arr);
    });


    // Put buttons inside task div
    newdiv.appendChild(completebutton);
    newdiv.appendChild(deletebutton);

    // Add task to container
    container.appendChild(newdiv);

    // Clear inputs
    subvalue.value = "";
    durationmin.value = "";
    prioritytask.value = "Low";
});


// CLEAR ALL
const clearbutton = document.getElementById("Clearall");

clearbutton.addEventListener('click', () => {

    const container = document.getElementById("Taskcontainer");

    container.innerHTML = "";

    arr = [];

    console.log(arr);

    updatetask();
    updateemptymessage();
    savetolocalstorage();
    updatecompletedtask();
});


// RUN WHEN PAGE LOADS
updatetask();
updateemptymessage();
updatecompletedtask();


// DISPLAY SAVED TASKS
arr.forEach((task, index) => {

    const newdiv = document.createElement("div");
    newdiv.className="task-card";

    newdiv.textContent =
        `${index + 1}. | ${task.subject} | ${task.duration} | ${task.priority} `;


    // Complete button
    const completebutton = document.createElement("button");
    completebutton.className="complete-btn";
    completebutton.textContent = "Complete";


    // RESTORE COMPLETED STATE
    if (task.completed === true) {

        newdiv.style.textDecoration = "line-through";
        newdiv.style.color = "gray";
        completebutton.textContent = "Undo";
    }


    // COMPLETE BUTTON
    completebutton.addEventListener('click', () => {

        if (newdiv.style.textDecoration === "line-through") {

            // Undo
            newdiv.style.textDecoration = "none";
            newdiv.style.color = "black";
            completebutton.textContent = "Complete";

            task.completed = false;

        } else {

            // Mark complete
            newdiv.style.textDecoration = "line-through";
            newdiv.style.color = "gray";
            completebutton.textContent = "Undo";

            task.completed = true;
        }

        savetolocalstorage();
        updatecompletedtask();
    });


    // Delete button
    const deletebutton = document.createElement("button");
    deletebutton.className="delete-btn";
    deletebutton.textContent = "Delete";


    // DELETE BUTTON
    deletebutton.addEventListener('click', () => {

        const taskIndex = arr.findIndex(item =>
            item.subject === task.subject &&
            item.duration === task.duration &&
            item.priority === task.priority
        );

        if (taskIndex !== -1) {
            arr.splice(taskIndex, 1);
            savetolocalstorage();
        }

        newdiv.remove();

        renumberTasks();
        updatetask();
        updateemptymessage();
        updatecompletedtask();
    });


    newdiv.appendChild(completebutton);
    newdiv.appendChild(deletebutton);

    document.getElementById("Taskcontainer").appendChild(newdiv);
});