const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b480d29e23msh0abb34b9a11b6c1p1c16e4jsn4c7767506acd',
		'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
	}
};

var city = $("#cityName").val();

$("#cityName").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchButton").click();
    }
});

$("#searchButton").on("click", function () {
    $("#forcastTitle").removeClass("invisible")

    city = $("#cityName").val();

    $("#cityName").val("");

    fetch('https://community-open-weather-map.p.rapidapi.com/weather?q=' + city + '&units=imperial', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    
        
        getConditions(response);
        getForcast();
        makeList();
});

function makeList(){
    var listItem = $("<li>").text(city);
    $("#recentSearches").appendChild(listItem);
};