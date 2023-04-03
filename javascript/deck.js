// Deck variable declarations
const SUITS = [1, 2, 3, 4]
const VALUES = [0,1,2,3,4,5,6,7,8,9,10,11,12]
const CARDS = [
'ace_of_clubs','ace_of_spades','ace_of_hearts','ace_of_diamonds',
'2_of_clubs','2_of_spades','2_of_hearts','2_of_diamonds',
'3_of_clubs','3_of_spades','3_of_hearts','3_of_diamonds',
'4_of_clubs','4_of_spades','4_of_hearts','4_of_diamonds',
'5_of_clubs','5_of_spades','5_of_hearts','5_of_diamonds',
'6_of_clubs','6_of_spades','6_of_hearts','6_of_diamonds',
'7_of_clubs','7_of_spades','7_of_hearts','7_of_diamonds',
'8_of_clubs','8_of_spades','8_of_hearts','8_of_diamonds',
'9_of_clubs','9_of_spades','9_of_hearts','9_of_diamonds',
'10_of_clubs','10_of_spades','10_of_hearts','10_of_diamonds',
'jack_of_clubs2','jack_of_spades2','jack_of_hearts2','jack_of_diamonds2',
'queen_of_clubs2','queen_of_spades2','queen_of_hearts2','queen_of_diamonds2',
'king_of_clubs2','king_of_spades2','king_of_hearts2','king_of_diamonds2']

// Deck Class
export default class Deck {

    constructor(cards = freshDeck()){
        this.cards = cards
    }

    // Function that returns number of cards in deck
    get numCards(){
        return this.cards.length
    }

    //Function to pop a card out of the deck
    pop(){
        return this.cards.shift()
    }

    //Function to push cards
    push(card){
        this.cards.push(card)
    }

    /* Function to shuffle the cards 
    Goes from the back of the list to the front and flips it with other cards*/
    shuffle() {
        for (let i = this.numCards - 1; i > 0; i--){
            // Finds index we have not reached for card to move and the current card at that index
            const newIndex = Math.floor(Math.random() * (i+1))
            const oldCard = this.cards[newIndex]
            
            // Swaps the two cards
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldCard
        }
    }

}

// Card Class
class Card{
    constructor(suit, value){
        this.suit = suit
        this.value = value
    }

    // Function which returns the url of the respectives cards background picture
    get cardPic(){
        var picIndex = this.suit - 1 + (this.value*4);
        let front = "url('../images/";
        let middle = front.concat(CARDS[picIndex]);
        let back = ".png')"
        let picUrl = middle.concat(back);
        return picUrl
    }

    // Function to create HTML element for a regular card display
    cardDisplay() {
        const cardDiv = document.createElement("div")
        cardDiv.style.height = "242px";
        cardDiv.style.width = "167px";
        cardDiv.style.backgroundImage = this.cardPic;
        cardDiv.style.backgroundPosition = "left center";
        cardDiv.style.backgroundRepeat = "no-repeat";
        cardDiv.style.backgroundSize = "contain";
        return cardDiv
      }

    // Function to create HTML element for a mini card display (Used for the 3 wagered cards in war)
    miniCardDisplay() {
        const cardDiv = document.createElement("div")
        cardDiv.style.height = "69px";
        cardDiv.style.width = "48px";
        cardDiv.style.backgroundImage = this.cardPic;
        cardDiv.style.opacity = "0.7";
        cardDiv.style.backgroundPosition = "left center";
        cardDiv.style.backgroundRepeat = "no-repeat";
        cardDiv.style.backgroundSize = "contain";
        cardDiv.style.display = "inline-block";
        return cardDiv
      }

    // Function to create HTML element for a war card display (Used for the final card dealt in war)
    warCardDisplay() {
        const cardDiv = document.createElement("div")
        cardDiv.style.height = "121px";
        cardDiv.style.width = "84px";
        cardDiv.style.backgroundImage = this.cardPic;
        cardDiv.style.backgroundPosition = "left center";
        cardDiv.style.backgroundRepeat = "no-repeat";
        cardDiv.style.backgroundSize = "contain";
        cardDiv.style.display = "inline-block";
        return cardDiv
      }
}

// Function that creates a new deck
function freshDeck() {
    return SUITS.flatMap(suit => {
      return VALUES.map(value => {
        return new Card(suit, value)
      })
    })
}
