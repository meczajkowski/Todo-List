const userNameInput = document.querySelector('#name');
const newTodoForm = document.querySelector('#new-todo-form');
const newTodoInput = document.querySelector('#content');
const todoList = document.querySelector('#todo-list');
const allTodos = JSON.parse(localStorage.getItem('allTodos')) || [];

const displayAllTodos = (allTodos) => {
  todoList.innerHTML = '';
  allTodos.forEach((todo) => {
    console.log(todo);
    const markup = `
        <div class="todo-item ${todo.done ? 'done' : ''}" data-id="${
      todo.createdAt
    }">
            <label class="todo-inline">
                <label class="todo-checkbox">
                    <input type="checkbox" ${todo.done ? 'checked' : ''} />
                    <span class="bubble ${todo.category}"></span>
                </label>
                <p class="todo-content">
                ${todo.content}
                </p>
            </label>
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        </div>
        `;

    todoList.insertAdjacentHTML('afterbegin', markup);
  });
};

const handleAddTodo = (event) => {
  event.preventDefault();

  const newTodo = {
    content: event.target.elements.content.value,
    category: event.target.elements.category.value,
    done: false,
    createdAt: new Date().getTime(),
  };

  console.log(newTodo);
  if (!newTodo.content || !newTodo.category) {
    alert('pls fill all inputs');
    return;
  }

  allTodos.push(newTodo);
  localStorage.setItem('allTodos', JSON.stringify(allTodos));

  event.target.reset();
  displayAllTodos(allTodos);
};

///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

userNameInput.value = localStorage.getItem('userName') || '';
displayAllTodos(allTodos);

userNameInput.addEventListener('input', () => {
  localStorage.setItem('userName', userNameInput.value);
});

newTodoForm.addEventListener('submit', handleAddTodo);

todoList.addEventListener('click', (event) => {
  const clickedElement = event.target;
  const todoItem = clickedElement.closest('.todo-item');
  const todoItemID = +todoItem.getAttribute('data-id');

  //   handling the 'done' state
  if (clickedElement === clickedElement.closest('input')) {
    const [theOne] = allTodos.filter((todo) => todo.createdAt === todoItemID);
    theOne.done = !theOne.done;
    todoItem.classList.toggle('done');

    localStorage.setItem('allTodos', JSON.stringify(allTodos));
  }

  if (clickedElement === clickedElement.closest('.delete')) {
    allTodos.splice(
      allTodos.findIndex((todo) => todo.createdAt === todoItemID)
    );
    displayAllTodos(allTodos);
  }
});
