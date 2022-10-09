/* To-Do APP */
class Todo {
    constructor(note, status, proiority, date){
        this.note = note;
        this.status = status;
        this.proiority = proiority;
        this.date = date;
    }
}
const arrayTodo = [];
const formTodo = document.getElementById("formTodo");
formTodo.addEventListener("submit",(e) => {
    e.preventDefault();
})