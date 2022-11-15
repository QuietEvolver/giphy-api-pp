// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
// import Planet from './js/JSFILE.js';

// Business Logic

function getGiphy(search) {
  let request = new XMLHttpRequest();
  // const urlGiphy = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.API_KEY}&limit=5`;

  //javascript, jQuery

const xhr = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.API_KEY}&limit=5`;
// xhr.done(function(data) { console.log("success got data", data); })
            

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, search);
      console.log("success got data", response); 
    } else {
      printError(this, response, search);
    }
  });

  request.open("GET", xhr, true); //urlGiphy
  request.send();
}

// UI Logic

function printElements(apiResponse) {
  // document.querySelector('#showResponse').innerText = `The ${apiResponse.data[1].embed_url}pics in ${apiResponse.data[2].images.looping.mp4} is ${apiResponse.data[2].url}`;

  let imgElement = document.createElement('img')
  imgElement.src = apiResponse.data[0].images.original.url;
  document.querySelector('body').append(imgElement);
}
// ${apiResponse.data[2].images.original.url}

function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const search = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getGiphy(search);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});