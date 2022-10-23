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
one.addEventListener("click", () => {
    currentNumber += 1;
    console.log(currentNumber);
});
two.addEventListener("click", () => {
    currentNumber += 2;
    console.log(currentNumber);
});
three.addEventListener("click", () => {
    currentNumber += 3;
    console.log(currentNumber);
});
four.addEventListener("click", () => {
    currentNumber += 4;
    console.log(currentNumber);
});
five.addEventListener("click", () => {
    currentNumber += 5;
    console.log(currentNumber);
});
six.addEventListener("click", () => {
    currentNumber += 6;
    console.log(currentNumber);
});
seven.addEventListener("click", () => {
    currentNumber += 7;
    console.log(currentNumber);
});
eight.addEventListener("click", () => {
    currentNumber += 8;
    console.log(currentNumber);
});
nine.addEventListener("click", () => {
    currentNumber += 9;
    console.log(currentNumber);
});
zero.addEventListener("click", () => {
    currentNumber += 0;
    console.log(currentNumber);
});
period.addEventListener("click", () => {
    currentNumber += ".";
    console.log(currentNumber);
});
ac.addEventListener("click", () => {
    currentNumber = "";
    console.log(currentNumber);
});
del.addEventListener("click", () => {
    currentNumber = currentNumber.slice(0, -1);
    console.log(currentNumber);
});