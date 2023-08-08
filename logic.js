console.log("welcome to tic tac toe");
let music = new Audio("music.mp3");
let click = new Audio("click.wav");
let win = new Audio("win.mp3");
let roundwin = new Audio("roundwin.mp3");
let turn = "X";
let isgameover = false;

let Totalround = 1;
document.querySelector(".TotalRound").innerText = Totalround;

let RunningRound = 1;
document.querySelector(".RunningRound").innerText = RunningRound;

let draw = false;

let Player_1_Animation = document.querySelector(".player-1");
let Player_2_Animation = document.querySelector(".player-2");

let player_1_Score = 0;
let player_2_Score = 0;

let Player_1 = document.querySelector(".player_1_Score")
Player_1.innerText = player_1_Score;

let Player_2 = document.querySelector(".player_2_Score")
Player_2.innerText = player_2_Score;

let roundWinner = "";
let matchWinner = "";

let boxes = document.getElementsByClassName("box");
let boxtext = document.getElementsByClassName('boxtext');

let applyAnimation = 0;

let NotEmptyBoxCount = 0;

let Message = document.querySelector(".Message");

let player_1_Name = "Player 1";
let player_2_Name = "Player 2";
document.querySelector(".Player-1-Name").innerHTML = player_1_Name;
document.querySelector(".Player-2-Name").innerHTML = player_2_Name;

let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

function changeWinBookColor() {
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText)) {
            boxes[e[0]].style.backgroundColor = "";
            boxes[e[1]].style.backgroundColor = "";
            boxes[e[2]].style.backgroundColor = "";
        }
    })
}

function resetGameArea() {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.getElementsByClassName("info").innerText = "Turn for" + turn;

}

function enterEntryDetails() {
    //creating container for element
    let messageBody = document.createElement("div");
    messageBody.setAttribute("class", "messageBody");
    //creating container for elements
    let roundwin = document.createElement("div");
    roundwin.setAttribute("class", "roundwin");

    //Player 1 details
    let pTag_1 = document.createElement("p");
    pTag_1.innerText = "Player 1 Name";
    let playerName_1 = document.createElement("input");
    playerName_1.setAttribute("type", "text");
    playerName_1.setAttribute("value", "Player 1");
    
    // Player 2 details
    let pTag_2 = document.createElement("p");
    pTag_2.innerText = "Player 2 Name";
    let playerName_2 = document.createElement("input");
    playerName_2.setAttribute("type", "text");
    playerName_2.setAttribute("value", "Player 2");

    let radioDiv = document.createElement("div");
    radioDiv.innerHTML = `<p>Number of Round*</p>
    <input type="radio" id="1" name="round" value="1">
    <label for="1">1</label>
    <input type="radio" id="3" name="round" value="3">
    <label for="3">3</label>
    <input type="radio" id="5" name="round" value="5">
    <label for="5">5</label> `
    // creating button for insert the data and deleting the container
    let button = document.createElement("button");
    button.setAttribute("class", "lets-play");
    button.textContent = "Let's Play";
    
    //focus
    playerName_1.addEventListener("focus", () => {
        if (playerName_1.value === "Player 1") {
            playerName_1.value = "";
        }
    })

    playerName_1.addEventListener("focusout", () => {
        if (playerName_1.value === "") {
            playerName_1.value = "Player 1";
        }
    })

    playerName_2.addEventListener("focus", () => {
        if (playerName_2.value === "Player 2") {
            playerName_2.value = "";
        }
    })

    playerName_2.addEventListener("focusout", () => {
        if (playerName_2.value === "") {
            playerName_2.value = "Player 2";
        }
    })

    //giving functionalty to button
    button.addEventListener('click', () => {
        music.load();
        music.loop = true;
        music.volume = 0.4;
        music.play();
        let rounds = document.getElementsByName("round");
        let selectedRound = Array.from(rounds).find(radio => radio.checked).value;
        Totalround = parseInt(selectedRound);
        document.querySelector(".TotalRound").innerText = Totalround;
        //getting Player Name 
        player_1_Name = playerName_1.value.charAt(0).toUpperCase() + playerName_1.value.slice(1);
        player_2_Name = playerName_2.value.charAt(0).toUpperCase() + playerName_2.value.slice(1);
        //Insert Player 1 Name
        let setPlayer_Name1 = document.querySelectorAll(".Player-1-Name");
        setPlayer_Name1.forEach(Name => {
            Name.innerText = player_1_Name !== "" ? player_1_Name : "Player 1";
        })
        //Insert Player 2 Name
        let setPlayer_Name2 = document.querySelectorAll(".Player-2-Name");
        setPlayer_Name2.forEach(Name => {
            Name.innerText = player_2_Name !== "" ? player_2_Name : "Player 2";
        })
        removeAllData(messageBody);
    })
    //Inserting the element in container
    roundwin.append(pTag_1, playerName_1, pTag_2, playerName_2, radioDiv, button);
    messageBody.append(roundwin);
    Message.append(messageBody);
}

function createButtonDiv() {
    music.pause();
    roundwin.play();
    roundwin.volume = 0.5;
    let div = document.createElement("div");
    div.setAttribute('class','roundWinnerContainer')
    let pTag = document.createElement("p");
    if (!draw) {
        pTag.textContent = `${roundWinner} win the Round ${RunningRound}`;
    } else {
        pTag.textContent = `Round ${RunningRound} is draw!`;
    }
    let button = document.createElement("button");
    button.textContent = "Next Round";
    button.setAttribute("class", "NextRound");
    reset.addEventListener('click',()=>{
        div.remove();
    })
    button.addEventListener('click', () => {
        music.play();
        RunningRound++;
        document.querySelector(".RunningRound").innerText = RunningRound;
        if (!draw) {
            changeWinBookColor();
        }
        Player_1_Animation.setAttribute("id", "chance");
        applyAnimation = 0;
        NotEmptyBoxCount = 0;
        resetGameArea();
        div.remove();
        draw = false;

    });

    div.append(pTag);
    div.append(button);
    document.querySelector('.info').append(div);
}

function removeAllData(messageBody) {
    changeWinBookColor();
    resetGameArea();
    RunningRound = 1;
    document.querySelector(".RunningRound").innerText = RunningRound;

    player_1_Score = 0;
    player_2_Score = 0;

    Player_1.innerText = player_1_Score;
    Player_2.innerText = player_2_Score;

    applyAnimation = 0;
    NotEmptyBoxCount = 0;
    Player_1_Animation.setAttribute("id", "chance");
    messageBody.remove();
}

function putNextRoundHtml() {
    music.pause();
    win.play();
    let messageBody = document.createElement("div");
    messageBody.setAttribute("class", "messageBody messageBody-backgroundGIF");

    let roundwin = document.createElement("div");
    roundwin.setAttribute("class", "roundwin");

    let roundWinner = document.createElement("div");
    roundWinner.setAttribute("class", "roundwinner");

    let button = document.createElement("button");
    button.setAttribute("class", "PlayAgain");
    button.textContent = "Play Again";

    let restart = document.createElement("button");
    restart.setAttribute("class", "lets-play");
    restart.textContent = "Restart";

    button.addEventListener('click', () => {
        
        music.load();
        music.play();
        removeAllData(messageBody);

    })
    restart.addEventListener('click', () => {
        messageBody.remove();
        enterEntryDetails();
    })
    if (player_1_Score === player_2_Score) {
        roundwin.innerHTML += `<h3 class="winner"> The Match is drawn !</h3>
        ${player_1_Score} / ${player_2_Score} </div>`;
    } else {
        roundwin.innerHTML += `<h3 class="winner">${(player_1_Score > player_2_Score) ? player_1_Name : player_2_Name} Win the Match !</h3> <span>${player_1_Score} / ${player_2_Score} </span></div>`;
    }
    Player_2_Animation.removeAttribute("id");
    roundWinner.append(button, restart)
    roundwin.append(roundWinner);
    messageBody.append(roundwin);
    Message.append(messageBody);
}



const checkwin = () => {
    wins.forEach(e => {
        if (!isgameover) {
            if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText)) {
                if (boxtext[e[0]].innerText === 'X') {
                    player_1_Score++;
                    Player_1.innerText = player_1_Score;
                    roundWinner = player_1_Name;
                    Player_1_Animation.removeAttribute("id");
                } else if (boxtext[e[0]].innerText === '0') {
                    player_2_Score++;
                    Player_2.innerText = player_2_Score;
                    roundWinner = player_2_Name;
                    Player_2_Animation.removeAttribute("id");
                } else {
                    roundWinner = "Round draw";
                }
                isgameover = true;
                boxes[e[0]].style.backgroundColor = "green";
                boxes[e[1]].style.backgroundColor = "green";
                boxes[e[2]].style.backgroundColor = "green";

            }
        }
    })
}

document.querySelector(".player-1").setAttribute("id", "chance");
Array.from(boxes).forEach(element => {

    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (isgameover) {
            element.removeEventListener('click');
        }
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            click.play();
            turn = changeTurn(); 
            checkwin();
            if (isgameover) {
                if (RunningRound < Totalround) {
                    createButtonDiv();
                } else if (RunningRound === Totalround) {
                    putNextRoundHtml();
                }
            }
            if (boxtext !== "") {
                if (!isgameover && RunningRound <= Totalround) {
                    NotEmptyBoxCount++;
                }
            }
            if (NotEmptyBoxCount === 9) {
                draw = true;
                if (RunningRound < Totalround) {
                    if (turn === "X") {
                        Player_1_Animation.removeAttribute("id");
                    } else {
                        Player_2_Animation.removeAttribute("id");
                    }
                    createButtonDiv();
                } else if (RunningRound === Totalround) {
                    Player_1_Animation.removeAttribute("id");
                    putNextRoundHtml();
                }
            }
            if (!isgameover) {
                let turntoplay = document.querySelector("#turn");
                turntoplay.innerText = turn;
                if (!draw) {
                    if (turn === "X") {
                        Player_1_Animation.setAttribute("id", "chance");
                        applyAnimation++;
                        if (applyAnimation !== 0) {
                            Player_2_Animation.removeAttribute("id");
                        }
                    } else if (turn === "0") {
                        Player_2_Animation.setAttribute("id", "chance");
                        Player_1_Animation.removeAttribute("id");
                    }
                }
            }
        }
    })
})


reset.addEventListener('click', () => {
    changeWinBookColor();
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    if(isgameover){
        RunningRound++;
        document.querySelector(".RunningRound").innerText = RunningRound;
        changeWinBookColor();
        Player_1_Animation.setAttribute("id", "chance");
        applyAnimation = 0;
        NotEmptyBoxCount = 0;
        resetGameArea();
        div.remove();
        draw = false;
    }
    isgameover = false;
    document.getElementById("turn").innerText = turn;
    
})