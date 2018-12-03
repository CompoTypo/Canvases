window.onload = function() {
  var c = document.getElementById("myCanvas");

  c.width = window.innerWidth;
  c.height = window.innerHeight;
  var ctx = c.getContext("2d");

  var maxFlakes = 200;
  var flakes = [];
  
  for (var index = 0; index < maxFlakes; index++) {
    flakes.push({
      x : Math.random() * c.width,
      y : Math.random() * c.height,
      r : Math.random() * 3 + 7,
      d : Math.random() + 1
    }); 
  }

  var angle = 1;

  function move() {
    for (var index = 0; index < maxFlakes; index++) {
      var flake = flakes[index];
      
      flake.y += Math.pow(flake.d, 2) + 1;
      flake.x += angle;

      if (flake.y > c.height) {
        flakes[index] = {
          x : Math.random() * c.width,
          y : 0,
          r : flake.r,
          d : flake.d
        };
      }
    }

  }

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle='white';
    ctx.beginPath();
    for (var index = 0; index < maxFlakes; index++) {
      var flake = flakes[index];
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true);

      
    }
    ctx.fill();
    move();
    
  }

  setInterval(draw, 10);

};


