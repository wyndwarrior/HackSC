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

function refreshData(){
    api('positions', null, function(data){
	if(data){
	    var count = 0;
	    $("#main0").html('');
            $("#main1").html('');
            $("#main2").html('');
	    for(var i in data){
		//console.log(i);
		var v = data[i];
		$("#main"+((count++)%3)).append("<p><b>"+i+"</b></p>"+
				 "<span>"+v[0]+"</span><br/>"+
				 "<span>"+v[1]+"</span><br/>"+
				 "<p>"+v[2]+"</p>");
	    }
	}
    });
}

$(document).ready(function(){
    setInterval(refreshData, 1000);
});


