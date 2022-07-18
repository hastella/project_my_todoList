let taskInput = document.querySelector(".task-input")
let addButton = document.querySelector(".add-button")
let tabs = document.querySelectorAll(".task-tabs div")
let underLine = document.getElementById("tab-underline")
let taskList = []
let filterList = []
let selectedTab = "all";
console.log(tabs)

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault()
        document.querySelector(".add-button").click()
    }
})
taskInput.addEventListener("focus", function(){taskInput.value=""})
addButton.addEventListener("click",addTask);

for (let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
      filter(event)
    })
  };

function addTask() {
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task)
    render()
}

function render() {
    let resultHTML = ""
    list = []
    if(selectedTab === "all") {
        list = taskList
    } else {
        list = filterList
    }
    
    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete) {
            resultHTML += `<div class="task task-done" id="${list[i].id}">
                <span>${list[i].taskContent}</span> 
                <div class="button-box">
                    <button onclick="toggleComplete('${list[i].id}')" id="return-logo"><i class="fa-solid fa-lg fa-arrow-rotate-left"></i></button>
                    <button onclick="deleteTask('${list[i].id}')" id="delete-logo"><i class="fa-solid fa-lg fa-trash-can"></i></button>
                </div>
            </div>`
        } else {
            resultHTML += `<div class="task" id="${list[i].id}">
                <span>${list[i].taskContent}</span> 
                <div class="button-box">
                    <button onclick="toggleComplete('${list[i].id}')" id="check-logo"><i class="fa-solid fa-lg fa-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')" id="delete-logo"><i class="fa-solid fa-lg fa-trash-can"></i></button>
                </div>
            </div>`
        } 
    }
    document.getElementById("task-list").innerHTML = resultHTML
}

function toggleComplete(id) {
    for (let i=0; i<taskList.length; i++){
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete
            break
        }
    }
    filter()
}

function deleteTask(id) {
    for (let i=0; i<taskList.length; i++){
        if(taskList[i].id === id) {
            taskList.splice(i,1)    //인덱스값 i번째에 있는 값을 삭제해준다.
        }
    }
    filter()
}

function filter(event) {
    if (event) {
        selectedTab = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top =
        event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
      }
    
    filterList = []
    if(selectedTab === "ongoing") {
        for (let i=0; i<taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i])    //false인 값만 (check가 되지 않은 항목) filterList 배열에 push로 추가해준다.
            }
        }
    } else if (selectedTab === "done"){
        for (let i=0; i<taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i])
            }
        }
    }
    render()
}


function randomIdGenerate() {
    return '_' + Math.random().toString(36).substring(2,9) //데이터에 중복되지 않는 랜덤 ID값 지정해주기
}