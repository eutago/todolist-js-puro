const body = document.getElementsByTagName('body')[0];
const inputAddTodoField = body.querySelector('#inputAddTodo');
const btnAddTodo = body.querySelector('#btnAddTodo');
const todosContainer = body.querySelector('#todosContainer');

let todos = [];

document.addEventListener('DOMContentLoaded', function () {
  fetchTodos();
});

function fetchTodos() {
  const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

  for (const todo of storedTodos) {
    const todoElement = document.createElement('div');
    todoElement.className = 'todo';
    todoElement.setAttribute('id', `${todo.id}`);

    const paragraph = document.createElement('p');
    paragraph.className = 'text-todo';
    paragraph.setAttribute('id', 'textTodo');
    paragraph.innerHTML = todo.text;

    const button = document.createElement('button');
    button.className = 'btn-remove-todo';
    button.setAttribute('id', 'btnRemoveTodo');
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2" > <polyline points="3 6 5 6 21 6"></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" ></path> <line x1="10" y1="11" x2="10" y2="17"></line> <line x1="14" y1="11" x2="14" y2="17"></line> </svg>';

    todoElement.appendChild(paragraph);
    todoElement.appendChild(button);

    todosContainer.appendChild(todoElement);
  }
}

function generateId() {
  const timestamp = new Date().getTime();
  return `${timestamp}-${Math.round(Math.random() * 500)}`;
}

function itemModel(text) {
  return {
    id: generateId(),
    text: text,
    done: false,
  };
}

btnAddTodo.addEventListener('click', function (event) {
  event.preventDefault();
  const inputAddTodo = inputAddTodoField.value;

  const item = itemModel(inputAddTodo);

  const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

  storedTodos.push(item);

  localStorage.setItem('todos', JSON.stringify(storedTodos));

  todosContainer.innerHTML = '';

  fetchTodos();

  inputAddTodoField.value = '';
});
