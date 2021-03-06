function api(cmd, data, callb) {
  $.ajax({
    type: 'POST',
    url: cmd,
    async: true,
    cache: false,
    dataType: 'json',
    data: data,
    success: function(data, textStatus, jqXHR) {
      if (typeof data === "undefined" || data == null) {
        callb(null);
        alert("Request failed");
        return;
      }
      var err = data.error;
      if (typeof err === "undefined")
        callb(data);
      else {
        callb(null);
        alert("Error: " + err);
      }
    }
  });
}

function startPull() {
  setInterval(pull, 250);
}

var canvases = 0;
var fdata = null;
var curData = null;

function pull() {
  api("positions", null, function(data) {
    var cap = $('#rCapture');
    if (data) {
      curData = data;
      while (canvases < data.length) {
        cap.append('<div id="cap_' + canvases + '" class="col-sm-12"><canvas width="500" height="400" id="can' + canvases + '"></canvas><br/><a class="btn btn-success" onClick="chooseCanvas(' + canvases + ')" id="cap' + canvases + '" data-loading-text="Capturing in 3...">Capture Pose</a><br/></div>');
        canvases++;
      }
      while (canvases > data.length) {
        $("#cap_" + (canvases - 1)).remove();
        canvases--;
      }

      for (var i in data) {
        //console.log(i + " " +data.length);
        var e = document.getElementById('can' + i);
        //console.log(e.getContext("2d"));
        clearr(e);
        drawIn(data[i], e);
      }
    }
  });
}

function chooseCanvas(can) {
  $("#cap" + can).button('loading');
  setTimeout(function() {
    snapshot(can);
  }, 3000);
}

function snapshot(can) {
  $("#cap" + can).button('reset');
  fdata = curData[can];
  clearr(document.getElementById('fcanvas'));
  drawIn(fdata, document.getElementById('fcanvas'));
  window.posData = fdata;
  $("#rCapture").hide(0);
  $("#fCapture").show(0);
  console.log("" + JSON.stringify(fdata));
}

function retake() {
  $("#rCapture").show(0);
  $("#fCapture").hide(0);
}

var order = "SpineBase SpineMid SpineMid SpineShoulder SpineShoulder Neck Neck Head SpineShoulder ShoulderLeft ShoulderLeft ElbowLeft ElbowLeft WristLeft WristLeft HandLeft SpineShoulder ShoulderRight ShoulderRight ElbowRight ElbowRight WristRight WristRight HandRight SpineBase HipLeft HipLeft KneeLeft KneeLeft AnkleLeft AnkleLeft FootLeft SpineBase HipRight HipRight KneeRight KneeRight AnkleRight AnkleRight FootRight HandTipLeft HandLeft HandLeft ThumbLeft HandTipRight HandRight HandRight ThumbRight".split(" ");

function drawLine(p1, p2, context, width) {
  //    console.log(p1);
  context.beginPath();
  context.moveTo(p1[0], p1[1]);
  context.lineTo(p2[0], p2[1]);
  //console.log(p1[0], p1[1], p2[0], p2[1]);
  context.lineWidth = width;
  context.lineCap = 'round';
  context.strokeStyle = 'red';
  context.stroke();
  var pw = width * 7 / 5;
  point(p1[0], p1[1], p1[2], context, pw);
  point(p2[0], p2[1], p2[2], context, pw);
}

function point(x, y, z, context, width) {
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + 1, y + 1);
  context.lineWidth = width;
  context.lineCap = 'round';
  //console.log('rgba(0,0,255,' + (z/3) + ')');
  context.strokeStyle = 'rgba(0,0,255,' + (1 - z / 3) + ')';
  context.stroke();
}

var LEN = .7;

function to2D(p, w, h) {
  // p is arr[3]
  // map xyz to wh
  // x and y [-1, 1]
  // z [0, 3], but generally 1 to 2
  // for w, scale xE[-1, 1] to [0, 2], to [0, 1]
  // for h, scale yE[-1, 1] to [0, 2], to [0, 1], to [1, 0] cuz h goes down
  // z modifier: for both w and h, multiply by z/3
  var zscale = 1 - Math.min(p[2], 3.5) / 3.5
  return [Math.floor(w * (p[0] * zscale + LEN) / (2 * LEN)), Math.floor(h * (1 - (p[1] * zscale + LEN) / (2 * LEN))), p[2]]
}

function clearr(c) {
  var context = c.getContext('2d');

  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, c.width, c.height);
  context.restore();

}

function drawIn(data, canvas, width) {
  width = width || 5;
  var context = canvas.getContext('2d');
  for (var i = 0; i < order.length; i += 2) {
    drawLine(to2D(data[order[i]], canvas.width, canvas.height), to2D(data[order[i + 1]], canvas.width, canvas.height), context, width);
  }
}
