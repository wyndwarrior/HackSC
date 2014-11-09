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
    setInterval(pull, 250);
}

function pull(){
    api("positions", null, function(data){
	if( data ){
	    var cap = $('#rCapture');
	    cap.html('');
	    for(var i in data){
		var x = data[i];
		cap.append('<div class="col-sm-12"><canvas id="can'+i+'"></canvas><br/><a class="btn btn-success" onClick="chooseCanvas('+i+')">Capture Pose</a><br/></div>');
		$("#can"+i).width(500);
		$("#can"+i).height(400);
	    }
	}
    });
}

var order = "SpineBase SpineMid SpineMid SpineShoulder SpineShoulder Neck Neck Head SpineShoulder ShoulderLeft ShoulderLeft ElbowLeft ElbowLeft WristLeft WristLeft HandLeft SpineShoulder ShoulderRight ShoulderRight ElbowRight ElbowRight WristRight WristRight HandRight SpineBase HipLeft HipLeft KneeLeft KneeLeft AnkleLeft AnkleLeft FootLeft SpineBase HipRight HipRight KneeRight KneeRight AnkleRight AnkleRight FootRight HandTipLeft HandLeft HandLeft ThumbLeft HandTipRight HandRight HandRight ThumbRight".split(" ");

function drawIn(data, i){
    canvas = document.getElementById('can'+i);
    context = canvas.getContext('2d');
    for(var i = 0; i<order.length; i+=2){
	
}
