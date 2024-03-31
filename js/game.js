var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Установка ширины и высоты canvas равными ширине и высоте окна браузер
//cvs.width = window.innerWidth;
//cvs.height = window.innerHeight;
cvs.width = 288*3-20; //фіксований розмір
cvs.height = 512;
// cvs.width = document.getElementById("game-wrapper").clientWidth;
// cvs.height = document.getElementById("game-wrapper").clientHeight;


var procesGame = false;
var xBg = 0;

var bg = new Image();
var bird = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

bg.src="img/bg.png";
bird.src = "img/bird.png";
fg.src="img/fg.png";
pipeUp.src="img/pipeUp.png";
pipeDown.src="img/pipeDown.png";





function draw(){
    for(var i=0; i<4; i++){
        ctx.drawImage(bg, xBg+(bg.width-10)*i, 0,);
    }
    xBg -=1;
    if(xBg <= -bg.width){
        xBg += bg.width-10
    }
    

    for(var i=0; i<4; i++){
        ctx.drawImage(fg, xBg+(fg.width-10)*i, bg.height-fg.height,);
    }
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: "+xBg, 10, cvs.height-50)
    requestAnimationFrame(draw);
}
bg.onload = draw();