/* Guess Number APP */
let tries = 3;
let statusGuess = document.getElementById("status-guess");
let infoGuess = document.getElementById("info-guess");
let motGuess = document.getElementById("mot-guess");
let rndNumber = Math.floor(Math.random() * 10) + 1;
const resetter = 3;
function startGuess(){
    if(tries == 3){
    statusGuess.innerText = ("Lets start! You have " + tries + " oportunities left");
    console.log(rndNumber);
    } else {
        alert("Reset to start over");
    }
}
function resetGuess(){
    tries = 3;
    statusGuess.innerText = ("");
    infoGuess.innerText = ("");
    rndNumber = Math.floor(Math.random() * 10) + 1;
    console.log(rndNumber);
}
function tryGuess(){
    let numberElection = document.getElementById("number-guess").value;
    console.log(numberElection);
    tries = tries - 1;
    if(tries >= 0){
        if(numberElection == rndNumber){
        infoGuess.innerText = ("CONGRATULATIONS YOU WIN");
        } else {
        statusGuess.innerText = ("Lets start! You have " + tries + " oportunities left");
        infoGuess.innerText = ("Try again, wrong guess");
        }
    } else{
        infoGuess.innerText = ("You ran out of opportunities, reset to try again");
    }
}