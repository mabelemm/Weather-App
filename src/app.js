function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");
  //creating the loop
  
  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day){
  forecastHTML = forecastHTML +`
              <div class="col-2">
                <div class="weather-forecast-date">
                ${day}</div>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
                  alt="clear"
                  width="36"
                />
                <div class="weather-forecast-temperatures">
                <span class = "weather-forecast-temperature-max">18°</span> 
                <span class = "weather-forecast-temperature-min">16°</span>
                </div>
              </div>
            `;
  });
   forecastHTML=forecastHTML+`</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = celsiusTemperature;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "9401bb320e6030fd32bddc72534dad85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handlesubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active"); // remove the active from Celsius link
  fahrenheitLink.classList.add("active"); // add the active class from Fahrenheit link
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active"); // remove the active from Fahrenheit link
  celsiusLink.classList.add("active"); // add the active class from Celsius link
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New york");
displayForecast();
