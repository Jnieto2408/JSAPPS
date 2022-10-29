/* BlackJack APP */

/* Declaramos variables iniciales */
const start = document.getElementById("start");
const remove = document.getElementById("remove");
const game = document.getElementById("game");

let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;
let canHit = false;
let deck = [];
let hidden = "";
let money = 1000;
let theBet = 0;
let lives = 3;

/* Inicializamos el juego */
start.addEventListener("click", () => {
    start.style.display= "none";
    remove.style.display= "none";
    buidDeck();
    shuffleDeck();
    startGame();
})
const startGame = () => {
    game.innerHTML = "";
    game.innerHTML += `
                        <div class="headGame">
                            <div class="money">
                                <p>Money:</p>
                                <p class="cash" id="money">$${money}</p>
                            </div>
                            <div class="dealer">
                                <p><b>Dealer</b></p>
                                <p>Card Count:<span id="dealerCard">0</span></p>
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
                        <div class="actualGame">
                            <div id="dealerGame">
                                <img class="card" id="hidden" src="../img/cards/BACK.png">
                            </div>
                            <div id="yourGame"></div>
                        </div>
                        <div class="gameControls">
                            <div class="betSystem">
                                <p>CURRENT BET:<span id="currentBet">${theBet}</span></p>
                                <div>
                                    <button onClick="oneK()">1k</button>
                                    <button onClick="tenK()">10k</button>
                                    <button onClick="hundredK()">100k</button>
                                </div>
                            </div>
                            <div class="you">
                                <p>Card Count:<span id="youCard">0</span></p>
                                <p><b>YOU</b></p>
                            </div>
                            <div class="blackjackSystem">
                                <button class="placeBet" id="placeBet" onClick="placeBet()">Place Bet</button>
                                <button onClick="hitMe()">Hit</button>
                                <button onClick="stayPut()">Stay</button>
                            </div>
                        </div>
    `
    hidden = deck.pop(); //seleccionamos carta escondida del dealer
    dealerSum += getValue(hidden); //suma de cartas del dealer
    console.log("hidden value: ", dealerSum);
    dealerAceCount += checkAce(hidden); //revisamos si la carta es un A
    let cardImg = document.createElement("img");
    let card = deck.pop(); //seleccionamos segunda carta del dealer
    cardImg.src= "../img/cards/" + card + ".png";
    cardImg.className= "card";
    document.getElementById("dealerGame").append(cardImg); //la agregamos al DOM
    dealerSum += getValue(card); //suma de cartas del dealer
    console.log("First dealer sum: ", dealerSum);
};
/* Construimos el mazo de cartas */
const buidDeck = () => {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const types = ["C", "D", "H", "S"];
    deck = [];
    for(let i = 0; i < types.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j]+"-"+types[i]);
        }
    }
}
/* Mezclamos el mazo de cartas */
const shuffleDeck = () => {
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let shuff = deck[i];
        deck[i] = deck[j];
        deck[j] = shuff;
    }
}
/* Valorizamos las cartas */
const getValue = (card) => {
    let data = card.split("-");
    let value = data[0];
    if(isNaN(value)){
        if(value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}
const checkAce = (card) => {
    if( card[0]== "A"){
        return 1;
    }
    return 0;
}
const reduceAce = (playerSum, playerAceCount) => {
    while(playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}
/* Botones del juego */
const hitMe = () => {
    if(!canHit){
        return
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src= "../img/cards/" + card + ".png";
    cardImg.className= "card";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    yourGame.append(cardImg);
    console.log("My sum: ", yourSum);
    if(reduceAce(yourSum, yourAceCount) > 21){
        canHit = false;
    }
    if (yourSum > 21){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "You're Busted! Your card count was: " + yourSum,
        })
        theBet = 0;
        updateScreen();
        startGame();
    }
}
const stayPut = () => {
    const hiddenCard = document.getElementById("hidden");
    hiddenCard.src= "../img/cards/" + hidden + ".png";
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    console.log("reduce ace dealer: ", dealerSum);
    yourSum = reduceAce(yourSum, yourAceCount);
    canHit = false;
    setTimeout(() => {
        while (dealerSum < 17){
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src= "../img/cards/" + card + ".png";
            cardImg.className= "card";
            dealerSum += getValue(card);
            dealerAceCount += checkAce(card);
            document.getElementById("dealerGame").append(cardImg);
            console.log("dealer sum: ", dealerSum);
        }  
    }, 1500)

    if (dealerSum > 21){
        money += (theBet * 2);
    } else if (yourSum == dealerSum){
        money += theBet;
    } else if (yourSum > dealerSum){
        money += (theBet * 2);
    } else if ( yourSum < dealerSum){
        theBet= 0;
    }
}
/* Sistema de apuestas */
const oneK = () => {
    if(money >= 1000){
        theBet += 1000;
        money -= 1000;
        updateScreen();
    } else {
        Swal.fire({
            icon: 'question',
            title: 'Null',
            text: 'You ran out of money!',
        })
    }
}
const tenK = () => {
        if(money >= 10000){
        theBet += 10000;
        money -= 10000;
        updateScreen();
    } else {
        Swal.fire({
            icon: 'question',
            title: 'Oops...',
            text: 'You ran out of money!',
        })
    }
}
const hundredK = () => {
        if(money >= 100000){
        theBet += 100000;
        money -= 100000;
        updateScreen();
    } else {
        Swal.fire({
            icon: 'question',
            title: 'Oops...',
            text: 'You ran out of money!',
        })
    }
}
const placeBet = () =>{
    if(theBet == 0){
        return
    }
    canHit= true;
    document.getElementById("placeBet").style.display = "none";
    console.log("Bet Placed: ", theBet);
    for(let i = 0; i <2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src= "../img/cards/" + card + ".png";
        cardImg.className= "card";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("yourGame").append(cardImg);
    }
    console.log("My sum: ", yourSum);
}
const updateScreen = () => {
    document.getElementById("money").innerHTML = `${money}`;
    document.getElementById("currentBet").innerHTML = `${theBet}`;
}