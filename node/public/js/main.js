function api(cmd, data, callb){
    $.ajax({
	type: 'POST', 
            url: cmd,
            async: true,
            cache: false,
            dataType: 'json',
            data: data, 
            success: function(data, textStatus, jqXHR){
		if (typeof data === "undefined" || data == null){
		    callb(null);
		    alert("Request failed");
		    return;
		    }
		var err = data.error;
		if (typeof err === "undefined") 
		    callb(data);
		else{
		    callb(null);
		    alert("Error: " + err);
		    }
            }
        });
}

function startPull(){
    setInterval(pull, 70);
}

var canvases = 0;

function pull(){
    api("positions", null, function(data){
	var cap = $('#rCapture');
	if( data ){
	    while(canvases < data.length){
		cap.append('<div id="cap_'+canvases+'" class="col-sm-12"><canvas width="500" height="400" id="can'+canvases+'"></canvas><br/><a class="btn btn-success" onClick="chooseCanvas('+canvases+')" id="cap'+canvases+'" data-loading-text="Capturing in 3...">Capture Pose</a><br/></div>');
		canvases++;
	    }
	    while(canvases > data.length){
		$("#cap_"+(canvases-1)).remove();
		canvases--;
	    }
		
	    for(var i in data){
		drawIn(data[i], i);
	    }
	}
    });
}

function chooseCanvas(can){
    $("#cap"+can).button('loading');
    setTimeout(function(){snapshot(can);}, 3000);
}

function snapshot(can){
    $("#cap"+can).button('reset');
}

var order = "SpineBase SpineMid SpineMid SpineShoulder SpineShoulder Neck Neck Head SpineShoulder ShoulderLeft ShoulderLeft ElbowLeft ElbowLeft WristLeft WristLeft HandLeft SpineShoulder ShoulderRight ShoulderRight ElbowRight ElbowRight WristRight WristRight HandRight SpineBase HipLeft HipLeft KneeLeft KneeLeft AnkleLeft AnkleLeft FootLeft SpineBase HipRight HipRight KneeRight KneeRight AnkleRight AnkleRight FootRight HandTipLeft HandLeft HandLeft ThumbLeft HandTipRight HandRight HandRight ThumbRight".split(" ");

function drawLine(p1, p2, context){
    
    context.beginPath();
    context.moveTo(p1[0], p1[1]);
    context.lineTo(p2[0], p2[1]);
    //console.log(p1[0], p1[1], p2[0], p2[1]);
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = 'red';
    context.stroke();
    point(p1[0], p1[1], context);
        point(p2[0], p2[1], context);
}

function point(x, y, context){
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x+1, y+1);
context.lineWidth = 7;
    context.lineCap = 'round';
    context.strokeStyle = 'blue';
  context.stroke();
}

var LEN = 1;

function to2D(p, w, h){
    return [Math.floor(w*(p[0]+LEN)/(2*LEN)), Math.floor(h*(1-(p[1]+LEN)/(2*LEN)))]
}

function drawIn(data, i){
    canvas = document.getElementById('can'+i);
    context = canvas.getContext('2d');

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    for(var i = 0; i<order.length; i+=2){
	drawLine(to2D(data[order[i]], canvas.width, canvas.height), to2D(data[order[i+1]], canvas.width, canvas.height), context);
    }
}
