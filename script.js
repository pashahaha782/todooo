const myHeadingInput = document.querySelector('[data-js-heading-input]')
const myBodyInput = document.querySelector('[data-js-body-input]')
const myAddButton = document.querySelector('[data-js-button]')
const myList = document.querySelector('[data-js-list]')
const myItem = document.querySelector('[data-js-todo-item]')
const listDeleteButton = document.querySelector('[data-js-todo-item-delete-button]')
const listEditButton = document.querySelector('[data-js-todo-item-edit-button]')

document.addEventListener('DOMContentLoaded', loadFromLocalStorage)

myAddButton.addEventListener('click', (event) => {
    event.preventDefault()

    if(!myHeadingInput.value && !myBodyInput.value) {
        return
    }

    createMyList()

})

myList.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-js-todo-item-delete-button')) {
        deleteItem(event.target)
    }
})

myList.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-js-todo-item-edit-button')) {
        editItem(event.target)
    }
})

function createMyList() {
    const myHeadingInputValue = myHeadingInput.value
    const myBodyInputValue = myBodyInput.value

    const newItem= {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        heading: myHeadingInputValue,
        body: myBodyInputValue
    }
    myList.innerHTML += 
    `
            <div class="todo-list__container">
                <li class="todo__item todo-item" data-js-todo-item id="${newItem.id}">
                    <p class="todo-heading">${myHeadingInputValue}</p>
                    <p class="todo-body">${myBodyInputValue}</p>
                    <button class="todo-item__delete-button button" data-js-todo-item-delete-button>Delete</button>
                    <button class="todo-item__edit-button button" data-js-todo-item-edit-button>Edit</button>
                </li>
            </div>

    `
    
    saveToLocalStorage(newItem)
}

function saveToLocalStorage(newItem) {
    const existingItem = JSON.parse(localStorage.getItem('todoItem')) || []
    existingItem.push(newItem)
    localStorage.setItem('todoItem', JSON.stringify(existingItem))
}

function removeFromLocalStorage(itemId) {
    const existingItem = JSON.parse(localStorage.getItem('todoItem')) || []
    const updatedItem = existingItem.filter(item => item.id !== itemId)
    localStorage.setItem('todoItem', JSON.stringify(updatedItem))
}

function loadFromLocalStorage() {
    const savedItem = JSON.parse(localStorage.getItem('todoItem')) || []
    
    savedItem.forEach(item => {
        myList.innerHTML += 
        `
            <div class="todo-list__container">
                <li class="todo__item todo-item" data-js-todo-item id="${item.id}">
                    <p class="todo-heading">${item.heading}</p>
                    <p class="todo-body">${item.body}</p>
                    <button class="todo-item__delete-button button" data-js-todo-item-delete-button>Delete</button>
                    <button class="todo-item__edit-button button" data-js-todo-item-edit-button>Edit</button>
                </li>
            </div>
        `
    })
}

function updateInLocalStorage(itemId, heading, body) {
    const existingItem = JSON.parse(localStorage.getItem('todoItem')) || []
    const itemIndex = existingItem.findIndex(item => item.id === itemId)
    
    if (itemIndex !== -1) {
        existingItem[itemIndex].heading = heading
        existingItem[itemIndex].body = body
        localStorage.setItem('todoItem', JSON.stringify(existingItem))
    }
}

function deleteItem(button) {
    const listItem = button.closest('li')
    const itemId = listItem.getAttribute('id')
    listItem.remove()
    removeFromLocalStorage(itemId)
}

function editItem(button) {
    const currentList = button.closest('li')
    const itemId = currentList.getAttribute('id')

    const headingValue = currentList.querySelector('.todo-heading').innerText
    const bodyValue = currentList.querySelector('.todo-body').innerText

    const newHeadingInput = prompt('Исправьте текущий заголовок:', headingValue)
    const newBodyInput = prompt('Исправьте текущее содержимое:', bodyValue)

    if(!newHeadingInput && !newBodyInput) {
        return
    }

    createEditedList(currentList, newHeadingInput, newBodyInput, itemId)
}

function createEditedList(currentListItem, heading, body, itemId) {
    if (heading) {
        currentListItem.querySelector('.todo-heading').innerText = heading
    }
    if (body) {
        currentListItem.querySelector('.todo-body').innerText = body
    }

    updateInLocalStorage(itemId, heading, body)
}