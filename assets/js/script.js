var city = $("#cityName").val();

var key = "&appid=a14c054b595eba0e2721db026cf78927"

var date = new Date();

$("#cityName").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchButton").click();
    }
});

$("#searchBtn").on("click", function(){

    $('#forecastTitle').addClass('show');

    city = $("#cityName").val();

    //clears input value
    $("#cityName").val("");

    const callUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + key;

    $.ajax({
        url: callUrl,
        method: "GET"
    })
        .then(function (response) {

            console.log(response)

            console.log(response.name)
            console.log(response.weather[0].icon)

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(Math.floor(tempF))

            console.log(response.main.humidity)

            console.log(response.wind.speed)

            getConditions(response);
            //getForecast();
            makeList();
        })
});

var makeList = function() {
    var listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
}

var getConditions = function(response){
    var tempImp = (response.main.temp - 273.15) * 1.8 + 32;
    tempImp = Math.floor(tempImp)

    $("#currentCity").empty();

    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempImp + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    //append to display

    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)
}
