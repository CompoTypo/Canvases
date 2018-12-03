(function () {
    // button vars
    var upPressed = false;
    var downPressed = false;
    var anyPressed = false;

    document.addEventListener("keydown", (e) => {
        if (e.keyCode == 38) {
            upPressed = true;
        } else if (e.keyCode == 40) {
            downPressed = true;
        }
        anyPressed = true;
    });

    document.addEventListener("keyup", (e) => {
        if (e.keyCode == 38) {
            upPressed = false;
        } else if (e.keyCode == 40) {
            downPressed = false;
        }
        anyPressed = false;
    });

    window.addEventListener('resize', (e) => {
        fg.width = window.innerWidth
        fg.height = window.innerHeight
        bg.width = window.innerWidth
        bg.height = window.innerHeight
        fgctx.clearRect(0, 0, fg.width, fg.height);
        loadPaddlesAndPong();

    })
    ////////////   background ctx   ////////////////////
    var bg = document.getElementById("background");
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;
    var bgctx = bg.getContext("2d");


    //////////////  foreground ctx   ////////////////////
    var fg = document.getElementById("foreground");
    fg.width = window.innerWidth;
    fg.height = window.innerHeight;
    var fgctx = fg.getContext("2d");


    /////////////// GAME VARS //////////////////////
    var scoreLeft = 0;
    var scoreRight = 0;

    var paddleHeight = fg.height / 5;
    var paddleWidth = fg.width / 30;
    var paddle1Velocity = 12;
    var paddleBoundTop = 0;
    var paddleBoundBottom = window.innerHeight - paddleHeight;
    
    var rise = Math.random()
    var run = Math.random()
    var hyp = Math.sqrt((rise*rise) + (run*run))

    function Paddle(x, y, aiBased = false) {
        this.x = x;
        this.y = y;
        this.color = 'rgb(255,255,255)';
        this.stroke = 'rgb(255,255,255)';
        this.ai = aiBased

        this.drawPaddle = function () {
            fgctx.fillStyle = this.color;
            fgctx.strokeStyle = this.stroke;
            fgctx.lineWidth = 1;
            fgctx.beginPath();
            fgctx.rect(this.x, this.y, paddleWidth, paddleHeight);
            fgctx.fill();
            fgctx.stroke();
            fgctx.closePath();
        }

        this.updatePaddle = function () {
            if (this.ai) {
                
            } else {
                if (upPressed) {
                    this.y -= paddle1Velocity;
                }
                if (downPressed) {
                    this.y += paddle1Velocity;
                }

                if (this.y >= paddleBoundBottom) {
                    this.y = paddleBoundBottom
                }
                if (this.y <= paddleBoundTop) {
                    this.y = paddleBoundTop;
                }
            }
        }
    }
    
    function Pong() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.rad = window.innerWidth /50;
        this.color = '#ffffff';
        this.stroke = '#ffffff';
        this.velocity = 8;

        var velX = (run/hyp) * this.velocity;
        var velY = (rise/hyp) * this.velocity;
        this.dx = velX;
        this.dy = velY;

        this.drawPong = function() {
            fgctx.fillStyle = this.color;
            fgctx.strokeStyle = this.stroke;
            fgctx.lineWidth = 1;
            fgctx.beginPath();
            fgctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
            fgctx.fill();
            fgctx.stroke();
            fgctx.closePath();
        }

        this.updatePong = function() {

            if (this.y <= 0 + this.rad || this.y >= window.innerHeight - this.rad) {
                this.dy *= -1;
            } 

            if (this.x <= 0 - this.rad || this.x >= window.innerWidth + this.rad) {
                this.x = window.innerWidth / 2;
                this.y = window.innerHeight / 2;        
            }

            this.x += this.dx;
            this.y += this.dy;
        }
    }

    paddles = [];
    pong = [];
        function loadPaddlesAndPong() {
        var ball = new Pong();
        var paddle1 = new Paddle(0, fg.height / 2 - paddleHeight / 2);
        var paddle2 = new Paddle(fg.width - paddleWidth, fg.height / 2 - paddleHeight / 2, true);
        paddles.push(paddle1);
        paddles.push(paddle2);
        pong.push(ball);

        bgctx.fillStyle = 'rgb(0,0,0)';
        bgctx.fillRect(0, 0, bg.width, bg.height);
    }

    function draw() {
        fgctx.clearRect(0, 0, fg.width, fg.height);

        pong[0].drawPong();
        paddles[0].drawPaddle();
        paddles[1].drawPaddle();
        pong[0].updatePong();
        paddles[0].updatePaddle();
        paddles[1].updatePaddle();

        // if pong hits face of right paddle
        if (pong[0].x + pong[0].rad >= paddles[1].x) {
            if (pong[0].y > paddles[1].y && pong[0].y < paddles[1].y + paddleHeight) {
                pong[0].dx *= -1;
            }
        }
        // if pong hits face of left paddle
        if (pong[0].x - pong[0].rad <= paddles[0].x + paddleWidth) {
            if (pong[0].y > paddles[0].y && pong[0].y < paddles[0].y + paddleHeight) {
                pong[0].dx *= -1;
            }
        }

        // if pong hits corners of right paddle
        if (pong[0].y  + pong[0].rad === paddles[1].y || pong[0].y + pong[0].rad === paddles[1].y + paddleHeight) {
            console.log('right paddle corner hit')
        }
    
        // if pong hits corners of left paddle
        if (pong[0].y + pong[0].rad === paddles[0].y || pong[0].y + pong[0].rad === paddles[0].y + paddleHeight) {
            console.log('left paddle corner hit')
        }

        requestAnimationFrame(draw);
    }

    loadPaddlesAndPong(); // init
    draw();

})();