// Sample from https://github.com/jcmellado/js-aruco

///// Variaveis iniciadas
var imageData, imageData2, imageData3, detector;
var itemList = [];
var context3, context2, canvasOutput, canvasQuadrado, video2, video3;
const highContrast = document.getElementById("highContrast");
<<<<<<< HEAD
var canvasDigital, contextDigital, imgDigital, digitalData, digitalData2;
var imageRed = document.getElementById("uno-red");
// var imageGreen = document.getElementById("uno-green");
// var img;
// var file;
// var input = document.getElementById('imgfile');
// var fr = new FileReader();
// var img = document.getElementById("testcard");
var canvasRed = document.getElementById("canvasRed");
var contextRed = canvasRed.getContext("2d");
canvasRed.width = imageRed.width;
canvasRed.height = imageRed.height;

var canvasRed2 = document.getElementById("canvasRed2");
var contextRed2 = canvasRed.getContext("2d");
canvasRed2.width = imageRed.width;
canvasRed2.height = imageRed.height;

var redData2 = contextRed2.getImageData(0, 0, canvasRed2.width, canvasRed2.height);
var redDataOriginal = redData2;

// var aconteceu;
//
// input.addEventListener("change", function() {
//
//   file = input.files[0];
//   fr.onload = createImage();   // onload fires after reading is complete
//   fr.readAsDataURL(file);    // begin reading
// })



//////

// function createImage(){
//   img = new Image();
//   img.onload = function () {
//     contextDigital.drawImage(img, 0, 0);
//     aconteceu = true;
//   }
//   img.src = fr.result;
// }
=======
>>>>>>> parent of ac91b23... Changes


///// Assim que a pagina carrega
    function onLoad(){

      /// Atribuindo variaveis as tags
      video = document.getElementById("video");
      video2 = document.getElementById("video2");
      video3 = document.getElementById("video3");
      canvas = document.getElementById("canvas");
      canvasOutput = document.getElementById("canvasOutput");
      canvasQuadrado = document.getElementById("canvasQuadrado");
      context = canvas.getContext("2d");
      context3 = canvasOutput.getContext("2d");
      context2 = canvasQuadrado.getContext('2d');


      //// ?
      canvas.width = parseInt(canvas.style.width);
      canvas.height = parseInt(canvas.style.height);
      canvasOutput.width = parseInt(canvasOutput.style.width);
      canvasOutput.height = parseInt(canvasOutput.style.height);
      canvasQuadrado.width = parseInt(canvasQuadrado.style.width);
      canvasQuadrado.height = parseInt(canvasQuadrado.style.height);

      /// ?
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      /// ?
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }

          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        }
      }
      /// ?
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function(stream) {
          if ("srcObject" in video) {
            video.srcObject = stream;
            video2.srcObject = stream;
            video3.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
            video2.src = window.URL.createObjectURL(stream);
            video3.src = window.URL.createObjectURL(stream);
          }
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        }
      );

      detector = new AR.Detector();

      requestAnimationFrame(tick);
    }

    function tick(){
      requestAnimationFrame(tick);

      if (video.readyState === video.HAVE_ENOUGH_DATA){
        snapshot();

        var markers = detector.detect(imageData);
        drawCorners(markers);
        // drawId(markers);
        for (i = 0; i !== markers.length; ++ i) {
          itemList.push(markers[i].id);
        }
        showImage(getCardImage(removeOthers(removeDuplicates(itemList), markers)));
      }
    }
      /// ?
    function snapshot(){
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      context2.drawImage(video2, 0, 0, canvasOutput.width, canvasOutput.height);
      imageData2 = context2.getImageData(0, 0, canvasOutput.width, canvasOutput.height);
      context3.drawImage(video3, 0, 0, canvasQuadrado.width, canvasQuadrado.height);
      imageData3 = context3.getImageData(0, 0, canvasQuadrado.width, canvasQuadrado.height);


      }
      /// ?
    function drawCorners(markers){
      var corners, corner, newCorner, i, j, cornerData;



      // for (var z=0;z<imageData3.data.length;z+=4)
      // {
      //   imageData3.data[z]=255-imageData3.data[z];
      //   imageData3.data[z+1]=255-imageData3.data[z+1];
      //   imageData3.data[z+2]=255-imageData3.data[z+2];
      //   imageData3.data[z+3]=255;
      // }
      // context3.putImageData(imageData3, 0, 0);

        context3.putImageData(contrastImage(imageData3, highContrast.valueAsNumber), 0, 0);
        context3.putImageData(changeBrightness(imageData3, brightness.valueAsNumber), 0, 0);
        context3.putImageData(changeColor(imageData3), 0, 0);
        // context3.putImageData(hueShift(imageData3,30,300,-100), 0, 0);



      context.lineWidth = 3;
      /// ?
      for (i = 0; i !== markers.length; ++ i){
        corners = markers[i].corners;
        newCorner = corners;

        context2.beginPath();

// 0 > 1
        context2.moveTo(corners[0].x, corners[0].y);

        let a = corners[0].x - corners[1].x;
        let b = corners[0].y - corners[1].y;
        let distHor = Math.sqrt( a*a + b*b )*2;

        let cosHor = - a/distHor;
        let senHor = - b/distHor;

<<<<<<< HEAD
                newCorner[1].x = corners[0].x + (distHor*2.8)*cosHor;
                newCorner[1].y = corners[0].y + (distHor*2.8)*senHor;
=======
        newCorner[1].x = corners[0].x + (distHor*2)*cosHor;
        newCorner[1].y = corners[0].y + (distHor*2)*senHor;
>>>>>>> parent of ac91b23... Changes

        context2.lineTo(newCorner[1].x, newCorner[1].y)

// 0 > 3
        context2.moveTo(corners[0].x, corners[0].y);

        a = corners[0].x - corners[3].x;
        b = corners[0].y - corners[3].y;
        let distVer = Math.sqrt( a*a + b*b );

        let cosVer = - a/distVer;
        let senVer = - b/distVer;

<<<<<<< HEAD
                newCorner[3].x = corners[0].x + (distVer*4)*cosVer;
                newCorner[3].y = corners[0].y + (distVer*4)*senVer;
=======
        newCorner[3].x = corners[0].x + (distVer*2)*cosVer;
        newCorner[3].y = corners[0].y + (distVer*2)*senVer;
>>>>>>> parent of ac91b23... Changes

        context2.lineTo(newCorner[3].x, newCorner[3].y)

<<<<<<< HEAD
        // 3 > 2
                newCorner[2].x = newCorner[3].x + (distHor*2.8)*cosHor;
                newCorner[2].y = newCorner[3].y + (distHor*2.8)*senHor;
=======
// 3 > 2
        newCorner[2].x = newCorner[3].x + (distHor*2)*cosHor;
        newCorner[2].y = newCorner[3].y + (distHor*2)*senHor;
>>>>>>> parent of ac91b23... Changes

        context2.lineTo(newCorner[2].x, newCorner[2].y)

// 2 > 1
        context2.lineTo(newCorner[1].x, newCorner[1].y)
      /// ?

      if (markers.length > 0) {
        // context2.clearRect(0, 0, canvasQuadrado.width, canvasQuadrado.height);
<<<<<<< HEAD
        contextRed.drawImage(imageRed, 0, 0);
        contextRed2.drawImage(imageRed, 0, 0);
        digitalRed = contextRed.getImageData(0, 0, canvasRed.width, canvasRed.height);
        digitalRed2 = contextRed2.getImageData(0, 0, canvasRed2.width, canvasRed2.height);
        contextRed2.putImageData(contrastImage(redData2, highContrast.valueAsNumber), 0, 0);
        contextRed2.putImageData(changeBrightness(redData2, brightness.valueAsNumber), 0, 0);
        contextRed2.putImageData(changeColor(redData2), 0, 0);

=======
>>>>>>> parent of ac91b23... Changes
        context2.fillStyle = "rgb(0,255,0)";
        context2.fill();
        context2.closePath();

        context2.drawImage(canvasQuadrado, 0, 0);
      } else {
        context2.drawImage(canvasQuadrado, 0, 0);
      }

      // Efeito chroma-key
      let frame = context2.getImageData(0, 0, canvasQuadrado.width, canvasQuadrado.height);
      let l = frame.data.length / 4;
      for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];
        if (g > 254 && r < 1 && b < 1)
          frame.data[i * 4 + 3] = 0;
      }
      context2.putImageData(frame, 0, 0);



      /// ?
        // context2.globalCompositeOperation = "copy";


        // context.strokeStyle = "green";
        // context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
      }
    }

<<<<<<< HEAD


=======
>>>>>>> parent of ac91b23... Changes
    window.onload = onLoad;
