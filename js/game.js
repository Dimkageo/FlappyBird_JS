var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Установка ширины и высоты canvas равными ширине и высоте окна браузер
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
var kx = Math.floor(cvs.width);
var ky = Math.floor(cvs.height);
var kz = kx/kx;

// ---
var bg = new Image();
var bird = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();
var buttonPlay = new Image();
var fly = new Audio();
var score_audio = new Audio();
//---
var procesGame = false;
var xBg = 0;
var gap=cvs.height/15*4; //ворота
var pipe = [];
//----
pipe[0]={
    x: cvs.width,
    y: 0
}

function init() {
    loadAssets();

    draw();
}


function moveUp(){
    if(!procesGame){
        procesGame = true;
    }
    if(procesGame){
        fly.play();
        yPos -= 25;
    }
}

function draw(){
    for(var i=0; i<5; i++){
        ctx.drawImage(bg, xBg+bg.height*kz*i, 0, bg.height*kz, ky);
    }

    if(procesGame){
        xBg = (xBg <= -bg.height*kz) ? xBg + (bg.height*kz) : xBg - 1;

        ctx.drawImage(bird, 100, 100, cvs.height/12, cvs.height/15);

        // ctx.drawImage(pipeDown, 100, 100,);
        for(var i=0; i<pipe.length; i++){
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y, cvs.width/15, cvs.height*8/10-gap);
            ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + cvs.height*8/10,cvs.width/15, cvs.height*8/10-gap);
            pipe[i].x--;

            if(pipe[i].x == Math.floor(kx-(cvs.height*8/10-gap+cvs.width/15))){//новое препятствие
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random()*(cvs.height*8/10-gap))-(cvs.height*8/10-gap)
                })
            }
        }
    }else{
        ctx.drawImage(buttonPlay, cvs.width/2-buttonPlay.width/2, cvs.height/2-buttonPlay.height/2,);
    }
    

   // --- Fg ---
    for(var i=0; i<5; i++){
        // ctx.drawImage(bg, xBg+bg.height*kz*i, 0, bg.height*kz, ky);
        ctx.drawImage(fg, xBg+(bg.height*kz)*i, ky*8/10, bg.height*kz, ky*2/10);
    }
    // --- Text ---
    ctx.fillStyle = "#000";
    ctx.font = "24px mon";
    ctx.fillText("Score: "+xBg, 30, ky-ky*1/10+12)
    requestAnimationFrame(draw);
}
// При нажатии на какую либо кнопку
document.addEventListener("keydown", moveUp);
document.addEventListener("touchstart", moveUp);//реакция на касание экрана
document.addEventListener("click", moveUp);//реакция на клик мыши

// Загрузка изображений и звуков
function loadAssets(){
    bg.src="img/bg.png";
    bird.src = "img/bird_frame1.png";
    fg.src="img/fg.png";
    pipeUp.src="img/pipe_up.png";
    pipeDown.src="img/pipe_down.png";
    buttonPlay.src="img/button_play.png";

    fly.src = "audio/fly.mp3";
    score_audio.src = "audio/score.mp3";
}
// Вызываем функцию инициализации при загрузке страницы
window.onload = init();