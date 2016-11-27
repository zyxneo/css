var myStyle = "";

// elements
var update = document.getElementById("update");

var boxShadowColor = document.getElementById("boxShadowColor");
var boxShadowX = document.getElementById("boxShadowX");
var boxShadowY = document.getElementById("boxShadowY");
var boxShadowBlur = document.getElementById("boxShadowBlur");
var boxShadowSpread = document.getElementById("boxShadowSpread");
var boxShadowType = document.getElementById("boxShadowType");

var repeatBoxShadow = document.getElementById("repeatBoxShadow");
var incrementBoxShadowX = document.getElementById("incrementBoxShadowX");
var incrementBoxShadowY = document.getElementById("incrementBoxShadowY");
var incrementBoxShadowBlur = document.getElementById("incrementBoxShadowBlur");
var incrementBoxShadowSpread = document.getElementById("incrementBoxShadowSpread");


// Append stylesheet
var styleSheetId = document.createElement('style');
styleSheetId.innerHTML = myStyle;
document.body.appendChild(styleSheetId);

// update function
var updateStyle = function () {
  var repeat = repeatBoxShadow.value;

  myStyle = ".sample {\n";
  myStyle += "  display: block;\n";
  myStyle += "  position: absolute;\n";
  myStyle += "  top: 20%;\n";
  myStyle += "  right: 20%;\n";
  myStyle += "  width: 40px;\n";
  myStyle += "  height: 40px;\n";
  myStyle += "  background: red;\n";
  myStyle += "  box-shadow:";
  for (var i = 0; i < repeat; i++) {
    myStyle += " hsla(190, 100%, 50%, 1)";
    myStyle += " " + (parseFloat(boxShadowX.value) + (i * parseFloat(incrementBoxShadowX.value))) + "px";
    myStyle += " " + (parseFloat(boxShadowY.value) + (i * parseFloat(incrementBoxShadowY.value))) + "px";
    myStyle += " " + (parseFloat(boxShadowBlur.value) + (i * parseFloat(incrementBoxShadowBlur.value))) + "px";
    myStyle += " " + (parseFloat(boxShadowSpread.value) + (i * parseFloat(incrementBoxShadowSpread.value))) + "px";
    if (boxShadowType.checked) {
      myStyle += " " + boxShadowType.value;
    }
    if (i < repeat - 1) {
      myStyle += ",";
    }
  }
  myStyle += ";\n";
  myStyle += "}\n";
  myStyle += "\n";
  myStyle += "@keyframes AnimationName {\n";

  var myArray = [];

  for (var i = 0; i <= repeat; i++) {
    var tempArray = [];
    tempArray.push(parseFloat(boxShadowX.value) + (i * parseFloat(incrementBoxShadowX.value)),
              parseFloat(boxShadowY.value) + (i * parseFloat(incrementBoxShadowY.value)),
              parseFloat(boxShadowBlur.value) + (i * parseFloat(incrementBoxShadowBlur.value)),
              parseFloat(boxShadowSpread.value) + (i * parseFloat(incrementBoxShadowSpread.value)));
    myArray.push(tempArray);
  }

  console.dir(myArray);

  for (var i = 0; i <= repeat; i++) {
    myStyle += "  " + 100/repeat*i + "%\{";
    myStyle += "box-shadow:";
    for (var j = 0; j < repeat; j++) {
      myStyle += " hsla(" + 360/repeat*(j+i) + ", 100%, 50%, " + Math.min(Math.max(0,(j+i+1)%repeat),(j+i)%repeat) + ")"; //Math.min(1,(j+i)%repeat)
      myStyle += " " + myArray[(j+i)%repeat][0] + "px";
      myStyle += " " + myArray[(j+i)%repeat][1] + "px";
      myStyle += " " + myArray[(j+i)%repeat][2] + "px";
      myStyle += " " + myArray[(j+i)%repeat][3] + "px";
      if (boxShadowType.checked) {
        myStyle += " " + boxShadowType.value;
      }
      if (j < repeat - 1) {
        myStyle += ",";
      }
    }
    myStyle += ";";
    myStyle += "\}\n";
  }

  tempStyle.value = myStyle;
  styleSheetId.innerHTML = myStyle;
}
updateStyle();
update.onclick = updateStyle;
