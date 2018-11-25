const buttons = document.querySelectorAll("input[type=button]");
const readName = document.getElementById("readName");
const sumAll = document.getElementById("sumAll");
const dice = document.getElementById("dice");
const repeat = document.getElementById("repeat");
const say = document.getElementById("say");
const show = document.getElementById("show");
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

// show.addEventListener("click", function(){
//   showImage(getCardImage(removeDuplicates(itemList)));
//   itemList = [];
// });

// Returns content of card whose name == value of the button clicked
function getCard(e) {
  let name = e.value;
  for (i=0; i<cards.length; i++) {
    if (name == cards[i].name)
      card = cards[i];
  }
  return card.content;
}

function getCardImage(markers) {
  let cardImages = [];
  for (i=0; i<markers.length; i++) {
    for (j=0; j<cards.length; j++) {
      if (markers[i] == cards[j].id){
        cardImages.push(cards[j].image);
        }
    }
  }
  return cardImages;
}

var container = document.getElementById('imageContainer');
var docFrag = document.createDocumentFragment();

function showImage(imgs) {
  container.innerHTML = "";
  var i = 0;
  imgs.forEach(function(url) {
    var img = document.createElement('img');
    img.src = url;
    img.id = "imgDigi" + i;
    i++;
    docFrag.appendChild(img);
  });
  container.appendChild(docFrag);
}

function removeOthers(list, markers) {
  let newList = [];
  for (var i=0; i < list.length; i++) {
    for (var j=0; j < markers.length; j++) {
      if (list[i] == markers[j].id){
        newList.push(list[i]);
      }
    }
  }

  return newList;
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

//Code from: https://www.html5rocks.com/en/tutorials/canvas/imagefilters/
function changeBrightness(imgData, brightness) {
  var d = imgData.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] += brightness;
    d[i+1] += brightness;
    d[i+2] += brightness;
  }
  return imgData;
};


function changeColor(imgData) {

  let frame = imgData;
  let l = frame.data.length / 4;
  for (let i = 0; i < l; i++) {
    let r = frame.data[i * 4 + 0];
    let g = frame.data[i * 4 + 1];
    let b = frame.data[i * 4 + 2];
    var tempg = g;
    if (g > 0 && g < 200)
      frame.data[i * 4 + 1] -= 100;
      // frame.data[i * 4 + 0] = tempg;
  }
  return frame;

}

//Code from: https://stackoverflow.com/questions/29156849/html5-canvas-changing-image-color
var red, green, blue, alpha;

function hueShift(imgData,min,max,colorHue){

  for(var i=0;i<imgData.length;i+=4){
    var d = imgData.data;
    var dO = d;
    red=dO[i];
    green=dO[i+1];
    blue=dO[i+2];
    alpha=dO[i+3];

    // skip transparent/semiTransparent pixels
    if(alpha<230){continue;}

    var hsl=rgbToHsl(red,green,blue);
    var hue=hsl.h*360;

    if(hue<max || hue>min){
      var newRgb=hslToRgb(hsl.h+colorHue,hsl.s,hsl.l);
      d[i+0]=newRgb.r;
      d[i+1]=newRgb.g;
      d[i+2]=newRgb.b;
      d[i+3]=255;
    }
  }
  return imgData;
}

function rgbToHsl(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if(max == min){
    h = s = 0; // achromatic
  }else{
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return({ h:h, s:s, l:l });
}

function hslToRgb(h, s, l){
  var r, g, b;
  if(s == 0){
    r = g = b = l; // achromatic
  }else{
    function hue2rgb(p, q, t){
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return({
    r:Math.round(r * 255),
    g:Math.round(g * 255),
    b:Math.round(b * 255),
  });
}
