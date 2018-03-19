const buttons = document.querySelectorAll("input[type=button]");
let card;

buttons.forEach((button) => {
  button.addEventListener("click", () => responsiveVoice.speak(getCard(button)));
})

// Compares value of input clicked to every object's name property and return content of object that match
function getCard(e) {
  let name = e.value;
  for (i=0; i<cards.length; i++) {
    if (name == cards[i].name)
      card = cards[i];
  }
  return card.content;
}
