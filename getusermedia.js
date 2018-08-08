// Sample from https://github.com/jcmellado/js-aruco

var video, canvas, context, imageData, detector;
var itemList = [];

    function onLoad(){
      video = document.getElementById("video");
      canvas = document.getElementById("canvas");
      context = canvas.getContext("2d");

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
          } else {
            video.src = window.URL.createObjectURL(stream);
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
    }

    function drawCorners(markers){
      var corners, corner, i, j;

      context.lineWidth = 3;

      for (i = 0; i !== markers.length; ++ i){
        corners = markers[i].corners;

        context.strokeStyle = "red";
        context.beginPath();

        // for (j = 0; j !== corners.length; ++ j){
        //   corner = corners[j];
        //   context.moveTo(corner.x, corner.y);
        //   corner = corners[(j + 1) % corners.length];
        //   context.lineTo(corner.x, corner.y);
        // }

        let a = corners[0].x - corners[1].x;
        let b = corners[0].y - corners[1].y;
        let dist = Math.sqrt( a*a + b*b );

        // Formula to calculate coordinates based on angle and distance
        // x2=x1+d×cosθ
        // y2=y1+d×sinθ,

        let cosAng = - a/dist;
        let senAng = - b/dist;

        console.log("cosseno puro", cosAng);
        console.log((dist*2)*cosAng);

        let newCorner = {};

        newCorner.x = corners[0].x + (dist*2)*cosAng;
        newCorner.y = corners[0].y + (dist*2)*senAng;

        context.moveTo(corners[0].x, corners[0].y);
        context.lineTo(newCorner.x, newCorner.y)

        context.stroke();
        context.closePath();

        context.strokeStyle = "green";
        context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
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
