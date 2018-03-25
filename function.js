const buttons = document.querySelectorAll("input[type=button]");
const readName = document.getElementById("readName");
const dice = document.getElementById("dice");
let nDice = document.getElementById("numberofDices");
let nSide = document.getElementById("numberofSides")
let diceArray = [];
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

dice.addEventListener("click", () => rollDice());

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
  responsiveVoice.speak(diceArray.toString());
}
