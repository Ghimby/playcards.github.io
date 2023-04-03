/* Original code taken from: https://codepen.io/cathydutton/pen/avYKeM*/
var myCards = document.getElementById('container');
var resultsArray = [];
var counter = 0;
var text = document.getElementById('text');
var seconds = 00; 
var tens = 00; 
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var Interval ;
var images = [
  '2_of_clubs', 
  '2_of_hearts', 
  '3_of_clubs', 
  '4_of_spades', 
  '4_of_hearts', 
  '5_of_hearts', 
  '5_of_spades', 
  '6_of_clubs', 
  '6_of_diamonds', 
  '7_of_spades', 
  'A_of_spades', 
  'A_of_hearts',  
  'J_of_diamonds', 
  'J_of_spades', 
  'K_of_clubs', 
  'K_of_hearts', 
  'Q_of_hearts', 
  'Q_of_spades'
];

var clone = images.slice(0); // duplicate array
var cards = images.concat(clone); // merge to arrays 

// Shuffle function
function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],   o[i] = o[j], o[j] = x);
  return o;
}
shuffle(cards);

for (var i = 0; i < cards.length; i++) {
  card = document.createElement('div');
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  myCards.appendChild(card);
     
  card.onclick = function () {
   
    if (this.className != 'flipped' && this.className != 'correct'){
        this.className = 'flipped';
        var result = this.dataset.item;
        resultsArray.push(result);
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }
  
    if (resultsArray.length > 1) {

      if (resultsArray[0] === resultsArray[1]) {
        check("correct");
        counter ++;
        win();
        resultsArray = [];
      } else {
        check("reverse");
        resultsArray = [];
      }
      
    }
    
  }
   
};


var check = function(className) {
  
  var x = document.getElementsByClassName("flipped");
  setTimeout(function() {

    for(var i = (x.length - 1); i >= 0; i--) {
      x[i].className = className;
    }
     
  },500);
   
}

var win = function () {

  if(counter === 18) {
    clearInterval(Interval);
    text.innerHTML = "Your time was " + seconds + ":" + tens;
  } 
  
}
     
function startTimer () {
  tens++; 
    
  if(tens < 9){
    appendTens.innerHTML = "0" + tens;
  }
    
  if (tens > 9){
    appendTens.innerHTML = tens;
      
  } 
    
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
    
  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }
  
}

