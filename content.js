const box = document.querySelectorAll(".box");
const statusTXT = document.querySelector("#result");
const btn = document.querySelector("#restart");

let x = "<img src = './x.png'>";
let o = "<img src = './o.png'>";

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let curr_player = x;
let player = "X";
let start = false;
startGame();

function startGame(){
    box.forEach(box=>box.addEventListener('click', boxClick));
    btn.addEventListener('click', restartGame);
    statusTXT.textContent = `${player} Your Turn`;
    start = true;
}

function boxClick(){
    const index = this.dataset.index;
    if(options[index] != "" || !start){
        return;
    }
    updateBox(this, index);
    checkWinner();
}

function updateBox(box, index){
    options[index] = player;
    box.innerHTML = curr_player;
}

function changePlayer(){
    player = (player == "X") ? "O":"X";
    curr_player= (curr_player == x) ? o:x;
    statusTXT.textContent = `${player} Your Turn`;
}

function checkWinner(){
    let isWon = false;
    for(let i = 0; i < win.length; i++){
        const condition = win[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]]; 

        if(box1 == "" || box2 == "" || box3 == ""){
            continue;
        }
        if(box1 == box2 && box2 == box3){
            isWon = true;
            box[condition[0]].classList.add('win');
            box[condition[1]].classList.add('win');
            box[condition[2]].classList.add('win');
        }
    }

    if(isWon){
        statusTXT.textContent = `${player} Won...Congrats!`;
        start = false;
    }
    else if(!options.includes("")){
        statusTXT.textContent = `Match Draw...!`;
        start = false;
    }
    else{
        changePlayer();
    }
}   

function restartGame(){
    options = ["", "", "", "", "", "", "", "", ""];
    curr_player = x;
    player = "X";
    start = true;
    statusTXT.textContent = `${player} Your Turn`;

    box.forEach(boxs=>{
        boxs.innerHTML = "";
        boxs.classList.remove('win');
    });
}

