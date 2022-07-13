let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let task = document.querySelectorAll(".task-tabs div")
let checkButton = document.getElementById("check-button")
let deleteButton = document.getElementById("delete-button")
let taskList = []

addButton.addEventListener("click",addTask)

function addTask() {
    let taskContent = taskInput.value
    taskList.push(taskContent)
    console.log(taskList)

    render()
}

function render() {
    let resultHTML = ``
    for(i=0; i<taskList.length; i++) {
        resultHTML += `
        <div class="task">
            <div>${taskList[i]}</div>
                <div>
                    <button id="check-button">Check</button>
                    <button id="delete-button">Delete</button>
                </div>
        </div>`
    }

    document.getElementById("task-list").innerHTML = resultHTML

}

function randomIdGenerate() {
    return '_' + Math.random().toString(36).substring(2,9) //데이터에 중복되지 않는 랜덤 ID값 지정해주기
}