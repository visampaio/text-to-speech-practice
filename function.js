const buttons = document.querySelectorAll("input[type=button]");
const readName = document.getElementById("readName");
const dice = document.getElementById("dice");
const repeat = document.getElementById("repeat");
let nDice = document.getElementById("numberofDices");
let nSide = document.getElementById("numberofSides")
let diceArray = [];
let lastSaid;
let card;

buttons.forEach((button) => {
  button.addEventListener("click", function(){
    if (readName.checked) {
      responsiveVoice.speak(button.value);
    } else {
      responsiveVoice.speak(getCard(button));
    }
  })
});

dice.addEventListener("click", function(){
  if (sumAll.checked) {
    responsiveVoice.speak(sumDice(rollDice()).toString());
  } else {
    responsiveVoice.speak(rollDice().toString());
  }
});

repeat.addEventListener("click", () => responsiveVoice.speak(lastSaid.toString()));

// Compares value of input clicked to every object's name property and return content of object that match
function getCard(e) {
  let name = e.value;
  for (i=0; i<cards.length; i++) {
    if (name == cards[i].name)
      card = cards[i];
  }
  return card.content;
}

function rollDice() {
  diceArray = [];
  for (i=0; i<nDice.value; i++) {
    let number = Math.floor((Math.random() * nSide.value) + 1);
    diceArray.push(number);
  }
  lastSaid = diceArray.sort(function(a, b){return a-b});
  return lastSaid;
}

function sumDice(array) {
  let sum = 0;
  for (i=0; i<array.length; i++) {
    sum += array[i];
  }
  lastSaid = sum;
  return lastSaid;
}
