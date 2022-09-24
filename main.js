let count = 0;
let saves = 0;
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
    if (saves == 0){
        let countStr = count;
        saveEl.textContent += countStr;
        saves = 1;
        count = 0;
    } else {
        let countStr = " / " + count;
        saveEl.textContent += countStr;
        count = 0;
    }
    countEl.innerText = count;
};
function reset(){
    let countStr = "Previous entries: ";
    saveEl.textContent = countStr;
    count = 0;
    saves = 0;
    countEl.innerText = count;
};