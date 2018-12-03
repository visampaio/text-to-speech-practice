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

// buttons.forEach((button) => {
//   button.addEventListener("click", function(){
//     if (readName.checked) {
//       responsiveVoice.speak(button.value);
//     } else {
//       responsiveVoice.speak(getCard(button));
//     }
//   })
// });

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
  return cardImages[0];
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

//Code from: https://stackoverflow.com/questions/20316680/javascript-sharpen-image-and-edge-detection-not-working/26428587
function sharpen(ctx, w, h, mix) {
    mix = mix / 100;
    var x, sx, sy, r, g, b, a, dstOff, srcOff, wt, cx, cy, scy, scx,
        weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
        katet = Math.round(Math.sqrt(weights.length)),
        half = (katet * 0.5) | 0,
        dstData = ctx.createImageData(w, h),
        dstBuff = dstData.data,
        srcBuff = ctx.getImageData(0, 0, w, h).data,
        y = h;

    while (y--) {
        x = w;
        while (x--) {
            sy = y;
            sx = x;
            dstOff = (y * w + x) * 4;
            r = 0;
            g = 0;
            b = 0;
            a = 0;

            for (cy = 0; cy < katet; cy++) {
                for (cx = 0; cx < katet; cx++) {
                    scy = sy + cy - half;
                    scx = sx + cx - half;

                    if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                        srcOff = (scy * w + scx) * 4;
                        wt = weights[cy * katet + cx];

                        r += srcBuff[srcOff] * wt;
                        g += srcBuff[srcOff + 1] * wt;
                        b += srcBuff[srcOff + 2] * wt;
                        a += srcBuff[srcOff + 3] * wt;
                    }
                }
            }

            dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
            dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
            dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix);
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }

    return dstData;
}
