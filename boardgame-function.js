var name1 = document.getElementById('name1');
var secret1 = document.getElementById('secret1');
var readRole1 = document.getElementById('readRole1');
var role1 = document.getElementById('role1');
var minus1 = document.getElementById('minus1');
var add1 = document.getElementById('add1');

readRole1.addEventListener("click", function(){readRole(name1, role1)});

var name2 = document.getElementById('name2');
var secret2 = document.getElementById('secret2');
var readRole2 = document.getElementById('readRole2');
var role2 = document.getElementById('role2');

readRole2.addEventListener("click", function(){readRole(name2, role2)});

var name3 = document.getElementById('name3');
var secret3 = document.getElementById('secret3');
var readRole3 = document.getElementById('readRole3');
var role3 = document.getElementById('role3');

readRole3.addEventListener("click", function(){readRole(name3, role3)});

var name4 = document.getElementById('name4');
var secret4 = document.getElementById('secret4');
var readRole4 = document.getElementById('readRole4');
var role4 = document.getElementById('role4');

readRole4.addEventListener("click", function(){readRole(name4, role4)});

var name5 = document.getElementById('name5');
var secret5 = document.getElementById('secret5');
var readRole5 = document.getElementById('readRole5');
var role5 = document.getElementById('role5');

readRole5.addEventListener("click", function(){readRole(name5, role5)});

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

var names = document.getElementsByClassName("name");
function readRole(name, role) {
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
