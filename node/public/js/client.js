function startUpdate(){
    setInterval(update, 70);
}

function update(){
    api("positions", null, function(data){
	if(data){
	    var c = document.getElementById("can");
	    clear(c);
	    for(var i in data){
		drawIn(data[i], c);
	    }
	}
    });
}

function dot(a, b){
    return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
}

function mag(v){
    return Math.sqrt(dot(v,v));
}

function ang(a, b){
    return Math.acos(dot(a,b)/(mag(a)*mag(b)))*180/Math.PI;
}

function match(a, b){
    
}

var test = {"SpineBase":[0.04681206,-0.2813448,1.739246],"SpineMid":[0.04564117,0.009305262,1.78946],"Neck":[0.04388081,0.2895647,1.827057],"Head":[0.06519967,0.4367197,1.797873],"ShoulderLeft":[-0.1589257,0.2046939,1.811651],"ElbowLeft":[-0.4002185,0.2910205,1.729443],"WristLeft":[-0.6062525,0.3454093,1.63855],"HandLeft":[-0.6986628,0.3747534,1.608788],"ShoulderRight":[0.2615252,0.1917034,1.8336],"ElbowRight":[0.4828339,0.2357125,1.778567],"WristRight":[0.7195935,0.2632023,1.714332],"HandRight":[0.8157651,0.2780761,1.693956],"HipLeft":[-0.04511522,-0.2733506,1.701301],"KneeLeft":[-0.07782946,-0.6366362,1.577089],"AnkleLeft":[-0.04733638,-0.9969103,1.552681],"FootLeft":[-0.04891069,-0.8658884,1.52862],"HipRight":[0.1370486,-0.279162,1.713568],"KneeRight":[0.1465728,-0.6526054,1.650924],"AnkleRight":[0.2124992,-1.006483,1.667948],"FootRight":[0.1934532,-0.8789235,1.622261],"SpineShoulder":[0.04441028,0.2208168,1.819755],"HandTipLeft":[-0.7660626,0.3959339,1.600175],"ThumbLeft":[-0.7392732,0.3376156,1.587132],"HandTipRight":[0.8849394,0.2717932,1.690406],"ThumbRight":[0.8207342,0.3253195,1.655555]};


$(document).ready(startUpdate);
