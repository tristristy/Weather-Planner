var apiKey = "a14c054b595eba0e2721db026cf78927"


var geoCall = function(){
    var zipCode = "08085"
    fetch('http://api.openweathermap.org/geo/1.0/zip?zip=' + zipCode + "&appid=" +  apiKey)
        .then((data) => data.json())
        .then((data) => weatherCall(data));
    

        
    
};

var weatherCall = function(){
    
};

geoCall();