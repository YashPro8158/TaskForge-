// All data Variables

let taskcount = document.getElementById("counttask");
let modals = document.getElementById("modals");
let openaddtaskmodal = document.getElementById("openaddtaskmodal");
let filterbycategory = document.getElementById("filterbycategory");
let filterbypriority = document.getElementById("filterbypriority");
let themechange = document.getElementById("themechange");
let newtaskmodal = document.getElementById("newtaskmodal")
let deletetaskmodal = document.getElementById("deletetaskmodal")
let updatetaskmodal = document.getElementById("updatetaskmodal")
let taskaddbtn = document.getElementById("taskaddbtn");
let taskpin = document.getElementById("taskpin");
let closetaskmodal = document.getElementById("closetaskmodal");
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


document.getElementById("allmaintask").onclick = () => {
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
                <button class="cardbtn" onclick="deletetask(${index})" id="taskdeleletbtn"><img src="Delete.svg" alt="delete"> Delete</button>
                <button class="cardbtn" onclick="completedtask(${index})" id="markcompletedbtn"><img src="Done.svg" alt="done">Mark as complete</button>
                <button class="cardbtn" onclick="pendingtask(${index})" id="markpendingbtn"><img src="Pending.svg" alt="pending"> Mark as pending</button>
                <button class="cardbtn" onclick="viewfulltask(${index})" id="viewfullbtn"><img src="fullviewicon.svg" alt="fullviewicon"> View Task</button>
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



// Show Full Width Task


function viewfulltask(index) {
    document.getElementById("taskfullwidth").style.display = "block";
    const data = storedtask[index];
    document.getElementById("taskfullwidth").innerHTML = `
    <div id="fullviewtaskcard">
        <div class="textcontents" >
            <h2>Task Title: </h2>
            <p>${data.title}</p>
            <h2>Task Message: </h2>
            <p>${data.message}</p>
            <div class="bottomflex">
                <h2>Task Category: </h2>
                <p>${data.category}</p>
                <h2>Task Priority: </h2>
                <p>${data.priority}</p>
            </div>
            <button id="closebtnfulltask" onclick="closefullviewtask()">Close</button>
        </div>
    </div>
    `

}
function closefullviewtask() {
    document.getElementById("taskfullwidth").style.display = "none";
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


    // checking is task is protected or not
    if (task.isprotected === true) {
        document.getElementById("pinmodalbox").classList.add("activepinbox");
        document.getElementById("pinmodalbox").innerHTML = `
    
    <div class="pincontent">
            <label for="checkpintext">Enter the Pin</label>
            <input type="number" name="checkpintext" id="checkpintext">
            <button id="checkpinbtn">Submit</button>
            <button id="closepinbox">Close</button>
    </div>
        
        `

        // checking is task password is correct or not 
        let inputtext = document.getElementById("checkpintext");
        let attempts = 0;
        document.getElementById("checkpinbtn").addEventListener("click", () => {
            if (Number(inputtext.value) === Number(storedtask[index].pin)) {
                document.getElementById("pinmodalbox").classList.remove("activepinbox");
                inputtext.value = ""
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
            else {
                attempts++
                showerror(`${attempts} Wrong Attempt, Try Again`, "red", "White");
                if (attempts > 2) {
                    document.getElementById("pinmodalbox").classList.remove("activepinbox");
                    showerror("To Many Attempts, Try again after some time", "red", "White");
                }
            }
        })

        document.getElementById("closepinbox").addEventListener("click", () => {
            document.getElementById("pinmodalbox").classList.remove("activepinbox");

        })
    }
    else {

        alert("No this object data not have any pin property !")
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
    let deletetaskdata = storedtask[index];

    // checking is task is protected or not
    if (deletetaskdata.isprotected === true) {
        document.getElementById("pinmodalbox").classList.add("activepinbox");
        document.getElementById("pinmodalbox").innerHTML = `
    
    <div class="pincontent">
            <label for="checkpintext">Enter the Pin</label>
            <input type="number" name="checkpintext" id="checkpintext">
            <button id="checkpinbtn">Submit</button>
            <button id="closepinbox">Close</button>
    </div>
        
        `

        // checking is task password is correct or not 
        let inputtext = document.getElementById("checkpintext");
        let attempts = 0;
        document.getElementById("checkpinbtn").addEventListener("click", () => {
            if (Number(inputtext.value) === Number(storedtask[index].pin)) {
                document.getElementById("pinmodalbox").classList.remove("activepinbox");
                inputtext.value = ""
                storedtask.splice(index, 1);
                localStorage.setItem("alltask", JSON.stringify(storedtask));
                showerror("Task Delete Successfully", "Green", "White");
                loadcatergory();
                showalltask();
            }
            else {
                attempts++
                showerror(`${attempts} Wrong Attempt, Try Again`, "red", "White");
                if (attempts > 2) {
                    document.getElementById("pinmodalbox").classList.remove("activepinbox");
                    showerror("To Many Attempts, Try again after some time", "red", "White");
                }
            }
        })

        document.getElementById("closepinbox").addEventListener("click", () => {
            document.getElementById("pinmodalbox").classList.remove("activepinbox");

        })
    }
    else {
        storedtask.splice(index, 1);
        localStorage.setItem("alltask", JSON.stringify(storedtask));
        showerror("Task Delete Successfully", "Green", "White");
        loadcatergory();
        showalltask();
    }


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
    let alltask;
    if (taskpin.value == "" || taskpin.value == null) {
        alltask = {
            title: tasktitle.value,
            message: maintask.value,
            category: taskcategory.value,
            priority: taskimportant.value,
            isprotected: false
        }
    }
    else {
        alltask = {
            title: tasktitle.value,
            message: maintask.value,
            category: taskcategory.value,
            priority: taskimportant.value,
            pin: taskpin.value,
            isprotected: true
        }
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
    taskpin.value = ""
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

// Security Logic Starts 


