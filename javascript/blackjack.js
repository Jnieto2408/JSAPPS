/* BlackJack APP */
const start = document.getElementById("start");
const remove = document.getElementById("remove");
const game = document.getElementById("game");
start.addEventListener("click", () => {
    start.style.display= "none";
    remove.style.display= "none";
    startGame();
})
const startGame = () => {
    game.innerHTML += `

    `
};