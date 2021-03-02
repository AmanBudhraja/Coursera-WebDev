//Selectors
const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo');



//Event Listeners
document.addEventListener('DOMContentLoaded', gettodos);
todobutton.addEventListener('click', addtodo);
todolist.addEventListener('click', deletecheck);
filteroption.addEventListener('click', filtertodo);

//Functions

function addtodo(event){
    //Prevents form from submitting
    event.preventDefault();
    
    //Todo div
    const tododiv = document.createElement('div');
    tododiv.classList.add("todo");
    
    //Create li
    const newtodo = document.createElement('li');
    newtodo.innerText = todoinput.value;
    newtodo.classList.add('todo-li');
    tododiv.appendChild(newtodo);

    //Add todo local storage
    savelocaltodos(todoinput.value); 

    //Check button
    const completedbutton = document.createElement('button');
    completedbutton.innerHTML = '<i class = "fas fa-check"></i>';
    completedbutton.classList.add('complete-button');
    tododiv.appendChild(completedbutton);

    //Trash button
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashbutton.classList.add('trash-button');
    tododiv.appendChild(trashbutton);

    //Append to list
    todolist.appendChild(tododiv);

    //Clear todo input value
    todoinput.value = "";
}

function deletecheck(e){
    const item = e.target;
    console.log(item);
    //Delete todo
    if(item.classList[0] === 'trash-button'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removelocalstoragetodo(todo);
        //Wait
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //Check mark
    if(item.classList[0] === 'complete-button'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filtertodo(e){
    const todos = todolist.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function savelocaltodos(todo){
    //Check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function gettodos(){
    //Check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo div
        const tododiv = document.createElement('div');
        tododiv.classList.add("todo");
        
        //Create li
        const newtodo = document.createElement('li');
        newtodo.innerText = todo;
        newtodo.classList.add('todo-li');
        tododiv.appendChild(newtodo);

        //Check button
        const completedbutton = document.createElement('button');
        completedbutton.innerHTML = '<i class = "fas fa-check"></i>';
        completedbutton.classList.add('complete-button');
        tododiv.appendChild(completedbutton);

        //Trash button
        const trashbutton = document.createElement('button');
        trashbutton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashbutton.classList.add('trash-button');
        tododiv.appendChild(trashbutton);

        //Append to list
        todolist.appendChild(tododiv);
    });
}

function removelocalstoragetodo(todo){
    //Check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoindex =  todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}