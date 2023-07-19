var weatherForm = $("#weather-form");
var citiesButtons = $("#cities-button");
var searchElement = $("#search");
var weatherContainer = $("#weather-container");
var forecastContainer = $("#forecast-container");
var historyContainer = $("#history");
var apiKey = "8efed053aa2fc8f3ac8f50a776afdf36";
var saveButton = $("#saved-weather");

var formSubmit = function (event) {
  event.preventDefault();

  var search = searchElement.val().trim();

  if (search) {
    getSearchValue(search);
    getCurrentCity(search);
    rendorSave(search);

    searchElement.val("");
  } else {
    alert("Enter a city to see if you will freeze or burn");
  }
};

var getCurrentCity = function (searchElement) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchElement +
    "&appid=" +
    apiKey +
    "&units=imperial";
  console.log(apiUrl);
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCurrentWeather(data);
    });
};

var getSearchValue = function (searchElement) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchElement +
    "&appid=" +
    apiKey +
    "&units=imperial";
  console.log(apiUrl);
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderForecast(data);
      console.log(data);
    });
};

var renderCurrentWeather = function (data) {
  weatherContainer.html("");
  var cityH3 = $("<h3>");
  cityH3.text(data.name);
  weatherContainer.append(cityH3);
  var cityTemprature = $("<li>");
  cityTemprature.text("Temprature: " + data.main.temp);
  weatherContainer.append(cityTemprature);
  var feelsLikeCity = $("<li>");
  feelsLikeCity.text(data.main.feels_like);
  weatherContainer.append(feelsLikeCity);
  var humidityList = $("<li>");
  humidityList.text(data.main.humidity);
  weatherContainer.append(humidityList);
  var cityWeather = $("<li>");
  cityWeather.text(data.weather[Array(1)]);
  weatherContainer.append(cityWeather);
};

var renderForecast = function (data) {
  forecastContainer.html("");
  var selectedData = [
    data.list[3],
    data.list[11],
    data.list[19],
    data.list[27],
    data.list[35],
  ];
  for (let index = 0; index < selectedData.length; index++) {
    var cardContainer = $("<div>");
    cardContainer.addClass("forecast-card");
    var date = $("<li>");
    date.text("Date: " + selectedData[index].dt_txt);
    cardContainer.append(date);
    forecastContainer.append(cardContainer);
  }
};

var rendorSave = function (saveCity) {
  var newButton = $("<button>");
  newButton.text(saveCity);
  newButton.on("click", function (event) {
    var grabCityText = event.target.textContent
    getSearchValue(grabCityText);
    getCurrentCity(grabCityText);
  })
  saveButton.append(newButton);
}

weatherForm.on("submit", formSubmit);
