document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector('#create-task-form');
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      buildToDo(e.target[["new-task-description"]].value);
      form.reset();
  })
})

function buildToDo(todo) {
  let listItem = document.createElement('li');
  let btn = document.createElement('button');
  let edit = document.createElement('button');
  btn.addEventListener('click', handleDelete);
  edit.addEventListener('click', handleEdit);
  btn.textContent = 'X';
  btn.id = 'xbtn';
  btn.className = 'editbuttons'
  edit.className = 'editbuttons'
  edit.textContent = 'Edit';
  edit.id = 'edit';
  listItem.textContent = `${todo}  `;
  listItem.appendChild(edit);
  listItem.appendChild(btn);
  let urgency = document.querySelector('#urgency');
  if (urgency.value === "urgent") {
    document.querySelector('#urgent_tasks').appendChild(listItem);
  } else if (urgency.value === "less-urgent") {
    listItem.style.color = 'orange';
    document.querySelector('#less_urgent_tasks').appendChild(listItem);
  } else if (urgency.value === "not-urgent") {
    listItem.style.color = 'green';
    document.querySelector('#not_urgent_tasks').appendChild(listItem);
  }
}

function handleDelete(e) {
  e.target.parentNode.remove()
};

function handleEdit (e) {
  let editForm = document.createElement('form')
  let todoText = e.target.parentNode.innerText;
  let newText = todoText.replace(' EditX', '');

  let input = document.createElement('input');
  input.type = 'text';
  input.value = newText;
  input.id = 'edit-to-do'
  input.className = 'editform'

  let save = document.createElement('input');
  save.type = 'submit';
  save.value = 'Save';
  save.className = 'editform'

  let editSelect = document.createElement('select');
  editSelect.className = 'editform'
  editSelect.id = "new-urgency";

  let newUrgent = document.createElement('option');
  let newUrgentText = document.createTextNode('Urgent');
  newUrgent.appendChild(newUrgentText);  
  newUrgent.setAttribute('value','urgent');
  newUrgent.className = 'red'
  editSelect.appendChild(newUrgent);

  let newLessUrgent = document.createElement('option');
  let newLessUrgentText = document.createTextNode('Less Urgent');
  newLessUrgent.appendChild(newLessUrgentText);  
  newLessUrgent.setAttribute('value','less-urgent');
  newLessUrgent.className = 'orange';
  editSelect.appendChild(newLessUrgent);

  let newNotUrgent = document.createElement('option');
  let newNotUrgentText = document.createTextNode('Not Urgent');
  newNotUrgent.appendChild(newNotUrgentText);
  newNotUrgent.className = 'green';
  newNotUrgent.setAttribute('value','not-urgent');
  editSelect.appendChild(newNotUrgent);

  editForm.append(input);
  editForm.append(editSelect);
  editForm.append(save);

  e.target.parentNode.append(editForm);

  let editButton = document.querySelector('#edit');
  let xButton = document.querySelector('#xbtn');

  e.target.parentNode.removeChild(xButton);
  e.target.parentNode.removeChild(editButton);

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    editToDo(e.target["edit-to-do"].value);
    editForm.parentNode.remove()
  })
}

function editToDo(todo) {
  let listItem = document.createElement('li');
  let btn = document.createElement('button');
  btn.className = 'editbuttons'
  let edit = document.createElement('button');
  edit.className = 'editbuttons'
  btn.addEventListener('click', handleDelete);
  edit.addEventListener('click', handleEdit);
  btn.textContent = 'X';
  btn.id = 'xbtn';
  edit.textContent = 'Edit';
  edit.id = 'edit';
  listItem.textContent = `${todo}  `;
  listItem.appendChild(edit);
  listItem.appendChild(btn);
  let newUrgency = document.querySelector('#new-urgency');
  if (newUrgency.value === "urgent") {
    document.querySelector('#urgent_tasks').appendChild(listItem);
  } else if (newUrgency.value === "less-urgent") {
    document.querySelector('#less_urgent_tasks').appendChild(listItem);
  } else if (newUrgency.value === "not-urgent") {
    document.querySelector('#not_urgent_tasks').appendChild(listItem);
  }
}