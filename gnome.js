$(document).ready(function() {

  // Global Tools
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    
  // Render Background
  function renderBackground(type) {
    if (type == "peru") {
      $('#window').append('<div id="peru" class="background">');
    }
  }

  // Render Ground
  function renderGround(type, amount) {
    var totalGrounds = 1;
    if (type == "grass") {
      for (var i = 1; i <= amount; i++) {
        $('#window').append('<div id="ground-' + totalGrounds + '" class="ground ground-grass">');
        $('#ground-' + totalGrounds).css({'left':((totalGrounds - 1) * 475) + 'px'});
        totalGrounds += 1;
      }
    }
  }
  
  // Render Trees
  function renderTrees() {
    renderTree("pine", 1, 100);
    renderTree("pine", 3, 50);
    renderTree("pine", 5, 20);
  }
 
  // Render Tree
  var totalTrees = 0;
  function renderTree(type, groundNumber, treeX) {
    $('#ground-' + groundNumber).append('<div id="tree-' + totalTrees + '" class="tree ' + type + '">');
    var sizeVariance = (getRandomInt(50, 125) / 100 );
    var isFlipped = Boolean(Math.floor(Math.random() * 2));
    $('#tree-' + totalTrees).css({'left':treeX + 'px'});
    if (sizeVariance < 1) {
    }
    if (isFlipped) {
      $('#tree-' + totalTrees).css({'transform': 'scaleX(' + -1 + ')'});
    }
    totalTrees += 1;
  }

  // Render Mushrooms
  mushrooms = [];

  function renderMushrooms(){
    var mushroomCount = 0;
    renderMushroom(1, 100, 100, 13, 1, "magic");
    renderMushroom(2);
    renderMushroom(3);

  function renderMushroom(tree, x, y, z, scale, name) {
    var mushroomNumber = getRandomInt(5, 10);
    for (var i = 0; i < mushroomNumber; i++) {
      varyMushroom();
      var mushroom = {
        id: mushroomCount, 
        x: x,
        y: y,
        z: z,
        scale: scale,
        name: name
      };
      mushrooms.push(mushroom);
      $('#tree-' + (tree - 1)).append('<img id="mushroom-' + mushroomCount + '" class="mushroom" src="assets/mushroom/00' + mushroomFrame + '.png"/>');
      $('#mushroom-' + mushroomCount).css({"left": (mushroomX * i + 10), "bottom": mushroomY });
      mushroomCount += 1;
    }
  }
  
  // Generate mushroom variance
  function varyMushroom() {
    mushroomX = Math.round(Math.random() * 100);
    mushroomY = Math.round(Math.random() * 5 + 15);
    mushroomFrame = getRandomInt(0, 6); 
  }
}

  renderBackground('peru');
  renderGround("grass", 5);
  renderTrees();
  renderMushrooms();
});

// Mushroom Constructor
var mushroomCount = 0;
function Mushroom(x, y, z, scale, name) {
  this.id = mushroomCount;
  this.x = x;
  this.y = y;
  this.z = z;
  this.scale = scale;
  this.name = name;
  mushroomCount += 1;
}

var mushroom = new Mushroom(100, 100, 13, 1, "magic");


// Make function that generates random x,y displacement from baseline nodes and width fluctuations
//
