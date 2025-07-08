const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// --- 1. Add Todo ---
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