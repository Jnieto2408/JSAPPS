/* BlackJack APP */
const start = document.getElementById("start");
const remove = document.getElementById("remove");
const game = document.getElementById("game");

let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;
let canHit = true;
let deck = [];
let hidden = "";
let money = 1000;
let theBet = 0;
let lives = 3;



start.addEventListener("click", () => {
    start.style.display= "none";
    remove.style.display= "none";
    buidDeck();
    shuffleDeck();
    startGame();
})
const startGame = () => {
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
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    console.log("hidden value: ", dealerSum);
    dealerAceCount += checkAce(hidden);
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src= "../img/cards/" + card + ".png";
    cardImg.className= "card";
    document.getElementById("dealerGame").append(cardImg);
    dealerSum += getValue(card);
    console.log("First dealer sum: ", dealerSum);
};
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
const shuffleDeck = () => {
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let shuff = deck[i];
        deck[i] = deck[j];
        deck[j] = shuff;
    }
}
const getValue = (card) => {
    let data = card.split("-");
    let value = data[0];
    if(isNaN(value)){
        if(value == "A"){
            return 11;
        } else {
            return 10;
        }
    } else {
        return parseInt(value);
    }
}
const checkAce = (card) => {
    if( card[0]== "A"){
        return 1;
    }
    return 0;
}
const hitMe = () => {
    if(!canHit || theBet == 0){
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
}
const reduceAce = (yourSum, yourAceCount) => {
    while(yourSum > 21 && yourAceCount > 0){
        yourSum -= 10;
        yourAceCount -= 1;
    }
    return yourSum;
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
}
const oneK = () => {
    if(money >= 1000){
        theBet += 1000;
        money -= 1000;
        updateScreen();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
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
            icon: 'error',
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
            icon: 'error',
            title: 'Oops...',
            text: 'You ran out of money!',
        })
    }
}
const placeBet = () =>{
    if(theBet == 0){
        return
    }
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
}

const updateScreen = () => {
    document.getElementById("money").innerHTML = `${money}`;
    document.getElementById("currentBet").innerHTML = `${theBet}`;
}