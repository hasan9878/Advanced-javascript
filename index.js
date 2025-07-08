

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
