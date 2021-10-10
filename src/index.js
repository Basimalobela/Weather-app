function search(event) {
  event.preventDefault();
  let searchinput = document.querySelector(".form-control");
  console.log(searchinput.value);
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${searchinput.value} is currently`;

  let apiKey = "fd8dc43a95bacb95d9bf2f72376e8563";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchinput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector(".formfloating");
form.addEventListener("submit", search);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let dayz = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector(".row");

  let forecastHTML = `<div class="row">`;
  dayz.forEach(function (forecastDay, index) {
    forecastHTML =
      forecastHTML +
      ` <div class="row-cols-3">
        <div class= "day">${formatDay(forecastDay.dt)}</div>
          <div class="card" style="width: 230px">
            <div><img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" class="weathericon" alt="..." /></div>
            <div class="card-body">
              <h5 class="temp-max">${Math.round(
                forecastDay.temp.max
              )}° <span id="temp-min">${Math.round(
        forecastDay.temp.min
      )}°</span></h5>
                ${forecastDay.weather[0].description}
                <br />
              </p>
            </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
document.getElementById("datetime").innerHTML =
  `${day}` +
  " " +
  ("0" + now.getDate()).slice(-2) +
  " " +
  now.getFullYear() +
  " " +
  ("0" + now.getHours()).slice(-2) +
  ":" +
  ("0" + now.getMinutes()).slice(-2);

function getCelsius(event) {
  event.preventDefault();
  celsiusBtn.classList.add("active");
  celsiusBtn.setAttribute("disabled", true);
  fahrenheitBtn.classList.remove("active");
  fahrenheitBtn.removeAttribute("disabled");

  let currentTemp = document.querySelector(".current-temp");
  let celsiusTemp = Math.round((currentTemp.innerHTML - 32) / 1.8);
  currentTemp.innerHTML = `${celsiusTemp}`;
}

function getFahrenheit(event) {
  event.preventDefault();
  celsiusBtn.classList.remove("active");
  celsiusBtn.removeAttribute("disabled");
  fahrenheitBtn.classList.add("active");
  fahrenheitBtn.setAttribute("disabled", true);

  let currentTemp = document.querySelector(".current-temp");
  let fahrenheitTemp = Math.round(currentTemp.innerHTML * 1.8 + 32);
  currentTemp.innerHTML = `${fahrenheitTemp}`;
}

let fahrenheitBtn = document.querySelector(".fahrenheit");
fahrenheitBtn.addEventListener("click", getFahrenheit);
let celsiusBtn = document.querySelector(".celsius");
celsiusBtn.addEventListener("click", getCelsius);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "fd8dc43a95bacb95d9bf2f72376e8563";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  console.log(response);
  let city = response.data.name;
  let cityElement = document.querySelector("h3");
  cityElement.innerHTML = `${city} is currently..`;

  let forecast = document.querySelector(".disweather");
  let forecastDiscription = response.data.weather[0].description;
  forecast.innerHTML = `${forecastDiscription}`;
  let windspeed = document.querySelector("#windspeed");
  let windSpeedspeed = response.data.wind.speed;
  windspeed.innerHTML = `${windSpeedspeed}`;

  let logo = document.querySelector("#mainImg");
  logo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let Temperature = Math.round(response.data.main.temp);
  console.log(response.data.main.temp);
  let tempElement = document.querySelector(".current-temp");
  tempElement.innerHTML = `${Temperature}`;

  getForecast(response.data.coord);
}
function getPosition(position) {
  console.log(position);

  let lat = position.coords.latitude;
  console.log(position.coords.latitude);
  let long = position.coords.longitude;
  console.log(position.coords.longitude);
  let apiKey = "fd8dc43a95bacb95d9bf2f72376e8563";

  let apiUrls = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&apiKey=${apiKey}&units=metric`;

  axios.get(apiUrls).then(showTemp);
}
// function currentLocation(position) {
//   console.log(position)

//   let searchinput = document.querySelector("h3");
//   searchinput.innerHTML = `${citi} is currently`;
//   let citi = position.data.name

//   let apiKey = "fd8dc43a95bacb95d9bf2f72376e8563";

//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citi}&appid=${apiKey}&units=metric`;

//   axios.get(apiUrl).then(search)
// }
navigator.geolocation.getCurrentPosition(getPosition);
// navigator.geolocation.getCurrentPosition(currentLocation)
