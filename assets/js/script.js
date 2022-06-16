var city = $("#cityName").val();

var key = "&appid=a14c054b595eba0e2721db026cf78927"

$("#cityName").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchButton").click();
    }
});

$("#searchBtn").on("click", function() {

    $('#forecastTitle').addClass('show');

    city = $("#cityName").val();

    //clears input value
    $("#cityName").val("");

    const callUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + key;

    $.ajax({
        url: callUrl,
        method: "GET"
      })
      .then(function (response){
    
        console.log(response)
    
        console.log(response.name)
        console.log(response.weather[0].icon)
    
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(Math.floor(tempF))
    
        console.log(response.main.humidity)
    
        console.log(response.wind.speed)
        
        getConditions(response);
        getForecast();
        makeList();
        })
      });

function makeList() {
    var listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }