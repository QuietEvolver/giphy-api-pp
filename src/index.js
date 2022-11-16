// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
// import Planet from './js/JSFILE.js';

// Business Logic

function getGiphy(search) {
  let request = new XMLHttpRequest();

const xhr = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.API_KEY}&limit=5`;

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

function getTrending() {
  let request = new XMLHttpRequest();

const url = `http://api.giphy.com/v1/gifs/trending?&api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printTrending(response);
      console.log("success got data", response); 
    } else {
      printError(this, response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function getRandom(){
  let request = new XMLHttpRequest();

  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=&rating=g`;

  request.addEventListener("loadend", function(){
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printRandom(response);
      console.log("random OK: ", response);
    } else {
      printError(this, response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printElements(apiResponse) {

  let imgElement = document.createElement('img')
  imgElement.src = apiResponse.data[0].images.original.url;
  document.querySelector('body').append(imgElement);
}

function printTrending(apiResponse) {
  let imgElement = document.createElement('img')
  imgElement.src = apiResponse.data[0].images.original.url;
  document.querySelector('body').append(imgElement);
}

function printRandom(apiResponse){
  let imgElement = document.createElement('img');
  imgElement.src = apiResponse.data.images.original.url;
  document.querySelector('body').append(imgElement);
}

function printError(request, apiResponse) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the trending gifs ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const search = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getGiphy(search);
}
function handleTrendingClick(){
  getTrending();
}

function handleRandomClick(){
  getRandom();
}
window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
  document.querySelector("button#trending-button").addEventListener("click", handleTrendingClick);
  document.querySelector("button#random-button").addEventListener("click", handleRandomClick);
});