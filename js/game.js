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
var bird = [];
bird[0] = new Image();
bird[1] = new Image();
bird[2] = new Image();
bird[3] = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeDown = new Image();
var buttonPlay = new Image();
var game_over = new Image();
var fly = new Audio();
var score_audio = new Audio();
//---
var procesGame = false;
var gameOver = false;
var xBg = 0;
var gap=cvs.height/15*5; //ворота
var pipe = [];
//----
pipe[0]={
    x: cvs.width,
    y: 0
}
var score = 0;
// Position bird
var xPos = ky/8;
var yPos = ky/8;
var grav = 1.5;
var b = 0;


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
        if(yPos > cvs.height/9){
            yPos -= cvs.height/9;
        }
    }
    if(gameOver){
        location.reload();//перезагрузка страницы
    }
}

function draw(){
    for(var i=0; i<5; i++){
        ctx.drawImage(bg, xBg+bg.height*kz*i, 0, bg.height*kz, ky);
    }

    if(procesGame){
        xBg = (xBg <= -bg.height*kz) ? xBg + (bg.height*kz) : xBg - 1;

        // ctx.drawImage(bird, xPos, yPos, cvs.height/12, cvs.height/15);

        for(var i=0; i<pipe.length; i++){
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y, cvs.width/15, cvs.height*8/10-gap);
            ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + cvs.height*8/10,cvs.width/15, cvs.height*8/10-gap);
            pipe[i].x--;
                //новое препятствие
            if(pipe[i].x == Math.floor(kx-(cvs.height*8/10-gap+cvs.width/15))){
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random()*(cvs.height*8/10-gap))-(cvs.height*8/10-gap)
                })
            }

            // Отслеживание касания птицей препятствия
            if(xPos + cvs.height/12 >= pipe[i].x 
                && xPos <= pipe[i].x+cvs.width/15 
                && (yPos <= pipe[i].y+(cvs.height*8/10-gap) 
                || yPos + cvs.height/15 >= pipe[i].y+cvs.height*8/10)
                || yPos + cvs.height/15 >= (ky-ky*2/10)){
                procesGame = false; 
                gameOver = true;   
                
            }

            // Очки = скорость
            if(Math.floor(pipe[i].x) == 5){
                score_audio.play();
                score++;
            }
        }
        // --- bird ---
    ctx.drawImage(bird[b], xPos, yPos,  cvs.height/12, cvs.height/15);
    b++;
    yPos += grav;
    if(b==4){b = 0}
    }else if(!procesGame && !gameOver){
   
        ctx.drawImage(buttonPlay, cvs.width/2-buttonPlay.width/2, cvs.height/2-buttonPlay.height/2,);
    }else {
        ctx.drawImage(game_over, cvs.width/2-game_over.width/2, cvs.height/2-game_over.height/2,);
    }
    

   // --- Fg ---
    for(var i=0; i<5; i++){
        ctx.drawImage(fg, xBg+(bg.height*kz)*i, ky*8/10, bg.height*kz, ky*2/10);
    }
    
    // --- Text ---
    ctx.fillStyle = "#000";
    ctx.font = "24px mon";
    ctx.fillText("Score: "+score, 50, ky-ky*1/10+12);
    requestAnimationFrame(draw);
}
// При нажатии на какую либо кнопку
document.addEventListener("keydown", moveUp);
// document.addEventListener("touchstart", moveUp);//реакция на касание экрана
document.addEventListener("click", moveUp);//реакция на клик мыши

// Загрузка изображений и звуков
function loadAssets(){
    bg.src="img/bg.png";
    bird[0].src = "img/bird_frame1.png";
    bird[1].src = "img/bird_frame2.png";
    bird[2].src = "img/bird_frame3.png";
    bird[3].src = "img/bird_frame4.png";
    fg.src="img/fg.png";
    pipeUp.src="img/pipe_up.png";
    pipeDown.src="img/pipe_down.png";
    buttonPlay.src="img/button_play.png";
    game_over.src="img/gameover.png";

    fly.src = "audio/fly.mp3";
    score_audio.src = "audio/score.mp3";
}
// Вызываем функцию инициализации при загрузке страницы
window.onload = init();
