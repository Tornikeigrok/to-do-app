const input = document.getElementById('task');
const addButton = document.getElementById('add');
const removeButton = document.getElementById('delete');
const ul = document.querySelector('.list');
const theme = document.getElementById('theme');

//background storage
let save = localStorage.getItem('bgcolor');
document.body.classList.toggle(save);
if (save === 'dark') {
    theme.value = 'light';
}
else {
    theme.value = 'dark';
}
theme.addEventListener('click', (e) => {
    if (theme.value === 'dark') {
        document.body.classList.add('dark');
        localStorage.setItem('bgcolor', theme.value);
        theme.value = 'light';
    }
    else {
        document.body.classList.remove('dark');
        localStorage.setItem('bgcolor', theme.value);
        theme.value = 'dark';
    }
})

//to-do app storage

let itemsArray = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : [];

itemsArray.forEach(addTasks);

function addTasks(task) {
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-trash');
    const li = document.createElement('li');
    li.innerHTML = task;
    li.appendChild(icon);
    ul.appendChild(li);


     icon.addEventListener('click', () => {
        ul.removeChild(li);
        const index = itemsArray.indexOf(task);
        itemsArray.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(itemsArray));
    });
}

function saveTask(e){
     if (input.value !== '') {
        itemsArray.push(input.value);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        addTasks(input.value);
        input.value = '';
    }
}
addButton.addEventListener('click', saveTask);


input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
       saveTask();
    }
});
removeButton.addEventListener('click', () => {
    localStorage.removeItem('items');
    ul.textContent = '';
    itemsArray = [];
})



