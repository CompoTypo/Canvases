var bgc = document.getElementById("background");
bgc.width = window.innerWidth;
bgc.height = window.innerHeight;
var bgctx = bgc.getContext("2d");

  ////////////   particles   ///////////////////
  // particle globals
  var particleCount = 400;
  var maxRadius = 3;
  var velocity = 0.1;
  stars = [];

////////////////////// particles functs ///////////////////

function particle() {
  this.x = Math.random() * window.innerWidth;
  this.y = Math.random() * window.innerHeight;
  this.rad = Math.random() * maxRadius;
  this.color = '#000000';
  this.stroke = '#000000';
  this.direction = 0;
  this.dx = 0;
  this.dy = 0;
}

function loadParticles() {
  for (var num = 0; num < particleCount; num++) {
    var star = new particle();

    if (num%3 === 0) {
      star.color = '#FFFFFF';
    } else if (num%3 === 1) {
      star.color = '#EEEEEE';
    } else {
      bgctx.fillStyle = '#DDDDDD';
      star.color = '#DDDDDD';
    }

    if (num%4 === 0) {
      star.stroke = 'rgba(7, 7, 7, 0.5)';
    } else if (num%4 === 1) {
      star.stroke = 'rgba(25, 25, 25, 0.5)';
    } else {
      star.stroke = 'rgba(51, 51, 51, 0.5)';
    }

    star.direction = Math.random * (Math.PI * 2);

    star.dx = Math.random() * velocity;
    star.dy = Math.random() * velocity;

    stars.push(star);
  }
}

function drawParticles() {
  for (var num = 0; num < particleCount; num++) {

    bgctx.fillStyle = stars[num].color;  
    bgctx.strokeStyle = stars[num].stroke;  
    bgctx.lineWidth = 1;
    
    bgctx.beginPath();
    bgctx.arc(stars[num].x, stars[num].y, stars[num].rad, 0, Math.PI * 2, false);
    bgctx.fill();     
    bgctx.stroke();
    bgctx.closePath();  
  }
}

/////////////////   draw   //////////////////
function draw() {
  bgctx.clearRect(0,0, bgc.width, bgc.height);
  drawParticles();

  for (var index = 0; index < stars.length; index++) { // for each star
    // add an x velocity
    if (index%4 === 0) {
      stars[index].x += stars[index].dx;
      stars[index].y += stars[index].dy;
    } else if (index%4 === 1) {
      stars[index].x -= stars[index].dx;
      stars[index].y += stars[index].dy;
    } else if (index%4 === 2) {
      stars[index].x += stars[index].dx;
      stars[index].y -= stars[index].dy;        
    } else {
      stars[index].x -= stars[index].dx;
      stars[index].y -= stars[index].dy;
    }

    if (stars[index].x < 0) {
      stars[index].x = window.innerWidth;
    }

    if (stars[index].x > window.innerWidth) {
      stars[index].x = 0;
    }

    if (stars[index].y < 0) {
      stars[index].y = window.innerHeight;
    }

    if (stars[index].y > window.innerHeight) {
      stars[index].y = 0;
    }

  }
  requestAnimationFrame(draw);

}


loadParticles();
draw();