class MyTodo {
    myHeadingInput = document.querySelector('[data-js-heading-input]')
    myBodyInput = document.querySelector('[data-js-body-input]')
    myAddButton = document.querySelector('[data-js-button]')
    myList = document.querySelector('[data-js-list]')
    myItem = document.querySelector('[data-js-todo-item]')
    listDeleteButton = document.querySelector('[data-js-todo-item-delete-button]')
    listEditButton = document.querySelector('[data-js-todo-item-edit-button]')

    constructor() {
        this.bindEvents()
    }

    onAddTask = (event) => {
            event.preventDefault()

            if(!this.myHeadingInput.value && !this.myBodyInput.value) {
                return
            }

            this.createMyList()

        }

    onDeleteTask = (event) => {
            if (event.target.hasAttribute('data-js-todo-item-delete-button')) {
                this.deleteItem(event.target)
            }
        }

    onEditTask = (event) => {
            if (event.target.hasAttribute('data-js-todo-item-edit-button')) {
                this.editItem(event.target)
            }
        }

    createMyList = () => {
    const myHeadingInputValue = this.myHeadingInput.value
    const myBodyInputValue = this.myBodyInput.value

    const newItem = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        heading: myHeadingInputValue,
        body: myBodyInputValue
    }
    this.myList.innerHTML += 
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
    
    this.saveToLocalStorage(newItem)
    }

    deleteItem = (button) => {
        const listItem = button.closest('li')
        const itemId = listItem.getAttribute('id')
        listItem.remove()
        this.removeFromLocalStorage(itemId)
    }

    editItem = (button) => {
        const currentList = button.closest('li')
        const itemId = currentList.getAttribute('id')

        const headingValue = currentList.querySelector('.todo-heading').innerText
        const bodyValue = currentList.querySelector('.todo-body').innerText

        const newHeadingInput = prompt('Исправьте текущий заголовок:', headingValue)
        const newBodyInput = prompt('Исправьте текущее содержимое:', bodyValue)

        if(!newHeadingInput && !newBodyInput) {
            return
        }

        this.createEditedList(currentList, newHeadingInput, newBodyInput, itemId)
    }

    createEditedList = (currentListItem, heading, body, itemId) => {
        if (heading) {
            currentListItem.querySelector('.todo-heading').innerText = heading
        }
        if (body) {
            currentListItem.querySelector('.todo-body').innerText = body
        }

        this.updateInLocalStorage(itemId, heading, body)
    }

    loadFromLocalStorage = () => {
    const savedItem = JSON.parse(localStorage.getItem('todoItem')) || []
    
        savedItem.forEach(item => {
            this.myList.innerHTML += 
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

    saveToLocalStorage = (newItem) => {
        const existingItem = JSON.parse(localStorage.getItem('todoItem')) || []
        existingItem.push(newItem)
        localStorage.setItem('todoItem', JSON.stringify(existingItem))
    }

    removeFromLocalStorage = (itemId) => {
        const existingItem = JSON.parse(localStorage.getItem('todoItem')) || []
        const updatedItem = existingItem.filter(item => item.id !== itemId)
        localStorage.setItem('todoItem', JSON.stringify(updatedItem))
    }

    updateInLocalStorage = (itemId, heading, body) => {
        const existingItem = JSON.parse(localStorage.getItem('todoItem')) || []
        const itemIndex = existingItem.findIndex(item => item.id === itemId)
        
        if (itemIndex !== -1) {
            existingItem[itemIndex].heading = heading
            existingItem[itemIndex].body = body
            localStorage.setItem('todoItem', JSON.stringify(existingItem))
        }
    }

    bindEvents() {
        document.addEventListener('DOMContentLoaded', this.loadFromLocalStorage)
        this.myAddButton.addEventListener('click',  this.onAddTask)
        this.myList.addEventListener('click', this.onDeleteTask)
        this.myList.addEventListener('click', this.onEditTask)
    }

}

new MyTodo