/* BlackJack APP */
const start = document.getElementById("start");
const game = document.getElementById("game");
start.addEventListener("click", () => {
    start.style.display= "none";
    startGame();
})
const startGame = () => {
    game.innerHTML += `
                        <div class="headGame">
                            <div class="money">
                                <p>Money:</p>
                                <p class="cash">$1000</p>
                            </div>
                            <div class="lifes">
                                <div>Lifes</div>
                                <div class="hearts">
                                    <i class="fa fa-heart" id="h1"></i>
                                    <i class="fa fa-heart" id="h2"></i>
                                    <i class="fa fa-heart" id="h3"></i>
                                </div>
                            </div>
                        </div>    
    `
};