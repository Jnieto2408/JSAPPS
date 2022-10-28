/* BlackJack APP */
const start = document.getElementById("start");
const game = document.getElementById("game");
start.addEventListener("click", () => {
    start.style.display= "none";
    startGame();
})
const startGame = () => {
    game.innerHTML += `
    
    `
};