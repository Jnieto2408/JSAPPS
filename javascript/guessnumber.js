/* Guess Number APP */
let tries = 3;
let startToken = 1;
const statusGuess = document.getElementById("statusGuess");
const infoGuess = document.getElementById("infoGuess");
const mottoGuess = document.getElementById("mottoGuess");
let rndNumber = Math.floor(Math.random() * 10) + 1;
const startGuess = document.getElementById("startGuess");
startGuess.onclick = () => {
    if((tries == 3) && (startToken = 1)){
    statusGuess.innerText = ("Lets start! You have " + tries + " oportunities left");
    console.log(rndNumber);
    startToken = 0;
    } else {
        alert("Reset to start over");
    }
};
const resetGuess = document.getElementById("resetGuess");
resetGuess.onclick = () => {
    tries = 3;
    startToken = 1;
    statusGuess.innerText = ("");
    infoGuess.innerText = ("");
    rndNumber = Math.floor(Math.random() * 10) + 1;
    console.log(rndNumber);
};
const tryGuess = document.getElementById("tryGuess");
tryGuess.onclick = () => {
    const numberGuess = document.getElementById("numberGuess").value;
    console.log(numberGuess);
    tries = tries - 1;
    if(tries >= 1){
        if(numberGuess == rndNumber){
        infoGuess.innerText = ("CONGRATULATIONS YOU WIN");
        } else {
        statusGuess.innerText = ("Lets start! You have " + tries + " oportunities left");
        infoGuess.innerText = ("Try again, wrong guess");
        }
    } else{
        infoGuess.innerText = ("You ran out of opportunities, reset to try again");
    }
};