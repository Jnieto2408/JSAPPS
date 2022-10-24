/* Calculator APP */
const ac = document.getElementById("ac");
const del = document.getElementById("del");
const div = document.getElementById("div");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const mul = document.getElementById("mul");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const sum = document.getElementById("sum");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const min = document.getElementById("min");
const period = document.getElementById("period");
const zero = document.getElementById("zero");
const result = document.getElementById("result");

let currentNumber = "";
let previousNumber = 0;
let operation = "";

one.addEventListener("click", () => {
    currentNumber += 1;
});
two.addEventListener("click", () => {
    currentNumber += 2;
});
three.addEventListener("click", () => {
    currentNumber += 3;
});
four.addEventListener("click", () => {
    currentNumber += 4;
});
five.addEventListener("click", () => {
    currentNumber += 5;
});
six.addEventListener("click", () => {
    currentNumber += 6;
});
seven.addEventListener("click", () => {
    currentNumber += 7;
});
eight.addEventListener("click", () => {
    currentNumber += 8;
});
nine.addEventListener("click", () => {
    currentNumber += 9;
});
zero.addEventListener("click", () => {
    currentNumber += 0;
});
period.addEventListener("click", () => {
    currentNumber += ".";
    console.log(currentNumber);
});
ac.addEventListener("click", () => {
    currentNumber = "";
    previousNumber = 0;
});
del.addEventListener("click", () => {
    currentNumber = currentNumber.slice(0, -1);
});
sum.addEventListener("click", () => {
    previousNumber += parseFloat(currentNumber);
    if(isNaN(previousNumber)){
        previousNumber = 0;
        return
    } else {
        currentNumber = "";
        operation = "+";
        console.log("Previous number: ",previousNumber);
        console.log("Current number: ",currentNumber);
    }

});
min.addEventListener("click", () => {
    console.log("pendiente");
});