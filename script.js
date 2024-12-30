const apiKey = "08267a10367012b5480932446c7faf00"; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const { name } = data;
        const { temp } = data.main;
        const { description, icon } = data.weather[0];
        const currentTime = new Date(data.dt * 1000).toLocaleString();

        document.getElementById("city-name").textContent = name;
        document.getElementById("temperature").textContent = `Temperature: ${temp}°C`;
        document.getElementById("condition").textContent = `Condition: ${description}`;
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.getElementById("time").textContent = `Time: ${currentTime}`;
        document.getElementById("weather").style.display = "block";

        updateBackground(description);
      } else {
        alert("City not found! Please try again.");
      }
    })
    .catch(error => console.error("Error fetching weather data:", error));
}

function updateBackground(condition) {
  const body = document.body;
  body.className = ""; // Reset classes

  if (condition.includes("clear")) {
    body.classList.add("sunny");
  } else if (condition.includes("clouds")) {
    body.classList.add("cloudy");
  } else if (condition.includes("rain")) {
    body.classList.add("rainy");
  } else {
    body.classList.add("default");
  }
}
