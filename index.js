

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// --- 5. Add Todo ---
function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
  const span = document.createElement("span");
  span.textContent = text;
  span.className = "flex-grow";
  li.append(span);
  todoList.appendChild(li);
  // Input clear handled in separate feature
}
addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodo();
});
// Commit 5: Add todo functionality


// --- 2. Delete Todo ---
function addDeleteButton(li) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "text-red-600 hover:underline";
  deleteBtn.onclick = () => li.remove();
  li.append(deleteBtn);
}
// Patch addTodo to include delete button
const originalAddTodo = addTodo;
function addTodoWithDelete() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
  const span = document.createElement("span");
  span.textContent = text;
  span.className = "flex-grow";
  li.append(span);
  addDeleteButton(li);
  todoList.appendChild(li);
}
addBtn.removeEventListener("click", originalAddTodo);
addBtn.addEventListener("click", addTodoWithDelete);
input.removeEventListener("keypress", function (e) {
  if (e.key === "Enter") originalAddTodo();
});
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodoWithDelete();
});
// Commit 6: Add delete functionality

// --- 3. Mark as Done ---
function addDoneButton(li, span) {
  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✓";
  doneBtn.title = "Mark as Done";
  doneBtn.className = "text-green-600 hover:text-green-800 font-bold mr-2";
  doneBtn.onclick = () => {
    span.classList.toggle("line-through");
    span.classList.toggle("text-gray-400");
  };
  li.append(doneBtn);
}
// Patch addTodoWithDelete to include done button
const originalAddTodoWithDelete = addTodoWithDelete;
function addTodoWithDeleteAndDone() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
  const span = document.createElement("span");
  span.textContent = text;
  span.className = "flex-grow";
  li.append(span);
  addDoneButton(li, span);
  addDeleteButton(li);
  todoList.appendChild(li);
}
addBtn.removeEventListener("click", originalAddTodoWithDelete);
addBtn.addEventListener("click", addTodoWithDeleteAndDone);
input.removeEventListener("keypress", function (e) {
  if (e.key === "Enter") originalAddTodoWithDelete();
});
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodoWithDeleteAndDone();
});
// Commit 7: Add mark as done functionality
