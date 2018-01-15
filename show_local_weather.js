(function(){
  let para = document.querySelector('p');
  
  if(!navigator.geolocation){
    para.innerHTML = "Sorry, geolocation is not supported by your browser";
  }
  else{
    para.innerHTML = "Retrieveing Coordinates...";
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  
  function onSuccess(position){
    let longi = 33.8688//position.coords.longitude;
    let lati = 151.2093//position.coords.latitude;
    
   // para.innerHTML = "Longitude: " + longi + " " + "Latitude: " + lati;
    
    fetch('https://fcc-weather-api.glitch.me/api/current?lat=' + lati + '&lon=' + longi)
      .then(function(response){
        return response.json();
    }).then(function(data){
      let image = document.querySelector('img');
      image.src = data.weather[0].icon;
    });
  }
  
  function onError(){
    para.innerHTML = "Unable to retrieve current coordinates.";
  }
})();
