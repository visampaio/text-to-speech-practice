const buttons = document.querySelectorAll("input[type=button]");
const readName = document.getElementById("readName");
const sumAll = document.getElementById("sumAll");
const dice = document.getElementById("dice");
const repeat = document.getElementById("repeat");
const say = document.getElementById("say");
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

say.addEventListener("click", function(){
  responsiveVoice.speak(removeDuplicates(itemList).toString());
  itemList = [];
});

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

// Code from: https://codereview.stackexchange.com/questions/60128/removing-duplicates-from-an-array-quickly
function removeDuplicates(array){
    var unique = [];
    for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (unique.indexOf(current) < 0) unique.push(current);
    }
    lastSaid = unique;
    return unique;
}

//Code from: https://stackoverflow.com/a/37714937/
function contrastImage(imgData, contrast){  //input range [-100..100]
    var d = imgData.data;
    contrast = (contrast/100) + 1;  //convert to decimal & shift range: [0..2]
    var intercept = 128 * (1 - contrast);
    for(var i=0;i<d.length;i+=4){   //r,g,b,a
        d[i] = d[i]*contrast + intercept; //r value
        d[i+1] = d[i+1]*contrast + intercept; //g value
        d[i+2] = d[i+2]*contrast + intercept; //b value
    }
    return imgData;
}
