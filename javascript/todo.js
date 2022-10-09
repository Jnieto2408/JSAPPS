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
let formValidation = () => {
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
    }
};
formTodo.addEventListener("submit",(e) => {
    e.preventDefault();
    console.log("To-Do post");
    formValidation();
    formTodo.reset();
})