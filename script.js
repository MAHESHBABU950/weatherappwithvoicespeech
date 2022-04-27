let temparature = 0;
let humidityValue = 0;
let windSpeed = 0;

let weather = {
  apiKey: "913f2e622a4b4cbc28890089bb01f73b",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
  
    temparature = temp;
    humidityValue = humidity;
    windSpeed = speed;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },

};

function speechWeather() {
  let utterance = new SpeechSynthesisUtterance('the temparature is' + temparature.toString() + 'degrees celcius' + 'and Humidity percentage is' + humidityValue.toString() + 'and wind speed is' + windSpeed.toString() + 'kilometers per hour');
  speechSynthesis.speak(utterance);
}


document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  let deletePost = confirm("WOULD YOU LIKE TO RELOAD THE PAGE?");
        
       

weather.fetchWeather("Denver");