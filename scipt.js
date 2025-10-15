const myHeading = document.querySelector('[data-js-heading]')
const myBody = document.querySelector('[data-js-body]')
const myButton = document.querySelector('[data-js-button]')
const myUl = document.querySelector('[data-js-ul]')

function createList() {
    const newListItem = document.createElement('li')
    const newButtonDelete = document.createElement('button')
    const newButtonEdit = document.createElement('button')

    newButtonEdit.classList.add('button', 'but')
    newButtonEdit.innerText = 'edit'

    newButtonDelete.classList.add('button', 'but')   
    newButtonDelete.innerText = 'delete'

    newButtonDelete.addEventListener('click', del)

    newButtonEdit.addEventListener('click', function() {

        const currentHeading = myHeading.value
        const currentBody = myBody.value.trim()

                
        const newHeading = prompt('Новый заголовок:', currentHeading)
        myHeading.value = newHeading;
        console.log('nH', newHeading)
        const newBody = prompt('Новый текст:', currentBody)
        console.log(myBody.value.trim())

        
        if(newHeading.value !== myHeading.value || newBody.value !== myBody.value) {
            del
        
            myHeading.value = newHeading.toUpperCase()
            myBody.value = ' ' + newBody.toLocaleLowerCase()
        }

    })

    function del() {
        this.parentElement.remove()
    }

    newListItem.append(myHeading.value.toUpperCase())
    newListItem.append(' ', myBody.value.toLowerCase())
    newListItem.append(newButtonDelete)
    newListItem.append(newButtonEdit)

    myUl.appendChild(newListItem)
}



myButton.addEventListener('click', (event) => {
    event.preventDefault()
    if (!myHeading.value && !myBody.value) {
        return
    }
    createList()
})