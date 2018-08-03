const addtodos = document.querySelector('.apps__todo--add');
const todoList = document.querySelector('.apps__todo--list');
const trashTodo = document.querySelector('.cleartodo')
const pageTitle = document.querySelector('title')
const todos = JSON.parse(localStorage.getItem('thingTodo')) || [];
const note = document.querySelector('.apps__note--text')
let noteText = localStorage.getItem('note') || ""
//saving notes 
function saveNote(){
    noteText = note.value
    localStorage.setItem('note', noteText)
}
note.value = noteText
//todos
function addTodo(e) { 
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };
    todos.push(item);
    populateList(todos, todoList);
    localStorage.setItem('thingTodo', JSON.stringify(todos));
    this.reset();
}

function populateList(dos = [], dosList) {
    dosList.innerHTML = dos.map((dos, i) => {
    return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${dos.done ? 'checked' : ''} />
        <label for="item${i}">${dos.text}</label>
        </li>
    `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    todos[index].done = !todos[index].done;
    localStorage.setItem('thingTodo', JSON.stringify(todos));
    populateList(todos, todoList);
}
function clearTodoStorage(){
    console.log('clear');
    const confirmbox =confirm('do you want me to clear your todo?')
    if(confirmbox === true){
        console.log('doing');
        localStorage.removeItem('thingTodo') 
        todos.splice(0,todos.length)  
        todoList.innerHTML= todos
    }  
}
//this changes the page title to be one of your todo's so you can see it if you have the tab open
let i = 0
setInterval(function(){
    pageTitle.innerText = `DO ${todos[i].text}!`
    i++
    if(i>todos.length){
        i = 0
    }
},30000)
populateList(todos, todoList);
addtodos.addEventListener('submit', addTodo);
todoList.addEventListener('click', toggleDone);
note.addEventListener('keyup', saveNote)
trashTodo.addEventListener('click', clearTodoStorage)
