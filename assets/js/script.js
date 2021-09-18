var cityFormEl = document.querySelector("#user-form");
var locationButtonsEL = document.querySelector('#locations-buttons')
var cityInputEl = document.querySelector("#cityNameInput");
var cityContainerEl = document.querySelector("#conditions-container");
var citySearchTerm = document.querySelector("#conditions-search-term");


var formSubmitHandler = function (event) {
  event.preventDefault();

  //iterate through response data
  var cityNameInput = cityInputEl.value.trim();

  if (cityNameInput) {
    getWeather(cityNameInput);
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
    getWeather(cityButtons);
  }
};

//fetch coordinates api
function oneCall(lat, lon) {
var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon + '&units=imperial&appid=23d40c242866a0b133662ed347c4e80e'
fetch(apiUrl).then(function (response) {
  if (response.ok) {
    return response.json()
  } else { 
  console.log("oneCall error")
  }
}).then(function (data) {
  console.log(data);

  for (i=0; i< 5; i++) {
    console.log(data.daily[i].temp.day);

  }

}).catch(function (error) {
  //Notice this '.catch' getting chained onto the end of the 'then()' method
  console.log(error);
  alert("Unable to connect to OpenWeather");
});

}

//fetch City API
var getWeather = function (city) {
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

    //display current conditions
    var currentConditionsEl = document.querySelector(".cityCurrentConditions");
    currentConditionsEl.innerHTML = "";

    var cityNameTitle = document.createElement("h2");
    var dateNow = moment().format("dddd, MMMM D, YYYY")
    cityNameTitle.innerHTML = data.name + " " + dateNow;
    currentConditionsEl.appendChild(cityNameTitle);

    var cityTemp = document.createElement("p");
    cityTemp.innerHTML = "Temp: " + data.main.temp;
    currentConditionsEl.appendChild(cityTemp);

    var cityHumidity = document.createElement("p");
    cityHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";
    currentConditionsEl.appendChild(cityHumidity);
    
    var cityWind = document.createElement("p");
    cityWind.innerHTML = "Wind: " + Math.ceil(data.wind.speed) + " mph";
    currentConditionsEl.appendChild(cityWind);

  })
    // .catch(function (error) {
    //   //Notice this '.catch' getting chained onto the end of the 'then()' method
    //   console.log(error);
    //   alert("Unable to connect to OpenWeather");
    // });
}











// var displayWeather = function (conditions, searchTerm) {
//   //check if api returned any repos
//   if (conditions.length === 0) {
//     cityContainerEl.textContent = "No city found.";
//   }

//   console.log(conditions);
//   console.log(searchTerm);

//   //clear old content
//   cityContainerEl.textContent = "";
//   citySearchTerm.textContent = searchTerm;

//   //format condition name
//   var conditionsName = conditions[i].owner.login + "/" + conditions[i].name;

//   //create a container for each conditions
//   var conditionsEl = document.createElement("div");
//   conditionsEl.classList = "list-item flex-row justify-space-between align-center";

//   //create a span element to hold conditions name
//   var titleEl = document.createElement("span");
//   titleEl.textContent = conditionsName;

//   //apend to container 
//   conditionsEl.appendChild(titleEl);

//   //append container to the dom
//   conditionsContainerEl.appendChild(conditionsEl)


// };

//add event listeners to the form
cityFormEl.addEventListener("submit", formSubmitHandler);

//add event listeners to buttons
locationButtonsEL.addEventListener("click", buttonClickHandler);




/*

api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon + '&units=imperial&appid=23d40c242866a0b133662ed347c4e80e'

'https://api.openweathermap.org/data/2.5/weather?q=' + city +"&appid=23d40c242866a0b133662ed347c4e80e"

var getWeather = function (cityNameInput) {
  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput +"&units=imperial&appid=23d40c242866a0b133662ed347c4e80e'
fetch(weatherUrl)
  .then(response => response.json())
  .then(response) => {
    var responseContainerEL = $("#response-container"),
    var cityWeather = $("<div />").attr("src", response.city.name);
    responseContainerEL.append(cityWeather);
  };

fetch('https://api.openweathermap.org/data/2.5/forecast?q={cityNameInput}&appid=23d40c242866a0b133662ed347c4e80e')
.then((res) => res.json())
.then((res) => console.log(res))

fetch('api.openweathermap.org/data/2.5/forecast?q=London&appid=23d40c242866a0b133662ed347c4e80e')
.then((res) => res.json())
.then((res) => console.log(res))
//
//});*/





















/*
var responseContainerEL = $("#response-container"),
    var cityWeather = $("<div />").attr("src", {'city'});
    responseContainerEL.append(cityWeather);

//link submitted city to API



//Add event listeners to the city buttons
var getWeather = function() {
  // format the github weather url
  var weatherUrl = "api.openweathermap.org/data/2.5/weather?q=London&appid=3db667141051263a8c63655d71fb8aef"
  //"api.openweathermap.org/data/2.5/weather?q=" + cityNameInput +"&appid=3db667141051263a8c63655d71fb8aef"


  // make a request to the url
  fetch(weatherUrl).then(function(response) {
  response.json().then(function(data) {
  console.log(data);
    });
  });
};
*/