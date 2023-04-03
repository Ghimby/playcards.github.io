import Deck from "./deck.js"

// Variable declarations
const dealerCardSlot = document.querySelector('.dealer-slot')
const playerCardSlot = document.querySelector(".player-slot")
const dealerDeckElement = document.querySelector(".dealer")
const playerDeckElement = document.querySelector(".player")
const text = document.querySelector(".text")
let playerDeck, dealerDeck, inRound, stop, inWar
let playerDeckWar =[], dealerDeckWar =[];

// Execute on user click
document.addEventListener("click", () => {
  if (stop) {
    startGame()
    return
  }

  if (inRound) {
    cleanBeforeRound()
  } else if(inWar){
    playWar()
    inWar = false
  } else {
    flipCards()
  }
})

// Function which initializes the start of game
startGame()
function startGame() {
  const deck = new Deck()
  deck.shuffle()

  // Splits the deck in half
  const deckMidpoint = Math.ceil(deck.numCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
  dealerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numCards))
  inRound = false
  stop = false

  cleanBeforeRound()
}

// Function which clears the previous cards before the next battle
function cleanBeforeRound() {
  inRound = false
  dealerCardSlot.innerHTML = ""
  playerCardSlot.innerHTML = ""
  text.innerText = ""

  updateDeckCount()
}

// Function which flips the top card to board when round is being played
function flipCards() {
  inRound = true

  const playerCard = playerDeck.pop()
  const dealerCard = dealerDeck.pop()

  // Displays the cards to their respective slots
  playerCardSlot.appendChild(playerCard.cardDisplay())
  dealerCardSlot.appendChild(dealerCard.cardDisplay())

  updateDeckCount()

  // Checks who wins the round or if a war must be played
  if (isRoundWinner(playerCard, dealerCard)) {
    text.innerText = "You WON this battle!"
    playerDeck.push(playerCard)
    playerDeck.push(dealerCard)
  } else if (isRoundWinner(dealerCard, playerCard)) {
    text.innerText = "You LOST this battle!"
    dealerDeck.push(playerCard)
    dealerDeck.push(dealerCard)
  } else {
    text.innerText = "Time for War!"
    playerDeck.push(playerCard)
    dealerDeck.push(dealerCard)
    inWar = true
  }

  // Check if any of the decks are out of cards
  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!"
    stop = true
  } else if (isGameOver(dealerDeck)) {
    text.innerText = "You Win!!"
    stop = true
  }
}

// Function to deal with war
function playWar() {
    inRound = true

    // Checks if any player has less than 4 cards left before a war & changes how many cards are played during the war
    var cardsToFlip = 4
    if (playerDeck.numCards < dealerDeck.numCards && playerDeck < 4){
        cardsToFlip = playerDeck.numCards
    } else if (dealerDeck.numCards < playerDeck.numCards && dealerDeck < 4){
        cardsToFlip = dealerDeck.numCards
    }

    // Looping to display the 3 or less cards which are wagered
    for (let x = 0; x < cardsToFlip; x++){
            const playerCard = playerDeck.pop()
            const dealerCard = dealerDeck.pop()
            updateDeckCount()

            if (x != cardsToFlip - 1){
                playerCardSlot.appendChild(playerCard.miniCardDisplay())
                dealerCardSlot.appendChild(dealerCard.miniCardDisplay())
            }

            playerDeckWar.push(playerCard)
            dealerDeckWar.push(dealerCard)
    }

    // Popping out and displayed the final card (Card which decides who wins war)
    const playerCardFinal = playerDeckWar.pop()
    const dealerCardFinal = dealerDeckWar.pop()
    playerCardSlot.appendChild(playerCardFinal.warCardDisplay())
    dealerCardSlot.appendChild(dealerCardFinal.warCardDisplay())
  
    updateDeckCount()
  
    // Checks who wins the round or if another war must be played
    if (isRoundWinner(playerCardFinal, dealerCardFinal)) {
        text.innerText = "You WON the War!"
        playerDeck.push(playerCardFinal)
        playerDeck.push(dealerCardFinal)
      
        for (let i = 0; i <= (playerDeckWar.length+1); i++){
            const playerCard = playerDeckWar.pop()
            const dealerCard = dealerDeckWar.pop()
            playerDeck.push(playerCard)
            playerDeck.push(dealerCard)
        }
        inWar = false 
    } 
    else if (isRoundWinner(dealerCardFinal, playerCardFinal)) {
        text.innerText = "You LOST the War!"
        dealerDeck.push(playerCardFinal)
        dealerDeck.push(dealerCardFinal)

        for (let i = 0; i <= (playerDeckWar.length+1); i++){
            const playerCard = playerDeckWar.pop()
            const dealerCard = dealerDeckWar.pop()
            dealerDeck.push(playerCard)
            dealerDeck.push(dealerCard)
        }
        inWar = false
    } else {
      text.innerText = "Stalemate! Fight again!"
      playerDeck.push(playerCardFinal)
      dealerDeck.push(dealerCardFinal)
      cleanBeforeRound()
      inWar = true
    }
  
    // Check if any of the decks are out of cards
    if (isGameOver(playerDeck)) {
      text.innerText = "You Lose!!"
      stop = true
    } else if (isGameOver(dealerDeck)) {
      text.innerText = "You Win!!"
      stop = true
    }
  }
  
// Function which updates how many cards is displayed in each players deck
function updateDeckCount() {
    dealerDeckElement.innerText = dealerDeck.numCards
    playerDeckElement.innerText = playerDeck.numCards
}

// Function which checks if the respective player won the round
function isRoundWinner(cardOne, cardTwo) {
  return cardOne.value > cardTwo.value
}

// Function to check if any players are out of cards
function isGameOver(deck) {
  return deck.numCards === 0
}