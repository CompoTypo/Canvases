(function() {
  var bg = document.getElementById("background");
  bg.width = window.innerWidth;
  bg.height = window.innerHeight;
  var bgctx = bg.getContext("2d");

  bgctx.fillStyle='rgb(51, 51, 51)'; //background
  bgctx.fillRect(0,0, bg.width, bg.height); //background

  ///////////////////////////////////////////////////

  var fg = document.getElementById("foreground");
  fg.width = window.innerWidth;
  fg.height = window.innerHeight;
  var fgctx = fg.getContext("2d");

  lightshade = 'rgb(255,255,255)';
  medshade = 'rgb(230, 230, 230)';
  darkshade = 'rgb(211, 211, 211)';
  var shades = [lightshade, medshade, darkshade];

  particleCount = 400;
  maxRadius = 3;

  function drawParticles() {
    for (var particle = 0; particle < particleCount; particle++) {
      var x = Math.random() * window.innerWidth;
      var y = Math.random() * window.innerHeight;
      var rad = Math.random() * maxRadius;

      if (particle%3 === 0) {
        fgctx.fillStyle = '#FFFFFF';  
      } else if (particle%3 === 1) {
        fgctx.fillStyle = '#EEEEEE';
      } else {
        fgctx.fillStyle = '#DDDDDD';
      }

      fgctx.beginPath();
      fgctx.arc(x, y, rad, 0, Math.PI * 2, false);
      fgctx.fill();     
      fgctx.closePath();
          
      
      console.log(fgctx.fillStyle);
            
    }
  }

  function draw() {
    drawParticles();
    
    requestAnimationFrame(draw);
  }

  draw();

})();
