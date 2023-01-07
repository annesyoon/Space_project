var apiKey = 'tccpayY3gi83E6rcGTwhuA7aLDHyJy2ZPDOI2tWh'; 

document.addEventListener('DOMContentLoaded', rover);
document.addEventListener('DOMContentLoaded',epic);

function rover(){
  document.querySelectorAll('.input').forEach(occurence => {
    occurence.addEventListener('change', function(event){
      var request = new XMLHttpRequest();
      var date = document.getElementById('datez').value;
      var cam =document.getElementById('camera');
      var cameraName= cam.options[cam.selectedIndex].value;
  
      request.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date='+ date + '&camera=' + cameraName  + '&api_key=' + apiKey, true);
      request.addEventListener('load',function(){
      
       if(request.status >= 200 && request.status < 400){
          var result = JSON.parse(request.responseText);
          document.getElementById('imageStatus').textContent = 'Found';
          document.getElementById('imageID').src = result.photos[0].img_src;
          document.getElementById('landingDate').textContent = result.photos[0].rover.landing_date;
          document.getElementById('camName').textContent = result.photos[0].camera.full_name;
          document.getElementById('solNum').textContent= result.photos[0].sol;
        } 
        else 
        { 
              console.log("Error in network request: " + request.statusText);
         }});
         document.getElementById('imageStatus').textContent = 'No image found, make another request or try a different date';
         request.send(null);
         event.preventDefault();
    })

  });
}

function epic(){

  document.querySelectorAll('.epicimg').forEach(occurence => {
    occurence.addEventListener('change', function(event){
      var request = new XMLHttpRequest();
      var dateIn = document.getElementById('dateVal').value; 
      var date = dateIn.split('-').join('/'); //replace to forward slash
      var img = document.getElementById('color');
      var type = img.options[img.selectedIndex].value;
  
    
  
      request.open('GET', 'https://api.nasa.gov/EPIC/api/' + type + '/date/' + dateIn + '?api_key=' + apiKey, true); //request
      request.addEventListener('load',function(){
       if(request.status >= 200 && request.status < 400){
  
          var result = JSON.parse(request.responseText);
  
          if(typeof(result[0].image) === 'string')
          {
            document.getElementById('imageStatus').textContent = 'Image Found';
            document.getElementById('imageID').src = 'https://epic.gsfc.nasa.gov/archive/' + type + '/' + date + '/png/' + result[0].image + '.png'; //image link
            document.getElementById('imageCaption').textContent = result[0].caption;
            document.getElementById('imageName').textContent=result[0].image;
            document.getElementById('imageDate').textContent= result[0].date;
          }
  
        } 
                else 
                { 
                      console.log("Error in network request: " + request.statusText);
                 }});
              document.getElementById('imageStatus').textContent = 'No image found, make another request or try a different date';
              request.send(null);
              event.preventDefault();
            })
  })

}
