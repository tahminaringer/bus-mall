'use strict';

var productImages = [];
var totalVotes; 0;
var maxVotes; 25;

var productList = document.getElementById('productList').select;
var product1 = document.getElementById('product1');
var name1 = document.getElementById('name1');
var image1 = document.getElementById('image1');
var count1 = document.getElementById('count1');
var product2 = document.getElementById('product2');
var name2 = document.getElementById('name2');
var image2 = document.getElementById('image2');
var count2 = document.getElementById('count2');
var product3 = document.getElementById('product3');
var name3 = document.getElementById('name3');
var image3 = document.getElementById('image3');
var count3 = document.getElementById('count3');


function Products(name, image) {
  this.name = name;
  this.image = image;
  this.votes = 0;
  this.timesShown = 0;
  productImages.push(this);
}
// console.log(Products);

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

function showRandomImage() {
  var randomImage = Math.floor(Math.random()* productImages.length);
  return randomImage;
}
// console.log(showRandomImage);

var index1 = showRandomImage();
var index2 = showRandomImage();
var index3 = showRandomImage();

var product1 = productImages[index1];
var product2 = productImages[index2];
var product3 = productImages[index3];

product1.id = product1.name;
name1.textContent = product1.name;
image1.src = product1.image;
product2.id = product2.name;
name2.textContent = product2.name;
image2.src = product2.image;
product3.id = product3.name;
name3.textContent = product3.name;
image3.src = product3.image;

function handleClick(event) {
  var userVotes = productList.addEventListener('click', handleClick);
  userVotes += 1;
  if (userVotes > 25)
    productList.removeEventListener('click', handleClick);
//   console.log(handleClick);

  var product = event.target.parentElement.getAttribute('id');

  for (var i = 0; i < productList.length; i++) {
    if(product === productList[i].name) {
      productList[i].votes+=1;
      event.target.parentElement.children[3].textContent = productList[i].votes;
    }
}
return userVotes;
}
// document.getElementById("productlist").select();
// Products.prototype.render = function() {
//     var
// }