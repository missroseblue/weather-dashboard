var cityFormEl = document.querySelector("#user-form");
var locationButtonsEL = document.querySelector('#locations-buttons')
var cityInputEl = document.querySelector("#cityNameInput");
var cityContainerEl = document.querySelector("#conditions-container");
var citySearchTerm = document.querySelector("#conditions-search-term");
var currentConditionsEl = document.querySelector(".cityCurrentConditions");
var weeklyForecastEL = document.querySelector(".weeklyForecast");



var formSubmitHandler = function (event) {
  event.preventDefault();

  //iterate through response data
  var cityNameInput = cityInputEl.value.trim();

  if (cityNameInput) {
    getCity(cityNameInput);
    cityInputEl.value = "";
  }
  else {
    alert("Please enter the name of a city");
  }
};

var buttonClickHandler = function (event) {
  // get the city from the clicked element
  var cityButtons = event.target.getAttribute("data-cityButton");
  console.log(cityButtons)
  if (cityButtons) {
    getCity(cityButtons);
  }
};



//fetch City API
var getCity = function (city) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=23d40c242866a0b133662ed347c4e80e&units=imperial'

  fetch(weatherUrl).then(function (response) {
    //request was successful
    if (response.ok) {
      return response.json()
    } else {
      alert("Error: City not found")
    }
  }).then(function (data) {
    // displayWeather(data, city);
    console.log(data);
    oneCall(data.coord.lat, data.coord.lon);
    citySearchTerm.textContent = data.name;

    currentConditionsEl.innerHTML = "";
    var cityNameTitle = document.createElement("h2");
    var dateNow = moment().format("dddd, MMMM D, YYYY")
    cityNameTitle.innerHTML = data.name + " " + dateNow;
    currentConditionsEl.appendChild(cityNameTitle);

  })
  // .catch(function (error) {
  //   //Notice this '.catch' getting chained onto the end of the 'then()' method
  //   console.log(error);
  //   alert("Unable to connect to OpenWeather");
  // });
}

//fetch coordinates api
function oneCall(lat, lon) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=23d40c242866a0b133662ed347c4e80e'
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      return response.json()
    } else {
      console.log("oneCall error")
    }
  }).then(function (data) {
    console.log(data);

    for (i = 0; i < 5; i++) {
      console.log(data.daily[i].temp.day);

    }
    //display current conditions
    var currentTemp = document.createElement("p");
    currentTemp.innerHTML = "Temp: " + Math.ceil(data.current.temp) + "° F";
    currentConditionsEl.appendChild(currentTemp);

    var currentHumidity = document.createElement("p");
    currentHumidity.innerHTML = "Humidity: " + data.current.humidity + "%";
    currentConditionsEl.appendChild(currentHumidity);

    var currentWind = document.createElement("p");
    currentWind.innerHTML = "Wind: " + Math.ceil(data.current.wind_speed) + " mph";
    currentConditionsEl.appendChild(currentWind);

    var currentUV = document.createElement("p");
    currentUV.innerHTML = "UV Index: " + Math.ceil(data.current.uvi);
    currentConditionsEl.appendChild(currentUV);

 if (data.current.uvi <= 2) {
      currentUV.setAttribute("class","fs-6 rounded-3 text-light bg-success");
     } 
     else if (data.current.uvi < 5) {
      currentUV.setAttribute("class","fs-6 rounded-3 text-light bg-warning");
     }
     else if (data.current.uvi < 7) {
      currentUV.setAttribute("class","fs-6 rounded-3 text-light bg-orange");
     }
     else if (data.current.uvi < 10) {
      currentUV.setAttribute("class","fs-6 rounded-3 text-light bg-danger")
     }
     else {
      currentUV.setAttribute("class","fs-6 rounded-3 text-light bg-purple");
     }
    
      weeklyForecastEL.classList.remove("hidden")
      let dayCards = ``

      for (var i = 0; i < 5; i++) {
        var day = dayjs().add(i + 1, 'day').format('MMM-D-YYYY')
        var symbol = data.daily[i].weather[0].icon
        var temp = data.daily[i].temp.day
        var wind = data.daily[i].wind_speed
        var humidity = data.daily[i].humidity

       
        var newCard = `
        <div class="card col">
        <div class="card-body">
        <p> Date: ${day}</p>
        <img src="http://openweathermap.org/img/wn/${symbol}.png" /> 
        <p> Temp: ${temp}</p>
        <p> Wind: ${wind}</p>
        <p> Humidity: ${humidity}</p>
        </div></div>
        `
        
      dayCards += newCard
    }
weeklyForecastEL.innerHTML = dayCards
  })
  // }).catch(function (error) {
  //   console.log(error);
  //   alert("Unable to connect to OpenWeather");
  // });
};


//add event listeners to the form
cityFormEl.addEventListener("submit", formSubmitHandler);

//add event listeners to buttons
locationButtonsEL.addEventListener("click", buttonClickHandler);







