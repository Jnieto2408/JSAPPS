let count = 0;
console.log(count);
let countEl = document.getElementById("count-el");
let saveEl = document.getElementById("save-el");
function increment(){
    count = count + 1;
    console.log(count);
    countEl.innerText = count;
};
function decrease(){
    count = count - 1;
    console.log(count);
    countEl.innerText = count;
};
function save(){
    let countStr = count + " / ";
    saveEl.textContent += countStr;
    count = 0;
    countEl.innerText = count;
};
function reset(){
    let countStr = "Previous entries: ";
    saveEl.textContent = countStr;
    count = 0;
    countEl.innerText = count;
};