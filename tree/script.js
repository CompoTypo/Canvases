var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var context = c.getContext("2d");

const origin = {
  x: c.width / 2,
  y: c.height / 2
}

const colors = [
  '#39FF14',
  '#1439FF',
  '#0022D9',
  '#3A59FF',
  '#FF1439',
  '#D90022',
  '#FF3A59',
  '#87FF14',
  '#AEFF14',
  '#9600B2',
  '#E03AFF',
  '#E660FF',
  '#EC87FF'
];

addEventListener('resize', function() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function petal() {
  this.x = origin.x;
  this.y = origin.y;
  
}

context.beginPath();
context.moveTo(origin.x, origin.y);
context.bezierCurveTo(20, 60, 60, 20, origin.x, origin.y);

context.lineWidth = 10;
// line color
context.strokeStyle = 'white';
context.stroke();
 

