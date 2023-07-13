var weatherForm = document.querySelector('#weather-form');
var citiesButtons = document.querySelector('#cities-button');
var searchElement = document.querySelector('#search');
var weatherContainer = document.querySelector('#weather-container');
var apiKey = "8efed053aa2fc8f3ac8f50a776afdf36";

var formSubmit = function (event) {
    event.preventDefault();

    var search = searchElement.value.trim();

    if (search) {
        getSearchValue(search);

        searchElement.value = '';
    } else {
        alert('Enter a city to see if you will freeze or burn')
    }
};

var citiesButtonsSelector = function (event) {
    var cities = event.target.getAttribute('data-cities');

    if (cities) {
        getShownCity(cities);

        weatherContainer.textContent = '';
    }
};

var getApiWeather = function (searchElement) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchElement + '&appid=' + apiKey + '&units=imperial'
}



weatherForm.addEventListener('submit', formSubmit);
citiesButtons.addEventListener('click', citiesButtonsSelector);


















































