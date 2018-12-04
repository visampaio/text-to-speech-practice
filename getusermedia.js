// Sample from https://github.com/jcmellado/js-aruco

///// Variaveis iniciadas
var imageData, imageData2, imageData3, detector;
var itemList = [];
var context3, context2, canvasOutput, canvasQuadrado, video2, video3;
var brightness = document.getElementById("brightness");
var highContrast = document.getElementById("highContrast");
var sharpness = document.getElementById("sharpness");
var canvasDigital, contextDigital, imgDigital, digitalData, digitalData2;


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


///// Assim que a pagina carrega
    function onLoad(){

//       function convertImageToCanvas(image) {
// 	canvasDigital = document.getElementById("canvasDigital");
// 	canvasDigital.width = image.width;
// 	canvasDigital.height = image.height;
//
// 	return canvasDigital;
// }

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

        for (i = 0; i !== markers.length; ++ i) {
          itemList.push(markers[i].id);
        }
        // showImage(getCardImage(removeOthers(removeDuplicates(itemList), markers)));
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
        context3.putImageData(sharpen(context3, canvas.width, canvas.height, sharpness.valueAsNumber), 0, 0);
        context3.putImageData(changeColor(imageData3), 0, 0);

        // if (aconteceu) {
        //   contextDigital.drawImage(img, 0, 0, 230, 324);
        // }

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
                let distHor = Math.sqrt( a*a + b*b );

                let cosHor = - a/distHor;
                let senHor = - b/distHor;

                newCorner[1].x = corners[0].x + (distHor*3)*cosHor;
                newCorner[1].y = corners[0].y + (distHor*3)*senHor;

                context2.lineTo(newCorner[1].x, newCorner[1].y)

        // 0 > 3
                context2.moveTo(corners[0].x, corners[0].y);

                a = corners[0].x - corners[3].x;
                b = corners[0].y - corners[3].y;
                let distVer = Math.sqrt( a*a + b*b );

                let cosVer = - a/distVer;
                let senVer = - b/distVer;

                newCorner[3].x = corners[0].x + (distVer*3.3)*cosVer;
                newCorner[3].y = corners[0].y + (distVer*4.3)*senVer;

                context2.lineTo(newCorner[3].x, newCorner[3].y)

        // 3 > 2
                newCorner[2].x = newCorner[3].x + (distHor*3)*cosHor;
                newCorner[2].y = newCorner[3].y + (distHor*3)*senHor;

                context2.lineTo(newCorner[2].x, newCorner[2].y)

        // 2 > 1
                context2.lineTo(newCorner[1].x, newCorner[1].y)
      /// ?

      if (markers.length > 0) {
        var image = document.getElementById("imagenzinha");
        image.src = getCardImage(itemList);

        canvasDigital = document.getElementById("canvasDigital");
        contextDigital = canvasDigital.getContext("2d");
        canvasDigital.width = image.width;
        canvasDigital.height = image.height;

        canvasDigital2 = document.getElementById("canvasDigital2");
        contextDigital2 = canvasDigital.getContext("2d");
        canvasDigital2.width = image.width;
        canvasDigital2.height = image.height;

        digitalData2 = contextDigital2.getImageData(0, 0, image.width, image.height);
        digitalDataOriginal = digitalData2;


        contextDigital.drawImage(image, 0, 0);
        contextDigital2.drawImage(image, 0, 0);
        digitalData = contextDigital.getImageData(0, 0, canvasDigital.width, canvasDigital.height);
        digitalData2 = contextDigital2.getImageData(0, 0, canvasDigital2.width, canvasDigital2.height);
        contextDigital2.putImageData(contrastImage(digitalData2, highContrast.valueAsNumber), 0, 0);
        contextDigital2.putImageData(changeBrightness(digitalData2, brightness.valueAsNumber), 0, 0);
        contextDigital2.putImageData(sharpen(contextDigital2, canvasDigital2.width, canvasDigital2.height, sharpness.valueAsNumber), 0, 0);
        contextDigital2.putImageData(changeColor(digitalData2), 0, 0);

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



    window.onload = onLoad;
