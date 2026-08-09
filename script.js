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

function updatetask(){
    const tasktotal=document.getElementById("totaltask");
    const totaltask=arr.length;
    tasktotal.textContent=`Total task: ${totaltask}`;
}

function updateemptymessage(){
    const msg=document.getElementById("emptystg");
    if(arr.length===0)
        msg.style.display="block";
    else 
        msg.style.display="none";
}
function savetolocalstorage() {
    localStorage.setItem("tasks", JSON.stringify(arr));
}

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
    };

    // Store in array
    arr.push(tasks);
    savetolocalstorage();
    updatetask();
    updateemptymessage();

    const tasknumber = arr.length;

    console.log("Task Added");
    console.log(arr);

    // Create task div
    const newdiv = document.createElement("div");
    newdiv.textContent = `${tasknumber}. | ${subject} | ${duration} | ${priority} `;

    const container = document.getElementById("Taskcontainer");

    // Create delete button
    const deletebutton = document.createElement("button");
    deletebutton.textContent = "Delete";
    const completebutton=document.createElement("button");
    completebutton.textContent="Complete";



    //complete button
    completebutton.addEventListener('click', () => {

    if (newdiv.style.textDecoration === "line-through") {
        // Undo
        newdiv.style.textDecoration = "none";
        newdiv.style.color = "black";
        completebutton.textContent = "Complete";
    }
    else {
        // Mark complete
        newdiv.style.textDecoration = "line-through";
        newdiv.style.color = "gray";
        completebutton.textContent = "Undo";
    }
});

    // Delete functionality
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

        console.log(arr);
    });

    // Put button inside task div
    newdiv.appendChild(completebutton);
    newdiv.appendChild(deletebutton);

    // Add task to container
    container.appendChild(newdiv);

    // Clear inputs
    subvalue.value = "";
    durationmin.value = "";
    prioritytask.value = "Low";
});

const clearbutton=document.getElementById("Clearall");
clearbutton.addEventListener('click', ()=>{
    const container=document.getElementById("Taskcontainer");
    container.innerHTML="";
    arr=[];
    console.log(arr);
    updatetask();
    updateemptymessage();
    savetolocalstorage();

});
// Run when page loads
updatetask();
updateemptymessage();

// Run when page loads
updatetask();
updateemptymessage();

arr.forEach((task, index) => {
    const newdiv = document.createElement("div");
    newdiv.textContent = `${index + 1}. | ${task.subject} | ${task.duration} | ${task.priority} `;

    // Complete button
    const completebutton = document.createElement("button");
    completebutton.textContent = "Complete";

    completebutton.addEventListener('click', () => {
        if (newdiv.style.textDecoration === "line-through") {
            newdiv.style.textDecoration = "none";
            newdiv.style.color = "black";
            completebutton.textContent = "Complete";
        } else {
            newdiv.style.textDecoration = "line-through";
            newdiv.style.color = "gray";
            completebutton.textContent = "Undo";
        }
    });

    // Delete button
    const deletebutton = document.createElement("button");
    deletebutton.textContent = "Delete";

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
    });

    newdiv.appendChild(completebutton);
    newdiv.appendChild(deletebutton);

    document.getElementById("Taskcontainer").appendChild(newdiv);
});