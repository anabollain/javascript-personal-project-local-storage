'use strict';


//VARIABLES
const formAddItems = document.querySelector('.js-form-add-items');
const itemsList = document.querySelector('.js-todo-list');
const items = JSON.parse(localStorage.getItem('items')) || [];

//HANDLE FUNCTIONS
function handleAddItem(ev) {
    ev.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text: text,
        done: false
    };
    items.push(item);
    //Render list
    renderList(items, itemsList);
    //LS
    localStorage.setItem('items', JSON.stringify(items));
    //Method of a form element to refresh the input, to empty it
    this.reset();
}

function handleDeleteItem() {
    const clickedItemPosition = this.dataset.index;
    items.splice(clickedItemPosition, 1);
    localStorage.setItem('items', JSON.stringify(items));
    renderList(items, itemsList);
}

function handleToggleDone(ev) {
    //Do nothing if the clicked element is not input
    if(!ev.target.matches('input')) return;
    const clickedEl = ev.target;
    const index = clickedEl.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    renderList(items, itemsList);    
}

//RENDER FUNCTIONS
//Initial state of empty array to avoid having an error if we forget to pass in something
//Generic function with parameters to be able to reuse it in the future
function renderList(plates = [], platesList) {
    let content = plates.map((plate, i) => {
        return `
            <li class="todo__list--item">
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} class="item__checkbox"/>
                <label for="item${i}" class="item__label">${plate.text}</label>
                <i class="item__delete js-delete-icon fa-solid fa-circle-minus" data-index=${i}></i>
            </li>
        `;
    }).join('');
    platesList.innerHTML = content;
    const deleteIcons = document.querySelectorAll('.js-delete-icon');
    for(const deleteIcon of deleteIcons){
        deleteIcon.addEventListener('click', handleDeleteItem);
    }
}

renderList(items, itemsList);

//EVENT LISTENERS
formAddItems.addEventListener('submit', handleAddItem);
itemsList.addEventListener('click', handleToggleDone);