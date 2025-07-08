

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


// --- 4. Edit Todo ---
function addEditButton(li, span) {
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "text-yellow-600 hover:underline mr-2";
  editBtn.onclick = () => {
    const oldText = span.textContent;
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = oldText;
    inputField.className = "flex-grow p-1 border rounded";
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "text-blue-600 hover:underline ml-2";
    li.innerHTML = "";
    li.append(inputField, saveBtn);
    saveBtn.onclick = () => {
      const newText = inputField.value.trim();
      if (!newText) return;
      span.textContent = newText;
      li.innerHTML = "";
      li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
      li.append(span);
      addDoneButton(li, span);
      addEditButton(li, span);
      addDeleteButton(li);
    };
    inputField.focus();
  };
  li.append(editBtn);
}
// Patch addTodoWithDeleteAndDone to include edit button
const originalAddTodoWithDeleteAndDone = addTodoWithDeleteAndDone;
function addTodoWithAllFeatures() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
  const span = document.createElement("span");
  span.textContent = text;
  span.className = "flex-grow";
  li.append(span);
  addDoneButton(li, span);
  addEditButton(li, span);
  addDeleteButton(li);
  todoList.appendChild(li);
}
addBtn.removeEventListener("click", originalAddTodoWithDeleteAndDone);
addBtn.addEventListener("click", addTodoWithAllFeatures);
input.removeEventListener("keypress", function (e) {
  if (e.key === "Enter") originalAddTodoWithDeleteAndDone();
});
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodoWithAllFeatures();
});
// Commit 8: Add edit functionality


// --- 5. Duplicate Prevention ---
function isDuplicate(text) {
  const items = document.querySelectorAll("#todo-list li span");
  for (let item of items) {
    if (item.textContent.toLowerCase() === text.toLowerCase()) {
      return true;
    }
  }
  return false;
}
const originalAddTodoWithAllFeatures = addTodoWithAllFeatures;
function addTodoWithAllFeaturesAndDuplicatePrevention() {
  const text = input.value.trim();
  if (!text) return;
  if (isDuplicate(text)) {
    alert("এই টাস্কটি ইতিমধ্যে তালিকায় রয়েছে!");
    return;
  }
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
  const span = document.createElement("span");
  span.textContent = text;
  span.className = "flex-grow";
  li.append(span);
  addDoneButton(li, span);
  addEditButton(li, span);
  addDeleteButton(li);
  todoList.appendChild(li);
}
addBtn.removeEventListener("click", originalAddTodoWithAllFeatures);
addBtn.addEventListener("click", addTodoWithAllFeaturesAndDuplicatePrevention);
input.removeEventListener("keypress", function (e) {
  if (e.key === "Enter") originalAddTodoWithAllFeatures();
});
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTodoWithAllFeaturesAndDuplicatePrevention();
});
// Commit 9: Add duplicate prevention

