// Sample from https://github.com/jcmellado/js-aruco

var imageData, detector;
var itemList = [];
var context3, canvasOutput, video2;

    function onLoad(){
      video = document.getElementById("video");
      video2 = document.getElementById("video2");
      canvas = document.getElementById("canvas");
      canvasOutput = document.getElementById("canvasOutput");
      context = canvas.getContext("2d");
      context3 = canvasOutput.getContext("2d");

      canvas.width = parseInt(canvas.style.width);
      canvas.height = parseInt(canvas.style.height);

      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

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

      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function(stream) {
          if ("srcObject" in video) {
            video.srcObject = stream;
            video2.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
            video2.src = window.URL.createObjectURL(stream);
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
      }
    }

    function snapshot(){
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      context3.drawImage(video2, 0, 0, canvasOutput.width, canvasOutput.height);
      }

    function drawCorners(markers){
      var corners, corner, newCorner, i, j, cornerData;



      context.lineWidth = 3;

      for (i = 0; i !== markers.length; ++ i){
        corners = markers[i].corners;
        newCorner = corners;

        // cornerData = context.getImageData(corners[0].x, corners[0].y, 200, 200);
        // for (var z=0;z<cornerData.data.length;z+=4)
        // {
        //   cornerData.data[z]=255-cornerData.data[z];
        //   cornerData.data[z+1]=255-cornerData.data[z+1];
        //   cornerData.data[z+2]=255-cornerData.data[z+2];
        //   cornerData.data[z+3]=255;
        // }
        // context.putImageData(cornerData,corners[0].x, corners[0].y);



        var context2 = canvas.getContext('2d');
        var secondData = context2.createImageData(canvas.width, canvas.height);

        context.save();

        context2.strokeStyle = "red";
        context2.beginPath();

// 0 > 1
        context2.moveTo(corners[0].x, corners[0].y);

        let a = corners[0].x - corners[1].x;
        let b = corners[0].y - corners[1].y;
        let distHor = Math.sqrt( a*a + b*b )*2;

        let cosHor = - a/distHor;
        let senHor = - b/distHor;

        newCorner[1].x = corners[0].x + (distHor*2)*cosHor;
        newCorner[1].y = corners[0].y + (distHor*2)*senHor;

        context2.lineTo(newCorner[1].x, newCorner[1].y)

// 0 > 3
        context2.moveTo(corners[0].x, corners[0].y);

        a = corners[0].x - corners[3].x;
        b = corners[0].y - corners[3].y;
        let distVer = Math.sqrt( a*a + b*b );

        let cosVer = - a/distVer;
        let senVer = - b/distVer;

        newCorner[3].x = corners[0].x + (distVer*2)*cosVer;
        newCorner[3].y = corners[0].y + (distVer*2)*senVer;

        context2.lineTo(newCorner[3].x, newCorner[3].y)

// 3 > 2
        newCorner[2].x = newCorner[3].x + (distHor*2)*cosHor;
        newCorner[2].y = newCorner[3].y + (distHor*2)*senHor;

        context2.lineTo(newCorner[2].x, newCorner[2].y)

// 2 > 1
        context2.lineTo(newCorner[1].x, newCorner[1].y)

        context2.fill ();
        context2.closePath();


        // for (var z=0;z<imageData.data.length;z+=4)
        // {
        //   secondData.data[z]=255-secondData.data[z];
        //   secondData.data[z+1]=255-secondData.data[z+1];
        //   secondData.data[z+2]=255-secondData.data[z+2];
        //   secondData.data[z+3]=255;
        // }

        context2.drawImage(canvas, 0, 0);

        context2.globalCompositeOperation = "copy";


        // context.strokeStyle = "green";
        // context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
      }
    }

    // function drawId(markers){
    //   var corners, corner, x, y, i, j;
    //
    //   context.strokeStyle = "blue";
    //   context.lineWidth = 1;
    //
    //   for (i = 0; i !== markers.length; ++ i){
    //     corners = markers[i].corners;
    //
    //     x = Infinity;
    //     y = Infinity;
    //
    //     for (j = 0; j !== corners.length; ++ j){
    //       corner = corners[j];
    //
    //       x = Math.min(x, corner.x);
    //       y = Math.min(y, corner.y);
    //     }
    //
    //     context.strokeText(markers[i].id, x, y)
    //   }
    // }

    window.onload = onLoad;
