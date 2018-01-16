(function(){
  let temp = document.querySelector('.temperature');
  let place = document.querySelector('.place');
  let condition = document.querySelector('.condition');
  let curr_date = document.querySelector('.current-date');
  let image = document.querySelector('img');
  let humidity = document.querySelectorAll('.current-humidity span');
  let wind_speed = document.querySelectorAll('.current-wind-speed span');
  let btn_unit = document.querySelector('.btn-unit');
  let weather_data;
  let todayDate;
  
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  if(!navigator.geolocation){
    //para.innerHTML = "Sorry, geolocation is not supported by your browser";
  }
  else{
    //para.innerHTML = "Retrieveing Coordinates...";
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }
  
  function onSuccess(position){
    let longi = position.coords.longitude;
    let lati = position.coords.latitude;
    
    fetch('https://api.apixu.com/v1/current.json?key=aba9f3d569dd440cb8692516181501&q='+lati+','+longi)
      .then(function(response){
        return response.json();
    }).then(function(data){
     
      weather_data = data;
      condition.innerHTML = data.current.condition.text;
      temp.innerHTML = data.current.temp_c ;
      place.innerHTML =  data.location.name + ", " + data.location.country;
      image.src = data.current.condition.icon;
      humidity[1].innerHTML = data.current.humidity;
      wind_speed[1].innerHTML = data.current.wind_kph + " kph";

      //changes format of current date for display
      todayDate = data.current.last_updated.substr(0,10);
      let date = new Date(todayDate);
      curr_date.innerHTML = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    });
  }
  
  function onError(){
    temp.innerHTML = "Unable to retrieve current coordinates.";
  }

  function changeTempUnit(){
    if(btn_unit.innerHTML == "Fahrenheit"){
      btn_unit.innerHTML = "Celsius";
      temp.innerHTML = weather_data.current.temp_f;
      wind_speed[1].innerHTML = weather_data.current.wind_mph + " mph";
    }
    else{
      btn_unit.innerHTML = "Fahrenheit";
      temp.innerHTML = weather_data.current.temp_c;
      wind_speed[1].innerHTML = weather_data.current.wind_kph + " kph";
    }

      temp.classList.toggle('celsius');
      temp.classList.toggle('fahrenheit');
  }

  btn_unit.addEventListener('click', changeTempUnit);
})();