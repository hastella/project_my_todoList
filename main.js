let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let tabs = document.querySelectorAll(".task-tabs div")
let underline = document.getElementById("underline")
let taskList = []
let mode = "all"
let filterList = []
addButton.addEventListener("click",addTask)
tabs.forEach(menu=>menu.addEventListener("click",(e)=>indicator(e)))

for (let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}
console.log(tabs)


function addTask() {
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList)

    render()
}

function render() {
    let list = []
    if(mode == "all"){
        list = taskList
    } else if(mode == "ongoing" || mode == "done") {
        list = filterList
    }
    let resultHTML = ``
    for(i=0; i<list.length; i++) {
        if(list[i].isComplete == true){
            resultHTML += `
            <div class="task">
                <div class="task-done">${list[i].taskContent}</div> 
                <span>
                    <button onclick="toggleComplete('${list[i].id}')" id="return-logo"><i class="fa-solid fa-lg fa-arrow-rotate-left"></i></button>
                    <button onclick="deleteTask('${list[i].id}')" id="delete-logo"><i class="fa-solid fa-lg fa-trash-can"></i></button>
                </span>
            </div>`
        } else {
            resultHTML += `
            <div class="task">
                <div>${list[i].taskContent}</div> 
                <span>
                    <button onclick="toggleComplete('${list[i].id}')" id="check-logo"><i class="fa-solid fa-lg fa-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')" id="delete-logo"><i class="fa-solid fa-lg fa-trash-can"></i></button>
                </span>
            </div>`
        } 
    }
    document.getElementById("task-list").innerHTML = resultHTML
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete
            break;
        }
    }
    render()
    console.log(taskList)
}

function deleteTask(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id) {
            taskList.splice(i,1)    //인덱스값 i번째에 있는 값을 삭제해준다.
            break;
        }
    }
    render()
}

function filter(event) {
    mode=event.target.id     //아이템을 클릭했을때 어떠한 이벤트가 일어나는지 알려주는 것이 event
    filterList = []
    if(mode == "all") {
        render()
    } else if(mode == "ongoing") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i])    //false인 값만 (check가 되지 않은 항목) filterList 배열에 push로 추가해준다.
            }
        }
        render()
    } else if(mode == "done"){
        for(let i=0; i<taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function indicator(e){
    underline.style.left = e.currentTarget.offsetLeft + "px"
    underline.style.width = e.currentTarget.offsetWidth + "px"
    underline.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "1em" + "px"
}


function randomIdGenerate() {
    return '_' + Math.random().toString(36).substring(2,9) //데이터에 중복되지 않는 랜덤 ID값 지정해주기
}