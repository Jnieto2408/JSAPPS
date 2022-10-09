/* To-Do APP */
class Todo {
    constructor(note, priority, status, date){
        this.note = note;
        this.priority = priority;
        this.status = status;
        this.date = date;
    }
}
const arrayTodo = [];
const formTodo = document.getElementById("formTodo");
const msgTodo = document.getElementById("msgTodo");
const posts = document.getElementById("posts");
const createTodoPost = () => {
    posts.innerHTML += `
    <div class="todoPost">
        <p>${priority.value}</p>
        <p>${todoNote.value}</p>
        <span class="options">
            <button onClick="checkToDo(this)" class="fas fa-check"></button>
            <button onClick="deleteToDo(this)" class="fas fa-trash-alt"></button>
        </span>
    </div>
    `;
};
const formValidation = () => {
    if (todoNote.value == ""){
        msgTodo.innerText = "Post cannot be blank";
        console.log("failure, retry");
    } else {
        console.log("succes");
        msgTodo.innerHTML = "";
        const todoNote = document.getElementById("todoNote");
        const priority = document.getElementById("priority");
        const date = new Date;
        const todo = new Todo(todoNote.value, priority.value, "incomplete", date);
        arrayTodo.push(todo);
        console.log(arrayTodo);
        createTodoPost();
    }
};
formTodo.addEventListener("submit",(e) => {
    e.preventDefault();
    console.log("To-Do post");
    formValidation();
    formTodo.reset();
});
const deleteToDo = (e) => {
    e.parentElement.parentElement.remove();
}