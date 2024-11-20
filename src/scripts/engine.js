const state = {
    view: {
        squares: document.querySelectorAll(".square"), enemy: document.querySelector(".enemy"), timeLeft: document.querySelector("#time-left"), score: document.querySelector("#score"), 
    },
    values: {
        timeId: null,
        countDownTimerId: null,//setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        gameEnded:false,
    },
};

function countDown() {
    if (state.values.curretTime > 0) {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
}

    if (state.values.curretTime <= 0 && !state.values.gameEnded) {
        state.values.gameEnded = true;
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timeId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound() {
    let audio = new Audio('./src/audio-moeda.mp3');
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
       square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
   state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
              state.values.result++
              state.view.score.textContent = state.values.result;
              state.values.hitPosition = null;
              //playSound();
            }
        });
    });
}

function initialize() {
    state.values.curretTime = 60; //Garante que o tempo inicial seja configurado
    state.values.gameEnded = false; //Reset de estado do jogo
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;

    state.values.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
    addListenerHitBox();
}

document.addEventListener("DOMContentLoaded", () => {
    initialize();
}); 
