//#region variables
var parentList = document.getElementById('list-items');
const taskInput = document.querySelector('.task-input input');
let todos = JSON.parse(localStorage.getItem("todo-list"));
var checkBtn = document.querySelector('input[type="checkbox"]');
var delBtn = document.querySelector('#list-items>li>*:nth-child(3)');
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
        li += `<li class="d-flex gap-1 bg-green p-1 align-items-center">
                    <input type="checkbox" onclick ="updateStatus(this)" name="" id="${id}" ${isComplated}>
                    <label for="${id}"></label>
                     <!-- <a href="" class="d-flex align-items-center">
                        <img src="assets/icons/radio-button-off-svgrepo-com.svg" alt="">
                    </a> -->
                    <p contenteditable="true" class="${isComplated}" onclick ="editContent(${id}, '${todo.name}')">${todo.name}</p>
                    <a class="delete-btn ml-auto d-flex align-items-center" onclick="deleteItem(${id})" href="">
                        <img src="assets/icons/delete.jpeg" alt="">
                    </a>
                </li>` ;
    });
    parentList.innerHTML = li;
}
}
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
}
function deleteItem(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    ShowTodo();
}
function Filter(){
    var all = Object.keys(localStorage);
    console.log(all);
}
Filter();
// function editContent(id,text){
    
// }
    ShowTodo();
// function AddItem(e){
//     e.preventDefault();
//     var getInput = document.getElementById('item').value;
//     // create element add class
//     var newListItem = document.createElement('li');
//     var newCheckBtn = document.createElement('input');
//     newCheckBtn.type = "checkbox";
//     var newP = document.createElement('p');
//     var newDelBtn = document.createElement('a');
//     var newDelBtnImg = document.createElement('img');
//     newListItem.className = 'd-flex gap-1 bg-green p-1 align-items-center';
//     newDelBtn.className = 'delete-btn ml-auto d-flex align-items-center';
//     newDelBtnImg.src = "assets/icons/delete.jpeg";
//     newP.setAttribute("contentEditable","true");
//     newDelBtn.addEventListener('click',DeleteItem);
//     newP.appendChild(document.createTextNode(getInput));
//     newListItem.appendChild(newCheckBtn);
//     newListItem.appendChild(newP);
//     newDelBtn.appendChild(newDelBtnImg);
//     newListItem.appendChild(newDelBtn);
//     parentList.appendChild(newListItem);
// }
// function DeleteItem(e){
//     e.preventDefault();
//     if (confirm('Are You Sure?')) {
//         parentList.removeChild(e.target.parentElement.parentElement);
//     }
// }
//#endregion function end
