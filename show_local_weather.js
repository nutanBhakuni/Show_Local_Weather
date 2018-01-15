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
    let longi = position.coords.longitude;
    let lati = position.coords.latitude;
    
   // para.innerHTML = "Longitude: " + longi + " " + "Latitude: " + lati;
    
    fetch('https://api.apixu.com/v1/current.json?key=aba9f3d569dd440cb8692516181501&q='+lati+','+longi)
      .then(function(response){
        return response.json();
    }).then(function(data){
      //let image = document.querySelector('img');
      //image.src = data.weather[0].icon;
      console.log(data);
    });
  }
  
  function onError(){
    para.innerHTML = "Unable to retrieve current coordinates.";
  }
})();
