var getWeather = function(data) {
    // format the github weather url
    var weatherUrl = "https://weather.openweathermap.org/data/2.5/onecall?lat=34.0522&lon=118.2437&exclude=current&appid=3db667141051263a8c63655d71fb8aef";
  
    // make a request to the url
    fetch(weatherUrl).then(function(response) {
    response.json().then(function(data) {
    console.log(data);
      });
    });
  };
  
getWeather();