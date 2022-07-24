//#region variables

var parentList = document.getElementById('list-items');
const taskInput = document.querySelector('.task-input input');
let todos = JSON.parse(localStorage.getItem("todo-list"));
var checkBtn = document.querySelector('input[type="checkbox"]');
var delBtn = document.querySelector('#list-items>li>*:nth-child(3)');
var total = document.querySelector('.total > li');
var remaining = document.querySelector('.remaining > li');
var done = document.querySelector('.done > li');
//#endregion variables end
//#region time settings
// get date 
const currentDate = new Date();
const monthOption = {month: 'long'};
const weekdayOption = {weekday:'long'};
const day = currentDate.toLocaleDateString('default',weekdayOption);
const month = currentDate.toLocaleDateString('default',monthOption);
const monthday = currentDate.getDate();

// define and set date elements
var monthdayElement = document.querySelector('.monthday');
var monthElement = document.querySelector('.month');
var weekdayElement = document.querySelector('.weekday');
monthdayElement.innerHTML = monthday;
monthElement.innerHTML = month;
weekdayElement.innerHTML = day;
//#endregion time settigns

//#region add event listener to elements
taskInput.addEventListener('keyup',e => {
    let userTask = taskInput.value.trim();
    if(e.key == 'Enter' && userTask){
        if(!todos){
            todos = [];
        }
        taskInput.value ="";
        let taskInfo = {name: userTask, status:"remainig"};
        todos.push(taskInfo);
        localStorage.setItem("todo-list",JSON.stringify(todos));
        ShowTodo();
    }
})
//#endregion add list items end

//#region function
function ShowTodo(){
    let li = "";
    if(todos){
        todos.forEach((todo,id) => {
            let isComplated = todo.status =="complated" ? "checked" : "";
        li += `<li class="d-flex gap-1 bg-input-light p-0-75 align-items-center">
                    <input type="checkbox" onclick ="updateStatus(this)" name="" id="${id}" ${isComplated}>
                    <label for="${id}"></label>
                     <!-- <a href="" class="d-flex align-items-center">
                        <img src="assets/icons/radio-button-off-svgrepo-com.svg" alt="">
                    </a> -->
                    <p contenteditable="true" class="${isComplated}" onclick ="editContent(${id}, '${todo.name}')">${todo.name}</p>
                    <a class="delete-btn ml-auto d-flex align-items-center" onclick="deleteItem(${id})" href="#">
                        <img src="assets/icons/delete.svg" alt="">
                    </a>
                </li>` ;
    });
    parentList.innerHTML = li;
    ItemCount();
    CheckedItemCount();
}
}
ShowTodo();
function updateStatus(selectedTask){
    let taskContent = selectedTask.parentElement.children.item(2);
    if(selectedTask.checked){
        taskContent.classList.add("checked");
        todos[selectedTask.id].status ="complated";
    }
    else{
        taskContent.classList.remove("checked");
        todos[selectedTask.id].status ="remaining";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
    CheckedItemCount();
}
function deleteItem(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    ShowTodo();
}
function ItemCount(){
    var totalItem = parentList.getElementsByTagName('li').length;
    total.innerHTML = totalItem;
}
function CheckedItemCount(){
    var uncheckedCount = 0;
    var checkedCount = 0;
    var checkedItem = parentList.getElementsByTagName('li');
    for (let i = 0; i < checkedItem.length; i++) {
        if(checkedItem.item(i).querySelector('input[type="checkbox"]').checked)
            checkedCount++;
        else
            uncheckedCount++;
    }
    remaining.innerHTML = uncheckedCount;
    done.innerHTML = checkedCount;
}
//#endregion function end
