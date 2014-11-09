var bam = new BeatsAudioManager("myBeatsPlayer");
bam.on("ready", handleReady);
bam.on("error", handleError);
function handleReady(value) { 
    bam.clientId = 'rzkgy3kwfkpgmxas2b7rs3xb';
    bam.authentication = {
        access_token: '3z4atp7vx9qcwcpzccgxjpmh',
        user_id: 'simplyianm'
    };
    bam.identifier = 'tr79700155';
    bam.loop = true;
    bam.load();
};
function handleError(value) {
    console.log("Error: " + value);
    switch(value){
        case "auth":
        // Beats Music API auth error (401)
        break;
        case "connectionfailure":
        // audio stream connection failure
        break;
        case "apisecurity":
        // Beats Music API crossdomain error
        break;
        case "streamsecurity":
        // audio stream crossdomain error
        break;
        case "streamio":
        // audio stream io error
        break;
        case "apiio":
        // Beats Music API io error getting track data
        break;
        case "flashversion":
        // flash version too low or not installed
        break;
    }
};
