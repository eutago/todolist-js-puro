const body = document.getElementsByTagName('body')[0];
const inputAddTodoField = document.getElementById('inputAddTodo');
const btnAddTodo = document.getElementById('btnAddTodo');
const todosContainer = document.getElementById('todosContainer');
const btnRemoveTodo = document.getElementById('btnRemoveTodo');

function fetchTodos() {
  const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

  let todoElements = '';

  for (const todo of storedTodos) {
    const todoElement = `
      <div class="todo" id="${todo.id}">
      <p class="text-todo ${todo.done ? 'done' : ''}" id="textTodo">${
      todo.text
    }</p>
      <div class="buttons">
        <button onclick="doneTodos(this)" class="btn-done-todo" id="doneTodo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-check"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
        <button
          class="btn-remove-todo"
          id="btnRemoveTodo"
          onclick="removeTodo(this)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-trash-2"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            ></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
          `;

    todoElements += todoElement;
  }
  todosContainer.innerHTML = todoElements;

  if (todosContainer.innerHTML != '' || storedTodos == '[]') {
    todosContainer.style.display = 'grid';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  fetchTodos();
});

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

function newTodo(event) {
  event.preventDefault();
  const inputAddTodo = inputAddTodoField.value;

  if (inputAddTodo == '' || inputAddTodo.length <= 3) return;

  const item = itemModel(inputAddTodo);

  const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

  storedTodos.push(item);

  localStorage.setItem('todos', JSON.stringify(storedTodos));

  fetchTodos();

  inputAddTodoField.value = '';
}

function removeTodo(element) {
  const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

  storedTodos.forEach((todo) => {
    if (todo.id === element.parentElement.parentElement.id) {
      if (todo.done === false) {
        alert('Ops, tarefa não concluída!');
        return;
      }

      const index = storedTodos.findIndex(function (todo) {
        const paragraph =
          element.parentElement.parentElement.children[0].innerHTML;

        return todo.text === paragraph;
      });

      storedTodos.splice(index, 1);

      localStorage.setItem('todos', JSON.stringify(storedTodos));

      fetchTodos();
    }
  });
}

function doneTodos(element) {
  const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

  storedTodos.forEach(function (todo) {
    if (todo.id == element.parentElement.parentElement.id) {
      return (todo.done = true);
    }
  });

  localStorage.setItem('todos', JSON.stringify(storedTodos));

  fetchTodos();
}
