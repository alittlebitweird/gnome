
// Global Tools
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
  
// Render Background
function renderBackground(type) {
  if (type == "peru") {
    $('#container').append('<div id="peru" class="background">');
  }
}

// Render Ground
function renderGround(type, amount) {
  grounds = [];
  var totalGrounds = 0;
  if (type == "grass") {
    for (var i = 0; i < amount + 1; i++) {
      var ground = {
        id: totalGrounds,
        type: type,
        x: (475 * i)
      };
      $('#container').append('<div id="ground-' + totalGrounds + '" class="ground ground-grass">');
      $('#ground-' + totalGrounds).css({'left':((totalGrounds) * 475) + 'px'});
      if (i % 2) {
      $('#ground-' + totalGrounds).css({'transform':'scaleX(-1)'});
      }
      totalGrounds += 1;
      grounds.push(ground);
    }
  }
}

// Render Trees
trees = [];
treeCount = 0;
function renderTrees() {
  renderTree("pine", 0, 0);
  renderTree("pine", 1, 20);
  renderTree("pine", 2, 200);
  renderTree("pine", 3, 50);
  renderTree("pine", 4, 0);
  //renderTree("pine-foreground", 1, 100, 50, 15, 2);
}
 
function renderTree(type, ground, x, y, z, scale) {
  // Tree Variance
  var isFlipped = Boolean(Math.floor(Math.random() * 2));
  var  sizeVariance = (getRandomInt(50, 125) / 100 );
  if (isFlipped) { 
    sizeVariance = ((getRandomInt(50, 125) / 100 ) * -1);
  } 
  if (!y) {
    y = -425 * Math.abs(sizeVariance);
  }
  if (scale) {
    sizeVariance = scale;
  }
  var height = Math.abs(992 * sizeVariance);
  var width = Math.abs(528 * sizeVariance);
  
  // Create Tree Object
  var tree = {
    id: treeCount,
    type: type,
    ground: grounds[ground],
    x: grounds[ground].x + x,
    y: y,
    z: z,
    center: (528 / 2),
    scale: sizeVariance,
    isFlipped: isFlipped,
    height: height,
    width: width
  };
  trees.push(tree);
  
  // Render Tree
  $('#container').append('<div id="tree-' + tree.id + '" class="tree ' + tree.type + '">');
  $('#tree-' + tree.id).css({'left': tree.x + 'px', 'top': tree.y + 'px', 'transform': 'scaleX(' + tree.scale + ') scaleY(' + Math.abs(tree.scale) + ')'});
  $('#container').append('<div id="marker-' + tree.id + '" class="marker">');
  $('#marker-' + tree.id).css({'left': tree.x + tree.center - 5 + 'px', 'top': '525px'});
  treeCount += 1;
}

// Render Mushrooms
mushrooms = [];
mushroomCount = 0;
function renderMushrooms(){
  renderMushroom(0);
  renderMushroom(1);
  renderMushroom(2);
  renderMushroom(3);
  renderMushroom(4);
}

function renderMushroom(tree, x, y, z, frame, name) {
  var mushroomNumber = getRandomInt(5, 10);
  for (var i = 0; i < mushroomNumber; i++) {
    varyMushroom();
    // Create Mushroom Object, set tree value to tree object
    var mushroom = {
      id: mushroomCount, 
      tree: trees[tree], 
      x: (trees[tree].center + i * 20 - 475),
      y: 500, 
      z: 12,
      frame: mushroomFrame,
      name: name
    };
    mushrooms.push(mushroom);
    $('#container').append('<img id="mushroom-' + mushroom.id + '" class="mushroom" src="assets/mushroom/00' + mushroom.frame + '.png"/>');
    $('#mushroom-' + mushroom.id).css({"left": mushroom.x, "top": mushroom.y + 'px' });
    mushroomCount += 1;
  }
}
  
// Generate mushroom variance
function varyMushroom() {
  mushroomX = Math.round(Math.random() * 100);
  mushroomY = Math.round(Math.random() * 5 + 15);
  mushroomFrame = getRandomInt(0, 6); 
}

$(document).ready(function() {
  renderBackground('peru');
  renderGround("grass", 5);
  renderTrees();
  renderMushrooms();
});


// Make function that generates random x,y displacement from baseline nodes and width fluctuations
//
