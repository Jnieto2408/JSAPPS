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
let canStay = false;
let deck = [];
let hidden = "";
let money = 3000;
let moneyStorage = 0;
let theBet = 0;

/* Inicializamos el juego */
start.addEventListener("click", () => {
    start.style.display= "none";
    remove.style.display= "none";
    buidDeck();
    shuffleDeck();
    startGame();
    if(JSON.parse(localStorage.getItem("money")) === null){
        localStorage.setItem("money", "3000");
    }
})
const startGame = () => {
    console.clear();
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    canHit = false;
    canStay = false;
    hidden = "";
    buidDeck();
    shuffleDeck();
    moneyStorage = JSON.parse(localStorage.getItem("money"));
    console.log(typeof moneyStorage, moneyStorage);
    if(moneyStorage > 3000){
        money = moneyStorage;
    }
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
                        </div>
                        <div class="actualGame">
                            <div id="dealerGame">
                                <img class="card" id="hidden" src="../img/cards/BACK.png">
                            </div>
                            <div id="yourGame"></div>
                        </div>
                        <div class="gameControls">
                            <div class="betSystem">
                                <p>CURRENT BET:<span id="currentBet">$${theBet}</span></p>
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
                            <div class="blackjackSystem" id="blackjackSystem">
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
    userCounting();
    console.log("My sum: ", yourSum);
    if(reduceAce(yourSum, yourAceCount) > 21){
        canHit = false;
    }
    setTimeout(() => {
        if (yourSum > 21){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You're Busted! Your card count was: " + yourSum,
            })
            theBet = 0;
            dealNew();
        }
    },500)

}
const stayPut = () => {
    if(!canStay){
        return
    }
    const hiddenCard = document.getElementById("hidden");
    hiddenCard.src= "../img/cards/" + hidden + ".png";
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);
    userCounting();
    canHit = false;
/*     setTimeout(() => { */
        while (dealerSum < 17){
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src= "../img/cards/" + card + ".png";
            cardImg.className= "card";
            dealerSum += getValue(card);
            dealerAceCount += checkAce(card);
            document.getElementById("dealerGame").append(cardImg);
            dealerCounting();
            console.log("dealer sum: ", dealerSum);
            evaluate();
        }  
/*     }, 1500); */
    evaluate();
}
const evaluate = () => {
    if(dealerSum < 17){
        return
    } else if (dealerSum > 21 || yourSum > dealerSum){
        setTimeout(() => {
            money += (theBet * 2);
            Swal.fire({
                icon: 'success',
                title: 'You win!',
                text: "You just earned: " + (theBet * 2),
            })
            theBet = 0;
            dealNew();
        },500)
    } else if (yourSum == dealerSum){
        setTimeout(() => {
            money += theBet;
            Swal.fire({
                icon: 'question',
                title: 'Game tied',
                text: "Try beat me next time",
            })
            theBet = 0;
            dealNew();
        },500)
    } else if (yourSum < dealerSum){
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'You lost!',
                text: "Dealer had a better game, " + dealerSum + " > " + yourSum,
            })
            theBet = 0;
            dealNew();
        },500)
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
    canStay= true;
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
    userCounting();
    console.log("My sum: ", yourSum);
}
const updateScreen = () => {
    document.getElementById("money").innerHTML = `$${money}`;
    document.getElementById("currentBet").innerHTML = `$${theBet}`;
}
const dealerCounting = () => {
    document.getElementById("dealerCard").innerHTML = `${dealerSum}`;
}
const userCounting = () => {
    document.getElementById("youCard").innerHTML = `${yourSum}`;
}
const dealNew = () => {
    let gameButton = document.createElement("button");
    gameButton.className = "placeBet";
    gameButton.innerHTML= "New Deal";
    document.getElementById("blackjackSystem").appendChild(gameButton);
    gameButton.addEventListener("click", () => {
        if(money>3000){
            moneyStorage = JSON.stringify(money);
        } else {
            moneyStorage = 3000;
        }
        localStorage.setItem("money",JSON.stringify(moneyStorage));
        updateScreen();
        startGame();
    })
}