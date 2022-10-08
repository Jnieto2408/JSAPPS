/* Counter APP */
let count = 0;
let saves = 0;
const countNumber = document.getElementById("countNumber");
const incrementBtn = document.getElementById("incrementBtn");
incrementBtn.onclick = () => {
    count = count + 1;
    console.log(count);
    countNumber.innerText = count;
}
const decreaseBtn = document.getElementById("decreaseBtn");
decreaseBtn.onclick = () => {
    count = count - 1;
    console.log(count);
    countNumber.innerText = count;
}
const saveCount = document.getElementById("saveCount");
const saveNumber = document.getElementById("saveNumber");
saveCount.onclick = () => {
    if (saves == 0){
        let countStr = count;
        saveNumber.textContent += countStr;
        saves = 1;
        count = 0;
    } else {
        let countStr = " / " + count;
        saveNumber.textContent += countStr;
        count = 0;
    }
    countNumber.innerText = count;
}
const resetCount = document.getElementById("resetCount");
resetCount.onclick = () => {
    let countStr = "Previous entries: ";
    saveNumber.textContent = countStr;
    count = 0;
    saves = 0;
    countNumber.innerText = count;
}