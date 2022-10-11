/* To-Do APP */
class Todo {
    constructor(note, priority, date){
        this.id = Math.random().toString()
        this.note = note;
        this.priority = priority;
        this.date = date;
    }
}
let arrayTodo = [];
const formTodo = document.getElementById("formTodo");
const msgTodo = document.getElementById("msgTodo");
const posts = document.getElementById("posts");
const formValidation = () => {
    if (todoNote.value === ""){
        msgTodo.innerText = "Post cannot be blank";
        console.log("failure, retry");
    } else {
        console.log("succes");
        msgTodo.innerHTML = "";
        const todoNote = document.getElementById("todoNote");
        const priority = document.getElementById("priority");
        const date = new Date;
        const todo = new Todo(todoNote.value, priority.value, date);
        arrayTodo.push(todo);
        console.log(arrayTodo);
        createTodoPost(todo);
    }
};
const createTodoPost = ({priority, note, id}) => {
    posts.innerHTML += `
    <div class="todoPost" id="${id}">
        <p>${priority}</p>
        <p>${note}</p>
        <span class="options">
            <button onClick="deleteToDo(this)" class="fas fa-trash-alt"></button>
        </span>
    </div>
    `;
};
formTodo.addEventListener("submit",(e) => {
    e.preventDefault();
    console.log("To-Do post");
    formValidation();
    formTodo.reset();
});
const deleteToDo = (e) => {
    e.parentElement.parentElement.remove();
    const todoId = e.parentElement.parentElement.id;
    arrayTodo = arrayTodo.filter((currentTodo) => currentTodo.id !== todoId);
    console.log(arrayTodo);
};