const rulesBtn=document.getElementById("show");
const closeBtn=document.getElementById("close");
const playBtn=document.getElementById("play");
const rules=document.querySelector(".rules");
const ctx = canvas.getContext("2d");
const high=document.getElementById("h");
const gameTune=new Audio("gameover.mp3");
const collide=new Audio("move.mp3");

rulesBtn.addEventListener("click",()=>{
    document.querySelector(".rules").classList.add("show");
})

closeBtn.addEventListener("click",()=>{
    document.querySelector(".rules").classList.remove("show");
})

const snakeParts=[];

playBtn.addEventListener("click",function()
{
    window.location.reload();
})
let highscore=0;
let score=0;
let it=0;
let tailLength=2;
let snakePart={
    x:0,
    y:0
};
let tileCount=20;
let headX=10;
let headY=10;
let appleX=5;
let appleY=5;
let size=canvas.width/tileCount-2;
let speed=7;
//snake move positions when the key is pressed
let dx=0;
let dy=0;
//game loop

function update()
{
    ctx.clearScreen();
}
function drawGame(){
    changeSnakePosition();
    let result=isGameover();
if(result)
{
    return;
}
    clearScreen();
    
    checkAppleCollision();
    drawApple();
    drawSnake();
    
   
    
    moveSnake();
  
    drawScore();
    if(score>0 && score%5==0)
    {
        speed+=0.08;
    }
    setTimeout(drawGame,1000/speed);
}

function isGameover()
{
    let gameOver=false;
    //wall collision detection
    if(dx===0 && dy===0)
    {
        return false;
    }




    if(headX<0)
    {
        gameOver=true;
    }
    else if(headX === tileCount)
    {
        gameOver=true;
    }

    else if(headY === tileCount)
    {
        gameOver=true;
    }
    else if(headY<0)
    {
        gameOver=true;
    }
    
    for(let i=0;i<snakeParts.length;i++)
    {
        let part={...snakeParts[i]};
        if(part.x===headX && part.y===headY)
        {
            gameOver=true;
            break;
        }
    }

    if(gameOver)
    {
        highScore();
        high.style.display="none";
        gameTune.play();
        
    
    ctx.fillStyle="purple";
        ctx.font="50px Verdana";
        
        ctx.fillText("Game Over",canvas.width/6.5,canvas.height/2);
        playBtn.style.display="block";

    }
    return gameOver;
}
function drawScore()
{

   ctx.fillStyle="white";
   ctx.font="15px Verdana";
   ctx.fillText("Score "+ score,canvas.width-70,13);

}
function clearScreen()
{
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake()
{
    

    ctx.fillStyle="orange";
    for(let i=0;i<snakeParts.length;i++)
    {
       let part={...snakeParts[i]};
    //    console.log(part);
    //    ctx.fillStyle="green";
       ctx.fillRect(part.x*tileCount,part.y*tileCount,size,size);
   }

   snakeParts.push({x:headX,y:headY});
   while(snakeParts.length > tailLength)
   {
    snakeParts.shift();
   }



   ctx.fillStyle="green";
    ctx.fillRect(headX*tileCount,headY*tileCount,size,size);
}

function changeSnakePosition()
{
    headX+=dx;
    headY+=dy;
}



function drawApple()
{
    
    ctx.fillStyle="red";
     ctx.fillRect(appleX*tileCount,appleY*tileCount,size-2,size-2);
}
function checkAppleCollision(){
    //if snake and apple are at same position
   if(headX===appleX && headY===appleY)
   {
    collide.play();
    appleX=Math.floor(Math.random() * tileCount);

    appleY=Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
     
   }

}
// ArrowUp
// ArrowDown
//ArrowLeft
//ArrowRight

function moveSnake()
{
    document.addEventListener("keydown",function(e)
    {
        if(e.key==="ArrowUp")
        {
            if(dy==1)
            {
                return;
            }
             dx=0;
             dy=-1;
        }
        else if(e.key==="ArrowDown")
        {
            if(dy==-1)
            {
                return;
            }
             dx=0;
             dy=1;
        }
        else if(e.key==="ArrowLeft")
        {
            if(dx==1)
            {
                return;
            }
             dx=-1;
             dy=0;
        }
        else if(e.key==="ArrowRight")
        {
            if(dx==-1)
            {
                return;
            }
             dx=1;
             dy=0;
        }
    });

}

function highScore()
{
    
    let s=localStorage.getItem("high");
    JSON.parse(s);
    if(s!=="")
    {
        highscore=s;
    }

        if(highscore<score)
        {
            
            localStorage.setItem("high",JSON.stringify(score));
        }
    return s;
}

// let text=document.createElement("h2");

// text.textContent=highScore();
high.innerHTML+=` ${highScore()} `;
high.style.color="white";
high.style.position="absolute";
high.style.top="90px";

canvas.style.marginTop="40px";


drawGame(); 


