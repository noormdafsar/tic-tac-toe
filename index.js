const boxes = document.querySelectorAll(".box");
const playerInfo = document.querySelector(".player-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// creation a function to initialise the game
 function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", "",];
    //To make boxes empty in UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // Initialise boxes with css properties again
         box.classList = `box box${index +1}`;
    });
    newGameBtn.classList.remove("active");
    playerInfo.innerText =`Current Player -${currentPlayer}`;
 }
 
 initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }
    playerInfo.innerText = `Current Player -${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        // All three boxes are non empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            if(gameGrid[position[0]] === "X") {
                answer  = "X";
            }
            else
                answer = "0";

                //pointer event disabled
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    //winnerlist
    if(answer !== "") {
        playerInfo.innerText = `winner player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // condition when game is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        fillCount++;
    });
    
    //If board is filled , game is tie
    if(fillCount === 9) {
        playerInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

 function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
 }

 boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
 });

 newGameBtn.addEventListener("click", initGame);