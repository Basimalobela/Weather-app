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

function showTemp(response) {
  console.log(response);
  console.log(response.data.name);

  let Temperature = Math.round(response.data.main.temp);
  console.log(response.data.main.temp);
  let tempElement = document.querySelector(".current-temp");
  tempElement.innerHTML = `${Temperature}`;
  let cityElement = document.querySelector(".form-control");
  let city = console.log(cityElement);
  cityElement.innerHTML = `${city}`;
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
let Clocation = document.querySelector("button");
Clocation.addEventListener("click", search);
navigator.geolocation.getCurrentPosition(getPosition);
// navigator.geolocation.getCurrentPosition(currentLocation)
