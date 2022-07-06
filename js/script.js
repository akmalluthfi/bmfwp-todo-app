function generateId() {
  return +new Date();
}

function generateTodoObj(id, title, date, isComplete) {
  return { id, title, date, isComplete };
}

// array todo list
const todos = [];

function renderTodos() {
  // get todo list
  const uncompleteTodoList = document.getElementById('todos');
  // reset html todo list
  uncompleteTodoList.innerHTML = '';
  // render todo

  todos.forEach((todo) => {
    const todoElement = makeTodo(todo);
    if (!todo.isComplete) {
      uncompleteTodoList.append(todoElement);
    }
  });
}

function makeTodo(todo) {
  // create title
  const textTitle = document.createElement('h2');
  textTitle.innerText = todo.title;

  // create date
  const textDate = document.createElement('p');
  textDate.innerText = todo.date;

  // create text container
  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textDate);

  // create todoContainer
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('item', 'shadow');
  todoContainer.append(textContainer);
  todoContainer.setAttribute('id', `todo-${todo.id}`);

  // validate if todo was complete or not
  if (todo.isComplete) {
    // create button undo
    const btnUndo = document.createElement('button');
    btnUndo.classList.add('undo-button');
    // add event listener
    btnUndo.addEventListener('click', function () {
      undoTaskFromCompleted(todo.id);
    });
    // create button delete
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('trash-button');
    // add event listener
    btnDelete.addEventListener('click', function () {
      removeTaskFromCompleted(todo.id);
    });
    // append to container
    todoContainer.append(btnUndo, btnDelete);
  } else {
    // create check button
    const btnCheck = document.createElement('button');
    btnCheck.classList.add('check-button');
    // add event listener
    btnCheck.addEventListener('click', function () {
      addTaskToCompleted(todo.id);
    });
    // append to container
    todoContainer.append(btnCheck);
  }

  return todoContainer;
}

function undoTaskFromCompleted(id) {
  console.log('undo');
}

function removeTaskFromCompleted(id) {
  console.log('remove');
}

function addTaskToCompleted(id) {
  // get todo
  const todo = getTodo(id);

  if (todo === null) return;
  // change isComplete
  todo.isComplete = true;
  // render Todo
  renderTodos();
}

function getTodo(id) {
  for (const todo of todos) {
    if (todo.id === id) return todo;
  }
  return null;
}

document.addEventListener('DOMContentLoaded', function () {
  // create event when form is submit
  const form = document.getElementById('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // get input title and date
    const title = this.querySelector('#title').value;
    const date = this.querySelector('#date').value;

    // generate id
    const id = generateId();
    // create object
    const todoObj = generateTodoObj(id, title, date, false);
    // add to todos
    todos.push(todoObj);

    // render todos list
    renderTodos();
  });
});
