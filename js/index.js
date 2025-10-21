import MyTodo from "./MyTodo.js";
import PostsList from "./PostsList.js";

document.addEventListener("DOMContentLoaded", () => {
  new MyTodo()
  new PostsList()
})

// Делаешь класс PostList, который запршивает список users через fetch с адреса https://jsonplaceholder.typicode.com/users
// Проходишь по массиву users и выводишь карточки с юзерами
// Делаешь сортировку и поиск users