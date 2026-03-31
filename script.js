// All data Variables

let taskcount = document.getElementById("counttask");
let modals = document.getElementById("modals");
let openaddtaskmodal = document.getElementById("openaddtaskmodal");
let deletemultipletaskbtn = document.getElementById("deletemultipletaskbtn");
let filterbycategory = document.getElementById("filterbycategory");
let filterbypriority = document.getElementById("filterbypriority");
let themechange = document.getElementById("themechange");
let taskcontainer = document.getElementById("taskcontainer");
let newtaskmodal = document.getElementById("newtaskmodal")
let deletetaskmodal = document.getElementById("deletetaskmodal")
let updatetaskmodal = document.getElementById("updatetaskmodal")
let taskaddbtn = document.getElementById("taskaddbtn");
let closetaskmodal = document.getElementById("closetaskmodal");
let alltasklist = document.getElementById("alltasklist");
let closedeletemodal = document.getElementById("closedeletemodal");
let taskforupdate = document.getElementById("taskforupdate");
let closeupdteamodal = document.getElementById("closeupdteamodal");
let errormodal = document.getElementById("errormodal");
let closeupdatemodal = document.getElementById("closeupdatemodal")
let updatetasktitle = document.getElementById("updatetasktitle")
let updatemaintask = document.getElementById("updatemaintask")
let updatetaskcategory = document.getElementById("updatetaskcategory")
let updatetaskimportant = document.getElementById("updatetaskimportant")
// input data variables
let tasktitle = document.getElementById("tasktitle");
let maintask = document.getElementById("maintask");
let taskcategory = document.getElementById("taskcategory");
let taskimportant = document.getElementById("taskimportant");
let storedtask = JSON.parse(localStorage.getItem('alltask')) || [];
let storedcompletedtask = JSON.parse(localStorage.getItem("completedtask")) || [];
let storedpendingtask = JSON.parse(localStorage.getItem("pendingtask")) || [];
let tasklist = document.getElementById("tasklist");
loadcatergory()
showalltask();


document.getElementById("maintask").onclick = () => {
    showalltask();
}
// All Functions starts Here
// logic to open the modal
function openaddtaskmodalbox() {

    modals.style.display = "flex";
    newtaskmodal.style.display = "block";
}
function openupdatetaskmodal() {

    modals.style.display = "flex";
    updatetaskmodal.style.display = "block";
}
// logic to close the modal
function closetaskmodalbox() {

    modals.style.display = "none";
    newtaskmodal.style.display = "none";
}
function closeupdatetaskmodal() {

    modals.style.display = "none";
    updatetaskmodal.style.display = "none";
}
// logic to showerror modal

function showerror(message, backcolor, textcolor) {

    errormodal.innerText = message;
    errormodal.style.display = "block";
    errormodal.style.color = textcolor;
    errormodal.style.background = backcolor;
    setTimeout(() => {
        errormodal.style.display = "none";
    }, 2000);
}
// logic to show all task 

function showalltask(data = storedtask) {
    if (data.length <= 0) {
        tasklist.innerHTML = `
        <h1>There is nothing in main task </h1>
        <hr></hr>
        `
    }
    else {
        tasklist.innerHTML = "";

        data.forEach((element, index) => {

            let colordecide;

            if (element.priority == "high") {
                colordecide = "red";
            }
            if (element.priority == "normal") {
                colordecide = "green";
            }
            if (element.priority == "low") {
                colordecide = "yellow";
            }

            tasklist.innerHTML += `
        <div class="taskcard">
            
            <div class="taskinfo">
                <h3>Task Title: ${element.title}</h3>
                <p><b>Task Message: </b>${element.message}</p>
                <span><b>Task Category: </b>${element.category}</span>
                <span style="color:${colordecide}">
                    <b><b>Task Priority: </b>${element.priority}</b>
                </span>
            </div>

            <div class="taskactions">
                <button class="cardbtn" onclick="updatetask(${index})"> <img src="Edit.svg" alt="edit"> Edit </button>
                <button class="cardbtn" onclick="deletetask(${index})"><img src="Delete.svg" alt="delete"> Delete</button>
                <button class="cardbtn" onclick="completedtask(${index})" id="markcompletedbtn"><img src="Done.svg" alt="done">Mark as complete</button>
                <button class="cardbtn" onclick="pendingtask(${index})" id="markpendingbtn"><img src="Pending.svg" alt="pending"> Mark as pending</button>
            </div>

        </div>
        `;
        });
    }
}


function showcompletedtask(data = storedcompletedtask) {

    if (data.length <= 0) {
        tasklist.innerHTML = `
        <h1>No completed tasks yet — start completing some 🚀</h1>
        <hr></hr>
        `
    }
    else {
        tasklist.innerHTML = "";
        tasklist.innerHTML = `
        <h1>${data.length} Task Completed ✅</h1>
        <hr></hr>
        `

        data.forEach((element, index) => {

            let colordecide;

            if (element.priority == "high") {
                colordecide = "red";
            }
            if (element.priority == "normal") {
                colordecide = "green";
            }
            if (element.priority == "low") {
                colordecide = "yellow";
            }

            tasklist.innerHTML += `
        <div class="taskcard">
            
            
            <div class="taskinfo completed">
                <h3>Task Title: ${element.title}</h3>
                <p><b>Task Message: </b>${element.message}</p>
                <span><b>Task Category: </b>${element.category}</span>
                <span style="color:${colordecide}">
                    <b><b>Task Priority: </b>${element.priority}</b>
                </span>
            </div>

            <div class="taskactions">
                <button class="cardbtn" onclick="uncompletedtask(${index})" id="uncompletemarkbtn"><img src="Done.svg" alt="done">Mark as Uncomplete</button>
            </div>

        </div>
        `;
        });
    }
}


function showpendingtask(data = storedpendingtask) {

    if (data.length <= 0) {
        tasklist.innerHTML = `
        <h1>🎉 Hooray! No Pendig Task </h1>
        <hr></hr>
        `

    }
    else {
        tasklist.innerHTML = "";

        tasklist.innerHTML = `
        <h1>You have Total ${data.length} Pending Task </h1>
        <hr></hr>
        `
        data.forEach((element, index) => {

            let colordecide;

            if (element.priority == "high") {
                colordecide = "red";
            }
            if (element.priority == "normal") {
                colordecide = "green";
            }
            if (element.priority == "low") {
                colordecide = "yellow";
            }

            tasklist.innerHTML += `
        <div class="taskcard">
            
            <div class="taskinfo">
                <h3>Task Title: ${element.title}</h3>
                <p><b>Task Message: </b>${element.message}</p>
                <span><b>Task Category: </b>${element.category}</span>
                <span style="color:${colordecide}">
                    <b><b>Task Priority: </b>${element.priority}</b>
                </span>
            </div>

            <div class="taskactions">
             
                <button class="cardbtn" onclick="removependingtask(${index})" id="removependingbtn"><img src="Pending.svg" alt="pending"> Remove from pending</button>
            </div>

        </div>
        `;
        });
    }
}





function loadcatergory() {
    // filter options clear karke dubara add karo
    filterbycategory.innerHTML = `<option value="">Filter by Category</option>`;

    let uniqueCategories = [...new Set(storedtask.map(e => e.category))];

    uniqueCategories.forEach(cat => {
        filterbycategory.innerHTML += `
        <option value="${cat}">${cat}</option>
        `;
    });
}
// logic to filter by catergory
function categoryfilter(value) {
    if (value === "") {
        showalltask();
    }
    else {
        showalltask(storedtask.filter(elem => elem.category == value));
    }
}
filterbycategory.addEventListener("change", () => {
    categoryfilter(filterbycategory.value);

})
function priorityfilter(value) {

    if (value === "") {
        showalltask();
    }
    else {

        showalltask(storedtask.filter(elem => elem.priority == value));
    }
}


function updatetask(index) {
    let task = storedtask[index];
    updatetasktitle.value = task.title;
    updatemaintask.value = task.message;
    updatetaskcategory.value = task.category
    updatetaskimportant.value = task.priority
    openupdatetaskmodal();

    document.getElementById("updatetaskbtn").onclick = () => {
        storedtask[index] = {
            title: updatetasktitle.value,
            message: updatemaintask.value,
            category: updatetaskcategory.value,
            priority: updatetaskimportant.value,
        }
        localStorage.setItem("alltask", JSON.stringify(storedtask));
        showerror("Task Update Successfully", "green", "White");
        loadcatergory();
        showalltask();
        tasktitle.value = ""
        maintask.value = ""
        taskcategory.value = ""
        taskimportant.value = ""
        closetaskmodalbox();
    }



}


// compeleted task logic funtion 

function completedtask(index) {
    let alltask = storedtask[index];
    let completed = storedtask[index] = {
        title: alltask.title,
        message: alltask.message,
        category: alltask.category,
        priority: alltask.priority
    }

    storedcompletedtask.push(completed);
    localStorage.setItem("completedtask", JSON.stringify(storedcompletedtask));
    storedtask.splice(index, 1);
    localStorage.setItem("alltask", JSON.stringify(storedtask));
    showalltask();
    showerror("Task Marked Completed", "green", "White");
}


// uncompeleted task mark logic funtion 

function uncompletedtask(index) {
    let alluncompltedtask = storedcompletedtask[index];
    let uncompltedtaskdata = storedcompletedtask[index] = {
        title: alluncompltedtask.title,
        message: alluncompltedtask.message,
        category: alluncompltedtask.category,
        priority: alluncompltedtask.priority
    }

    storedtask.push(uncompltedtaskdata);
    localStorage.setItem("alltask", JSON.stringify(storedtask));
    storedcompletedtask.splice(index, 1);
    localStorage.setItem("completedtask", JSON.stringify(storedcompletedtask));
    showcompletedtask();
    showerror("Task Marked Uncompleted", "green", "White");

}






// Pending task logic funtion 

function pendingtask(index) {
    let alltask = storedtask[index];
    let pendingtaskdata = storedtask[index] = {
        title: alltask.title,
        message: alltask.message,
        category: alltask.category,
        priority: alltask.priority
    }

    storedpendingtask.push(pendingtaskdata);
    localStorage.setItem("pendingtask", JSON.stringify(storedpendingtask));
    storedtask.splice(index, 1);
    localStorage.setItem("alltask", JSON.stringify(storedtask));
    showpendingtask();
    showerror("Task Marked Pending", "red", "White");

}


// uncompeleted task mark logic funtion 

function removependingtask(index) {
    let allpendingdata = storedpendingtask[index];
    let removedpendingdata = storedpendingtask[index] = {
        title: allpendingdata.title,
        message: allpendingdata.message,
        category: allpendingdata.category,
        priority: allpendingdata.priority
    }

    storedtask.push(removedpendingdata);
    localStorage.setItem("alltask", JSON.stringify(storedtask));
    storedpendingtask.splice(index, 1);
    localStorage.setItem("pendingtask", JSON.stringify(storedpendingtask));
    showpendingtask();
    showerror("Task Marked Unpending", "green", "White");

}


// logic to delete the todo list
function deletetask(index) {
    storedtask.splice(index, 1);
    localStorage.setItem("alltask", JSON.stringify(storedtask));
    showerror("Task Delete Successfully", "red", "White");
    loadcatergory();
    showalltask();
}



// all btns action when user click 

filterbypriority.onclick = () => {
    priorityfilter(filterbypriority.value);
    console.log(filterbycategory.value);

}
openaddtaskmodal.onclick = () => {
    openaddtaskmodalbox();
}
closetaskmodal.onclick = () => {
    tasktitle.value = ""
    maintask.value = ""
    taskcategory.value = ""
    taskimportant.value = ""
    closetaskmodalbox();
}
closeupdatemodal.onclick = () => {
    tasktitle.value = ""
    maintask.value = ""
    taskcategory.value = ""
    taskimportant.value = ""
    closeupdatetaskmodal()
}

taskaddbtn.onclick = () => {
    let alltask = {
        title: tasktitle.value,
        message: maintask.value,
        category: taskcategory.value,
        priority: taskimportant.value,
    }
    storedtask.push(alltask);
    localStorage.setItem("alltask", JSON.stringify(storedtask));
    showerror("Task Added Successfully", "green", "White");
    loadcatergory()
    showalltask();
    tasktitle.value = ""
    maintask.value = ""
    taskcategory.value = ""
    taskimportant.value = ""
    closetaskmodalbox();

}

themechange.onclick = () => {
    document.getElementById("body").classList.toggle("dark")
}



document.getElementById("allcompletedtask").onclick = () => {
    showcompletedtask();
}


document.getElementById("allpendingtask").onclick = () => {
    showpendingtask();
}