const addtodos = document.querySelector('.apps__todo--add');
const todoList = document.querySelector('.apps__todo--list');
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
    console.log('hi');
    console.log(e);
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
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

populateList(todos, todoList);
addtodos.addEventListener('submit', addTodo);
todoList.addEventListener('click', toggleDone);
note.addEventListener('keyup', saveNote)
