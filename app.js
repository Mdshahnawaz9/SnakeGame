let gameContainer = document.querySelector(".game-container");
let scoreContainer = document.querySelector(".score-container");

let foodx, foody;
let headx =12 , heady = 12;
let velocityX=0, velocityY=0;
let snakeBody = [];
let score =0; 


function generateFood(){
    foodx = Math.floor(Math.random() * 25) + 1;
    foody = Math.floor(Math.random() * 25) + 1;
    for(let i=0; i<snakeBody.length; i++){
        if(snakeBody[i][1] == foody && snakeBody[i][0] == foodx){
            generateFood();
        }
    }

    console.log(foodx);
    console.log(foody);
    
}

function gameOver(){
    headx =12;
    heady =12;
    generateFood();
    velocityX=0; 
    velocityY=0;
    snakeBody = [];
    score =0;
    scoreContainer.innerHTML = "Score: "+score;
    alert("Game Over")
}


function renderGamer(){
    let updateGame = `<div class= "food" style= "grid-area: ${foody}/${foodx};"></div>`;
    if(foodx == headx && heady == foody){
        snakeBody.push([foodx,foody]);
        generateFood();
        score+=10;
        scoreContainer.innerHTML = "score: " +score;
    }

    snakeBody.pop();
    headx+=velocityX;
    heady+=velocityY;
    snakeBody.unshift([headx,heady]);

    if(headx ==0 || heady ==0 || headx== 26 || heady==26){
        gameOver();
    }
    for(let i=1; i<snakeBody.length; i++){
        if(snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]){
            gameOver();
        }
    }


    for(let i =0; i<snakeBody.length; i++){
        updateGame += `<div class= "snake" style= "grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
    }

    
    gameContainer.innerHTML = updateGame;
}

generateFood();
setInterval(renderGamer, 150);


document.addEventListener("keydown", function(e){
    console.log(e.key);
    let key = e.key;
    if(key == "ArrowUp" && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
    }else if(key == "ArrowDown" && velocityY!=-1){
        velocityX = 0;
        velocityY = 1;
    }else if(key == "ArrowLeft" && velocityX!=1){
        velocityY = 0;
        velocityX = -1;   
    }else if(key == "ArrowRight" && velocityX!=-1){
        velocityY = 0;
        velocityX = 1;
    }
})