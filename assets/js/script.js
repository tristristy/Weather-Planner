
// store city value
let city = $("#cityName").val();

const key = "&appid=600ed8a4214e3c2ac55bea638db12b58"

let date = new Date();

$("#cityName").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});

$("#searchBtn").on("click", function () {

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
            getConditions(response);
            getForecast();
            makeList();
        })
});

//make list
function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
}

//function to get conditions
function getConditions(response) {

    let tempImp = (response.main.temp - 273.15) * 1.80 + 32;
    tempImp = Math.floor(tempImp);

    $('#currentCity').empty();

    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempImp + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    //append app
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)

}
//function to call forcast
function getForecast() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + key,
        method: "GET"
    }).then(function (response) {
        $('#forecast').empty();

        // variable to hold response.list
        let results = response.list;

        for (let i = 0; i < results.length; i++) {

            let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
            let hour = results[i].dt_txt.split('-')[2].split(' ')[1];

            if (results[i].dt_txt.indexOf("12:00:00") !== -1) {

                // get the temperature and convert to fahrenheit 
                let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                let tempImp = Math.floor(temp);

                const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
                const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempImp + " °F");
                const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

                const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);

            }
        }
    });
}

