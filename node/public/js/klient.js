function startUpdate() {
  setInterval(update, 250);
}

var correctness = 0;
var timer = 5;
var repsLeft = 5;

function update() {
  api("positions", null, function(data) {
    if (data) {
      var c = document.getElementById("can");
      clearr(c);
      var perc = 0;
      for (var i in data) {
        drawIn(data[i], c);
        perc = Math.max(perc, match(data[i], test));
      }
      $("#match").html(perc.toFixed(2) + "%");
      correctness = perc;
    }
  });

  if (perc > 0.7){
    setInterval(decrementTimer, 1000);
  }else{
    timer = 5;
  }

  if(timer == 0){
    repsLeft--;
  }
}

function decrementTimer(){
  timer--;
}

$(document).ready(startUpdate);

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function mag(v) {
  return Math.sqrt(dot(v, v));
}

function ang(a, b) {
  return Math.acos(dot(a, b) / (mag(a) * mag(b))) * 180 / Math.PI;
}

var ignore = "ThumbLeft ThumbRight HandTipRight HandTipLeft FootLeft FootRight";

function match(d1, d2) {
  //d2 is key
  var total = 0;
  var cur = 0;
  for (var i = 0; i < order.length; i += 2) {
    var o1 = order[i];
    var o2 = order[i + 1];
    if (ignore.indexOf(o1) != -1 || ignore.indexOf(o2) != -1) {
      //console.log(o1, o2);
      continue;
    }
    var a1 = d1[o1];
    var a2 = d2[o1];
    var b1 = d1[o2];
    var b2 = d2[o2];
    var v1 = [b1[0] - a1[0], b1[1] - a1[1], b1[2] - a1[2]];
    var v2 = [b2[0] - a2[0], b2[1] - a2[1], b2[2] - a2[2]];
    var m = mag(v2);
    total += m;
    cur += dot(v1, v2) / Math.max(mag(v1), mag(v2));
    //cur += Math.pow((180-ang(v1, v2))/180.0,2)*m;
  }
  return cur / total * 100;
}

var test = {
  "SpineBase": [0.04681206, -0.2813448, 1.739246],
  "SpineMid": [0.04564117, 0.009305262, 1.78946],
  "Neck": [0.04388081, 0.2895647, 1.827057],
  "Head": [0.06519967, 0.4367197, 1.797873],
  "ShoulderLeft": [-0.1589257, 0.2046939, 1.811651],
  "ElbowLeft": [-0.4002185, 0.2910205, 1.729443],
  "WristLeft": [-0.6062525, 0.3454093, 1.63855],
  "HandLeft": [-0.6986628, 0.3747534, 1.608788],
  "ShoulderRight": [0.2615252, 0.1917034, 1.8336],
  "ElbowRight": [0.4828339, 0.2357125, 1.778567],
  "WristRight": [0.7195935, 0.2632023, 1.714332],
  "HandRight": [0.8157651, 0.2780761, 1.693956],
  "HipLeft": [-0.04511522, -0.2733506, 1.701301],
  "KneeLeft": [-0.07782946, -0.6366362, 1.577089],
  "AnkleLeft": [-0.04733638, -0.9969103, 1.552681],
  "FootLeft": [-0.04891069, -0.8658884, 1.52862],
  "HipRight": [0.1370486, -0.279162, 1.713568],
  "KneeRight": [0.1465728, -0.6526054, 1.650924],
  "AnkleRight": [0.2124992, -1.006483, 1.667948],
  "FootRight": [0.1934532, -0.8789235, 1.622261],
  "SpineShoulder": [0.04441028, 0.2208168, 1.819755],
  "HandTipLeft": [-0.7660626, 0.3959339, 1.600175],
  "ThumbLeft": [-0.7392732, 0.3376156, 1.587132],
  "HandTipRight": [0.8849394, 0.2717932, 1.690406],
  "ThumbRight": [0.8207342, 0.3253195, 1.655555]
};