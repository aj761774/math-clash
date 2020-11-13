const grid = document.getElementById("bottomPart");
const randomNo = document.getElementById("randomNo");
const gameContainer = document.getElementById("gameContainer");
let intervalId = null,flag = false;
let currentSum = 0,requiredSum = 0;
const score  = document.getElementById("score");
const userCalculation = document.getElementById("userCalculation");
const start = document.getElementById("start");
const msgScoreContainer = document.getElementById("msg-score-container");
const currentScore = document.getElementById("currentScore");

let selected = [];
let gridArr = [],count =0;

const clickAudio = new Audio("blue.mp3");
const successAudio = new Audio("green.mp3");
const gameOverAudio = new Audio("wrong.mp3");

for(let i=0;i<36;i++){
    gridArr[i] = "";
    selected[i] = false;
}

const createGrid = ()=>{
   
    for(let i=0;i<gridArr.length;i++){
        
            const cell = document.createElement('div');
            cell.className = "cell";
            if(selected[i]){
                cell.classList.add("selected");
            }
            cell.innerHTML = gridArr[i];
            cell.addEventListener("click",()=>{
                cell.style.transform = "rotate3d(0,-1,0,360deg)";
                clickAudio.play();
                if(cell.innerHTML!=""){
                    if(cell.classList.contains("selected")){
                        cell.classList.remove("selected");
                        selected[i] = false;
                        currentSum -= Number.parseInt(cell.innerHTML);
                        userCalculation.innerHTML = currentSum; 
                    }
                    else{
                        cell.classList.add("selected");
                        selected[i] = true;
                        currentSum += Number.parseInt(cell.innerHTML);
                        userCalculation.innerHTML = currentSum; 
                      
                    }
                    if(currentSum == requiredSum){
                        count++;
                        const cells = document.querySelectorAll(".cell");
                        for(let m=0;m<cells.length;m++){
                                   if(cells[m].classList.contains("selected")){
                                    document.querySelectorAll(".cell")[m].style.display = "none";
                                    selected[m] = false;
                                    gridArr[m] = "";
                                     
                                   }     
                                   userCalculation.innerHTML = 0;
                                    
                                   score.innerHTML = "score: " + count;                               
                                randomNo.innerHTML = getRandomNo();
                                currentSum = 0;
                        }

                      successAudio.play();
                    }
                }
                
            });
            grid.appendChild(cell);  
      
    }
  
  
}

start.addEventListener("click",()=>{
          start.style.display = "none";
          flag = true;
          currentSum = 0;
          userCalculation.innerHTML = currentSum;
          currentScore.innerHTML = "";
          count = 0;                          
          score.innerHTML = "score: " + count;   
          msgScoreContainer.style.display = "none"
        
          gameContainer.style.display = "block";
           randomNo.innerHTML = getRandomNo();
           createGrid();
          addRowsOfNo();
});


const getRandomNo = ()=>{
    requiredSum = 10 + Math.ceil(Math.random()*40);
   return requiredSum;
}

const getRandomNoForCell = ()=>{
    return Math.ceil(Math.random()*10);
}
const addRowsOfNo = ()=> {
    for(let j=30;j<36;j++){
        gridArr.pop();
        selected.pop();
    }
    for(let j=0;j<6;j++){
       gridArr.unshift(getRandomNoForCell());
       selected.unshift(false);
    }
    
    grid.innerHTML = "";

   
    createGrid();
     checkGameOver();
   
     
}


const intervalManager = ()=>{
    if(flag){
       
            addRowsOfNo();
    }
    else{
        clearTimeout(intervalId);
        gameContainer.style.display = "none";
        grid.innerHTML = "";
        for(let i=0;i<36;i++){
            gridArr[i] = "";
            selected[i] = false;
        }
        start.style.display = "inline-block";
        start.innerHTML = "Play Again"
       msgScoreContainer.style.display = "flex";
       currentScore.innerHTML = "Your Score: " + count;
       gameOverAudio.play();
    }
}


const checkGameOver = ()=>{
    
    for(let i=30;i<36;i++){
        if(gridArr[i]!=""){
            flag = false;
            break;
           
        }
    }
    if(flag){
        intervalId = setTimeout(intervalManager,7000);
    }
    else{
        intervalId = setTimeout(intervalManager,200);
    }
        
   
}
