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
formTodo.addEventListener("submit",(e) => {
    e.preventDefault();
    const todoNote = document.getElementById("todoNote");
    const priority = document.getElementById("priority");
    console.log(todoNote.value);
    console.log(priority.value);
    const date = new Date;
    const todo = new Todo(todoNote.value, priority.value, "incomplete", date);
    arrayTodo.push(todo);
    console.log(arrayTodo);
    formTodo.reset();    
})