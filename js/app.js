'use strict';

Products.productImages = [];
var totalClicks = 0;
var maxClicks = 25;
var clicksArray = [];
var name1 = document.getElementById('name1');
var image1 = document.getElementById('image1');
var name2 = document.getElementById('name2');
var image2 = document.getElementById('image2');
var name3 = document.getElementById('name3');
var image3 = document.getElementById('image3');


function Products(name, image, clicks = 0, timesShown = 0, previouslySeen = false) {
  this.name = name;
  this.image = image;
  this.clicks = clicks;
  this.timesShown = timesShown;
  this.previouslySeen = previouslySeen;
  Products.productImages.push(this);
}

//retrieving votes from local storage
if (localStorage.productData) {
  var allProductsString = localStorage.getItem('productData');
  var allProductsData = JSON.parse(allProductsString);
  for (var i = 0; i < allProductsData.length; i++) {
    var oldData = allProductsData[i];
    new Products(oldData.name, oldData.image, oldData.clicks, oldData.timesShown, oldData.previouslySeen)
  }
} else {
  new Products('bag', 'images/bag.jpg');
  new Products('banana', 'images/banana.jpg');
  new Products('bathroom', 'images/bathroom.jpg');
  new Products('boots', 'images/boots.jpg');
  new Products('breakfast', 'images/breakfast.jpg');
  new Products('bubblegum','images/bubblegum.jpg');
  new Products('chair','images/chair.jpg');
  new Products('cthulhu','images/cthulhu.jpg');
  new Products('dog-duck','images/dog-duck.jpg');
  new Products('dragon','images/dragon.jpg');
  new Products('pen','images/pen.jpg');
  new Products('pet-sweep','images/pet-sweep.jpg');
  new Products('scissors','images/scissors.jpg');
  new Products('shark','images/shark.jpg');
  new Products('sweep', 'images/sweep.png');
  new Products('tauntaun', 'images/tauntaun.jpg');
  new Products('unicorn', 'images/unicorn.jpg');
  new Products('usb', 'images/usb.gif');
  new Products('water-can', 'images/water-can.jpg');
  new Products('wine-glass', 'images/wine-glass.jpg');
}


function showRandomImage() {
  var randomImage = Math.floor(Math.random()* Products.productImages.length);
  return randomImage;
}

function renderImages() {

  // check random numbers are not equal and previous flag = false

  var index1 = showRandomImage();
  var index2 = showRandomImage();
  while (Products.productImages[index1].previouslySeen === true) {
    index1 = showRandomImage();
  }
  while (index1 === index2 || Products.productImages[index2].previouslySeen === true) {
    index2 = showRandomImage();
  }

  var index3 = showRandomImage();
  while (index3 === index1 || index3 === index2 || Products.productImages[index3].previouslySeen === true) {
    index3 = showRandomImage();
  }
  // with 3 values wipes this clean

  for (var i = 0; i < Products.productImages.length; i++){
    Products.productImages[i].previouslySeen = false;
  }

  Products.productImages[index1].timesShown++;
  Products.productImages[index2].timesShown++;
  Products.productImages[index3].timesShown++;
  //updating to previously seen as true
  console.log(Products.productImages[index1].timesShown);
  Products.productImages[index1].previouslySeen = true;
  Products.productImages[index2].previouslySeen = true;
  Products.productImages[index3].previouslySeen = true;

  var product1 = Products.productImages[index1];
  var product2 = Products.productImages[index2];
  var product3 = Products.productImages[index3];

  product1.id = product1.name;
  name1.textContent = product1.name;
  image1.src = product1.image;
  product2.id = product2.name;
  name2.textContent = product2.name;
  image2.src = product2.image;
  product3.id = product3.name;
  name3.textContent = product3.name;
  image3.src = product3.image;
}

//create an element go through 4 loop that goes through product array
//flags- in constructor function add property- this.previouslySeen

function handleClick(event) {
  event.preventDefault();
  var clickedItems = event.target.attributes[1].value;
  console.log(totalClicks, 'totalClickCount');
  if (totalClicks === maxClicks) {
    image1.removeEventListener('click', handleClick);
    image2.removeEventListener('click', handleClick);
    image3.removeEventListener('click', handleClick);
    image1.style.display = 'none';
    image2.style.display = 'none';
    image3.style.display = 'none';
    displayItemResults();
    displayTimesShown();
    storedClicks();
    renderChart();
  }
  localStorage.setItem('productData', JSON.stringify(Products.productImages));

  totalClicks++;
  for (var i = 0; i < Products.productImages.length; i++) {
    if (Products.productImages[i].image === clickedItems){
      Products.productImages[i].clicks += 1;
      console.log(Products.productImages[i].clicks);
    }
  }
  renderImages();
}


function displayItemResults() {
  var listElements = document.getElementById('displayProducts');
  for (var i = 0; i < Products.productImages.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = Products.productImages[i].clicks + 'clicks for' + Products.productImages[i].name;
    listElements.appendChild(listItem);
  }
}

function displayTimesShown() {
  var ulElement = document.getElementById('displayProducts');
  for (var i = 0; i < Products.productImages.length; i ++) {
    var ulItem = document.createElement('li');
    ulItem.textContent = Products.productImages[i].timesShown + 'times shown for' + Products.productImages[i].name;
    ulElement.appendChild(ulItem);
  }
}

image1.addEventListener('click', handleClick);
image2.addEventListener('click', handleClick);
image3.addEventListener('click', handleClick);
renderImages();
//function to loop through all products to create the chart
function renderChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var namesArray = [];
  var timesProductShown = [];
  for (var i = 0; i < Products.productImages.length; i++) {
    clicksArray[i] = Products.productImages[i].clicks;
    namesArray[i] = Products.productImages[i].name;
    timesProductShown[i] = Products.productImages[i].timesShown;
    console.log(clicksArray);
  }
  storedClicks();

  //Creates a bar chart via ChartJS
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,

      datasets: [{
        label:'# of Votes',

        data: clicksArray,
        backgroundColor: [
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
        ],
        borderColor: [
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
        ],
        borderWidth: 1
      },
      {
        label: 'number of times shown',
        data: timesProductShown,
        backgroundColor: [
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
        ],
        borderColor: [
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
          ' rgb(135, 60, 114)',
          'rgb(85, 29, 138)',
          ' rgb(49, 49, 186)',
          'rgb(223, 126, 232)',
        ],
        borderWidth: 1
      }]
    },
    option: {
      maintainAspectRatio: false,
      responsive: false,
      scales: {
        yAxes:[{
          ticks: {
            max: 20,
            min: 0,
            stepSize: 1
          }
        }]
      }
    }
  });
}
//stores clicks in localStorage
function storedClicks() {
  var arrayStoredClicks = JSON.stringify(clicksArray);
  localStorage.setItem('voterClicks', arrayStoredClicks);
 
}

console.log(allProductsData);

