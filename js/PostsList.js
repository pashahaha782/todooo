export default class PostsList {

    static selectors = {
        root: '[data-js-container]',
        sortButtons: '[data-js-buttons-container]',
        searchInput: '[data-js-search-input]'
    }

    static classes = {
        userCard: 'user-card'
    }

    constructor() {
        this.instance = document.querySelector(PostsList.selectors.root)
        
        if(this.instance){
            this.sortContainer = document.querySelector(PostsList.selectors.sortButtons)
            this.searchInput= document.querySelector(PostsList.selectors.searchInput)

            this.bindEvents()
        }
    }

    loadUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => {
            this.users = json
            this.filteredUsers = [...json]
            console.log('Все загруженные пользователи:', this.users)
            this.displayUsers()
        })
        .catch(error => {
            console.error('Ошибка при загрузке пользователей:', error)
        })
    }

    displayUsers() {
        if (!this.instance) {
            console.error('Контейнер не найден.')
            return
        }

        this.instance.innerHTML = '<h1>СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h1>';

        if (this.filteredUsers.length === 0) {
            this.instance.innerHTML += '<p>Пользователи не найдены</p>';
            return;
        }

        this.filteredUsers.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = PostsList.classes.userCard; 

            userCard.innerHTML = `
                <div class="container__info">
                    <h2>${user.name}</h2>
                    <p>ID: ${user.id}</p>
                    <p>Username: ${user.username}</p>
                    <p>Email: <a href="mailto:${user.email}">${user.email}</a></p>
                </div>
                    `;

            this.instance.appendChild(userCard);
        })
    }

    setupSortListener() {
        if (!this.sortContainer) {
            console.log('Контейнер сортирвки не найден')
            return
        }

        this.sortContainer.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (event) => {
                const sortType = event.target.dataset.sort
           
                console.log(sortType)
                
                switch(sortType) {
                    case 'id':
                        this.filteredUsers.sort((a, b) => a.id - b.id)
                        break
                    case 'name':
                        this.filteredUsers.sort((a, b) => a.name.localeCompare(b.name))
                        break
                    case 'email':
                        this.filteredUsers.sort((a, b) => a.email.localeCompare(b.email))
                        break
                }
                this.displayUsers()
            })
        })
    }

    setupSearchListener() {
        if(!this.searchInput) {
            console.error('Полe поиска не найдено')
            return
        }
        this.searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase().trim()
            this.filterUsers(searchTerm)
        })
    }

    filterUsers(searchTerm) {
        if (searchTerm === '') {
            this.filteredUsers = [...this.users]
        } else {
            this.filteredUsers = this.users.filter(user => 
                user.username.toLowerCase().includes(searchTerm)
            )
        }
        this.displayUsers()
    }

    bindEvents() {
        this.users = []
        this.filteredUsers = []
        this.loadUsers()
        this.setupSortListener()
        this.setupSearchListener()
    }
}