export default class MyTodo {
    static selectors = {
        root: '[data-js-todo]',
        myBodyInput: '[data-js-body-input]',
        myHeadingInput: '[data-js-heading-input]',
        myAddButton: '[data-js-button]',
        myList: '[data-js-list]',
        myItem: '[data-js-todo-item]',
        listDeleteButton: '[data-js-todo-item-delete-button]',
        listEditButton: '[data-js-todo-item-edit-button]',


    }

    static classes = {
        todoHeading: ".todo-heading",
        deleteButton: 'data-js-todo-item-delete-button',
        editButton: 'data-js-todo-item-edit-button',
        todoBody: '.todo-body',
        headingPrompt: 'Исправьте текущий заголовок:',
        bodyPrompt: 'Исправьте текущее содержимое:',
    }
    
    static stateClasses = {
        isActive: "isActive"
    }

    static localStorageFields = {
        todoItem: 'todoItem',
    }

    constructor() {
        this.instance = document.querySelector(MyTodo.selectors.root)

        if(this.instance) {
            this.myHeadingInput = this.instance.querySelector(MyTodo.selectors.myHeadingInput)
            this.myBodyInput = this.instance.querySelector(MyTodo.selectors.myBodyInput)
            this.myAddButton = this.instance.querySelector(MyTodo.selectors.myAddButton)
            this.myList = this.instance.querySelector(MyTodo.selectors.myList)
            this.myItem = this.instance.querySelector(MyTodo.selectors.myItem)
            this.listDeleteButton = this.instance.querySelector(MyTodo.selectors.listDeleteButton)
            this.listEditButton = this.instance.querySelector(MyTodo.selectors.listEditButton)

            this.bindEvents()
            this.loadFromLocalStorage()
        }
    }

    onAddTask = (event) => {
            event.preventDefault()

            if(!this.myHeadingInput.value || !this.myBodyInput.value) {
                return
            }

            this.createMyList()

    }

    onDeleteTask = (event) => {
            if (event.target.hasAttribute(MyTodo.classes.deleteButton)) {
                this.deleteItem(event.target)
            }
    }

    onEditTask = (event) => {
            if (event.target.hasAttribute(MyTodo.classes.editButton)) {
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
                <li class="todo__item todo-item" data-js-todo-item id="${newItem.id}">
                    <p class="todo-heading">${myHeadingInputValue}</p>
                    <p class="todo-body">${myBodyInputValue}</p>
                    <button class="todo-item__delete-button button" data-js-todo-item-delete-button>Delete</button>
                    <button class="todo-item__edit-button button" data-js-todo-item-edit-button>Edit</button>
                </li>

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

        const headingValue = currentList.querySelector(MyTodo.classes.todoHeading).innerText
        const bodyValue = currentList.querySelector(MyTodo.classes.todoBody).innerText

        const newHeadingInput = prompt(MyTodo.classes.headingPrompt, headingValue)
        const newBodyInput = prompt(MyTodo.classes.bodyPrompt, bodyValue)

        if(!newHeadingInput && !newBodyInput) {
            return
        }

        this.createEditedList(currentList, newHeadingInput, newBodyInput, itemId)
    }

    createEditedList = (currentListItem, heading, body, itemId) => {
        if (heading) {
            currentListItem.querySelector(MyTodo.classes.todoHeading).innerText = heading
        }
        if (body) {
            currentListItem.querySelector(MyTodo.classes.todoBody).innerText = body
        }

        this.updateInLocalStorage(itemId, heading, body)
    }

    loadFromLocalStorage = () => {
    const savedItem = JSON.parse(localStorage.getItem(MyTodo.localStorageFields.todoItem)) || []
    
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
        const existingItem = JSON.parse(localStorage.getItem(MyTodo.localStorageFields.todoItem)) || []
        existingItem.push(newItem)
        localStorage.setItem(MyTodo.localStorageFields.todoItem, JSON.stringify(existingItem))
    }

    removeFromLocalStorage = (itemId) => {
        const existingItem = JSON.parse(localStorage.getItem(MyTodo.localStorageFields.todoItem)) || []
        const updatedItem = existingItem.filter(item => item.id !== itemId)
        localStorage.setItem(MyTodo.localStorageFields.todoItem, JSON.stringify(updatedItem))
    }

    updateInLocalStorage = (itemId, heading, body) => {
        const existingItem = JSON.parse(localStorage.getItem(MyTodo.localStorageFields.todoItem)) || []
        const itemIndex = existingItem.findIndex(item => item.id === itemId)
        
        if (itemIndex !== -1) {
            existingItem[itemIndex].heading = heading
            existingItem[itemIndex].body = body
            localStorage.setItem(MyTodo.localStorageFields.todoItem, JSON.stringify(existingItem))
        }
    }

    bindEvents() {
        this.myAddButton?.addEventListener('click',  this.onAddTask)
        this.myList?.addEventListener('click', this.onDeleteTask)
        this.myList?.addEventListener('click', this.onEditTask)
    }

}