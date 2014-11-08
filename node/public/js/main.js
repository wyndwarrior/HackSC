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




