var name1 = document.getElementById('name1');
var secret1 = document.getElementById('secret1');
var readRole1 = document.getElementById('readRole1');
var role1 = document.getElementById('role1');
var minus1 = document.getElementById('minus1');
var add1 = document.getElementById('add1');
var score1 = document.getElementById('score1');
var readScore1 = document.getElementById('readScore1');

readRole1.addEventListener("click", function(){readRole(name1, role1)});
readScore1.addEventListener("click", function(){readScore(name1, score1)});
add1.addEventListener("click", function(){changeScore(score1, "plus")});
minus1.addEventListener("click", function(){changeScore(score1, "minus")});

var name2 = document.getElementById('name2');
var secret2 = document.getElementById('secret2');
var readRole2 = document.getElementById('readRole2');
var role2 = document.getElementById('role2');
var minus2 = document.getElementById('minus2');
var add2 = document.getElementById('add2');
var score2 = document.getElementById('score2');
var readScore2 = document.getElementById('readScore2');

readRole2.addEventListener("click", function(){readRole(name2, role2)});
readScore2.addEventListener("click", function(){readScore(name2, score2)});
add2.addEventListener("click", function(){changeScore(score2, "plus")});
minus2.addEventListener("click", function(){changeScore(score2, "minus")});

var name3 = document.getElementById('name3');
var secret3 = document.getElementById('secret3');
var readRole3 = document.getElementById('readRole3');
var role3 = document.getElementById('role3');
var minus3 = document.getElementById('minus3');
var add3 = document.getElementById('add3');
var score3 = document.getElementById('score3');
var readScore3 = document.getElementById('readScore3');

readRole3.addEventListener("click", function(){readRole(name3, role3)});
readScore3.addEventListener("click", function(){readScore(name3, score3)});
add3.addEventListener("click", function(){changeScore(score3, "plus")});
minus3.addEventListener("click", function(){changeScore(score3, "minus")});

var name4 = document.getElementById('name4');
var secret4 = document.getElementById('secret4');
var readRole4 = document.getElementById('readRole4');
var role4 = document.getElementById('role4');
var minus4 = document.getElementById('minus4');
var add4 = document.getElementById('add4');
var score4 = document.getElementById('score4');
var readScore4 = document.getElementById('readScore4');

readRole4.addEventListener("click", function(){readRole(name4, role4)});
readScore4.addEventListener("click", function(){readScore(name4, score4)});
add4.addEventListener("click", function(){changeScore(score4, "plus")});
minus4.addEventListener("click", function(){changeScore(score4, "minus")});

var name5 = document.getElementById('name5');
var secret5 = document.getElementById('secret5');
var readRole5 = document.getElementById('readRole5');
var role5 = document.getElementById('role5');
var minus5 = document.getElementById('minus5');
var add5 = document.getElementById('add5');
var score5 = document.getElementById('score5');
var readScore5 = document.getElementById('readScore5');

readRole5.addEventListener("click", function(){readRole(name5, role5)});
readScore5.addEventListener("click", function(){readScore(name5, score5)});
add5.addEventListener("click", function(){changeScore(score5, "plus")});
minus5.addEventListener("click", function(){changeScore(score5, "minus")});



var readSec = document.getElementById('readSec');
readSec.addEventListener("click", function(){
  var line = "";

  if (secret1.value.length > 0) {
    line += name1.value + " says: " + secret1.value + ".";
    responsiveVoice.speak(line);

  }

  if (secret2.value.length > 0) {
    line += name2.value + " says: " + secret2.value + ".";
    responsiveVoice.speak(line);
  }

  if (secret3.value.length > 0) {
    line += name3.value + " says: " + secret3.value + ".";
    responsiveVoice.speak(line);
  }

  if (secret4.value.length > 0) {
    line += name4.value + " says: " + secret4.value + ".";
    responsiveVoice.speak(line);
  }

  if (secret5.value.length > 0) {
    line += name5.value + " says: " + secret5.value + ".";
    responsiveVoice.speak(line);
  }

});

var sortRole = document.getElementById("sortRole");
var villager = document.getElementById("villager");
var wolf = document.getElementById("wolf");
var roles = document.getElementsByClassName("role");
sortRole.addEventListener("click", function(){
  var playerRoles = [];
  var nVillager = villager.value;
  var nWolf = wolf.value;
  for (var i=0; i<nVillager; i++) { playerRoles.push("villager"); }
  for (var i=0; i<nWolf; i++) { playerRoles.push("wolf"); }

  for (var i=0; i<roles.length;i++) {
    var z = Math.floor(Math.random() * playerRoles.length);
    roles[i].value = playerRoles[z];
    playerRoles.splice(z, 1);
  }

});

function readRole(name, role) {
  var names = document.getElementsByClassName("name");
  if (role.value == "wolf") {
    var line = name.value + ", you are a " + role.value + ". The other wolfs are: ";
    for (var i=0; i<roles.length; i++) {
      if (roles[i].value == "wolf" && names[i].value !== name.value) {
        line += names[i].value + ", ";
      }
    }
    responsiveVoice.speak(line);
  }
  else {
    var line = name.value + ", you are a " + role.value + ". Try to find the wolfs!";
    responsiveVoice.speak(line);
  }
}

function readScore(name, score) {
  var line = name.value + "'s score is: " + score.value;
  responsiveVoice.speak(line);
}

function changeScore(score, operation) {
  if (operation == "plus") {
    score.value++;
  }
  else {
    score.value--;
  }
}
