"use strict";

// import appController from "./guessWordAppGenerator.js";
// console.log(appController);
const playGameButton = document.querySelector(".play-button");
const startGameButton = document.querySelector(".start-button");
const gameIntroduction = document.querySelector(".game-intro");
const instructContainer = document.querySelector(".instruction-container");
const playContainer = document.querySelector(".guess-app-play-container");
const timerEl = document.querySelector(".timer");
const inputFieldEl = document.querySelector(".input-field");
const playHintEl = document.querySelector(".play-container-hint");
const nextButtonEl = document.querySelector(".next-button");
const progressInfoCorrectEl = document.querySelector(".progress-info-correct");
const progressInfoIncorrectEl = document.querySelector(
  ".progress-info-incorrect"
);
const lifelineButton = document.querySelector(".life-line");
const lifeLineBoxEl = document.querySelector(".lifeline-box");
let inputFieldIndEl;
const endGameBoxEl = document.querySelector(".game-end-container");
const finishGameBoxEl = document.querySelector(".game-finish-container");
let gameEndButtonEl;
let gameFinishButtonEl;
let gameUpdate;

const init = function () {
  gameUpdate = {
    inputIndex: 0,
    hintIndex: 0,
    finalScore: 0,
    lifelineIndex: 0,
    lifelineTrial: 3,
    activeLifeline: false,
    timer: 20,
  };
};
init();

const gameStart = function () {
  gameIntroduction.classList.add("slide-out-box");
  instructContainer.classList.remove("slide-out-box");
};

const playGameFlow = function () {
  guessWordArray[gameUpdate.inputIndex].applyInputBars();
  guessWordArray[gameUpdate.hintIndex].applyPlayHint();

  // nextButtonEl.classList.add("hide-button");
};

const lifelineButtonText = function () {
  lifelineButton.textContent = `Lifeline: (${
    gameUpdate.lifelineTrial <= 0 ? "0" : gameUpdate.lifelineTrial
  } trial${gameUpdate.lifelineTrial <= 1 ? "" : "s"})`;
};

const lifelineButtonBackgroundColor = function (color) {
  if (gameUpdate.lifelineTrial === 0)
    lifelineButton.style.backgroundColor = color;
};

const createHint = function (input) {
  playHintEl.insertAdjacentHTML(
    "beforeend",
    `<p class= 'hint-field'>${input.hint}</p>`
  );
  const hintFieldEl = document.querySelector(".hint-field");
};

const createInputBars = function (input) {
  let result = [];
  let answerRender;
  let absoluteAnswer;
  let correctAnswer = false;
  for (let i = 0; i <= input.answer.length - 1; i++) {
    inputFieldEl.insertAdjacentHTML(
      "beforeend",
      `<input class= 'input-field-individual' type = 'text' maxlength = '1'
      }'>`
    );
  }

  inputFieldIndEl = document.querySelectorAll(".input-field-individual");
  inputFieldIndEl.forEach((inp, index) => {
    inputFieldIndEl[0].focus();

    inp.addEventListener("input", function (e) {
      e.preventDefault();

      progressInfoCorrectEl.classList.remove("show-progress");
      progressInfoIncorrectEl.classList.remove("show-progress");
      if (index < inputFieldIndEl.length - 1 && e.target.value) {
        inputFieldIndEl[index + 1].focus();
        result.splice(index, 0, e.target.value);
        // answerRender = result
        //   .join("")
        //   .toLowerCase()
        //   .replace(result[0], result[0].toUpperCase());

        // console.log(result);
      }
      if (index === inputFieldIndEl.length - 1 && e.target.value) {
        inputFieldIndEl[index].focus();
        result.splice(index, 0, e.target.value);
        answerRender = result
          .join("")
          .toLowerCase()
          .replace(result[0], result[0].toUpperCase());
        absoluteAnswer = answerRender.replace(
          answerRender[0],
          answerRender[0].toUpperCase()
        );
        console.log(answerRender);
        if (absoluteAnswer === input.answer) {
          nextButtonEl.classList.remove("slide-out-box");
          progressInfoCorrectEl.classList.add("show-progress");

          inputFieldIndEl[index].blur();
          gameUpdate.finalScore += 1;
          if (gameUpdate.finalScore === guessWordArray.length) {
            nextButtonEl.classList.add("slide-out-box");

            playContainer.classList.add("hide-box");
            finishGameBoxEl.classList.remove("slide-out-box");
            finishGameBoxEl.innerHTML = `<div class='game-finish-paragraph'>Congratulations!</div> 
             <div class='game-finish-paragraph'>You completed ${gameUpdate.finalScore} out of ${guessWordArray.length} </div>
            <div class='game-finish-paragraph'>You have finished the game</div>
             
              
              <button class='game-finish-button'> Close </button>
              `;
            gameFinishButtonEl = document.querySelector(".game-finish-button");
            gameFinishButtonEl.addEventListener("click", function () {
              location.reload();
            });
          }
          correctAnswer = true;
        } else {
          if (!correctAnswer)
            progressInfoIncorrectEl.classList.add("show-progress");
        }
      }
    });
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Backspace") {
        e.preventDefault();

        if (index > 0) {
          result.splice(index, 1);
          answerRender = result.join("").toLowerCase();
          inputFieldIndEl[index - 1].focus();
          e.target.value = "";
        }
        if (index === 0) {
          result.splice(index - 1 + 1, 1);
          answerRender = result.join("").toLowerCase();
          e.target.value = "";
        }
      }
    });
  });
};

const createLifeline = function (input) {
  lifeLineBoxEl.innerHTML = `<div class='lifeline-box' >${input.answer
    .slice(0, 2)
    .padEnd(input.answer.length - 1, "_")
    .concat(input.answer.slice(-1))}
  <button class='lifeline-button-clear' > Continue </button>
  </div>`;
  const lifelineButtonClear = document.querySelector(".lifeline-button-clear");

  lifeLineBoxEl.classList.remove("slide-out-box");

  lifelineButtonClear.addEventListener("click", function () {
    lifeLineBoxEl.classList.add("slide-out-box");
    inputFieldIndEl[0].focus();
    gameUpdate.activeLifeline = false;
  });
};

const guessWordArray = [
  {
    hint: "I am a country. However, I am also a continent.",
    answer: "Australia",

    applyInputBars() {
      createInputBars(this);
    },

    applyPlayHint() {
      createHint(this);
    },
    applyLifeline() {
      createLifeline(this);
    },
  },
  {
    hint: "United States of America is to Washington DC while India is to ...",
    answer: "Newdelhi",

    applyInputBars() {
      createInputBars(this);
    },

    applyPlayHint() {
      createHint(this);
    },
    applyLifeline() {
      createLifeline(this);
    },
  },
  {
    hint: "United States of America call it soccer while England call it ...",
    answer: "Football",

    applyInputBars() {
      createInputBars(this);
    },

    applyPlayHint() {
      createHint(this);
    },
    applyLifeline() {
      createLifeline(this);
    },
  },
  {
    hint: "Girl is to Boy while Woman is to ...",
    answer: "Man",

    applyInputBars() {
      createInputBars(this);
    },

    applyPlayHint() {
      createHint(this);
    },
    applyLifeline() {
      createLifeline(this);
    },
  },
];

const endGameResult = function () {
  const percentScore = (gameUpdate.finalScore / guessWordArray.length) * 100;
  playContainer.classList.add("hide-box");
  inputFieldEl.textContent = "";
  playHintEl.textContent = "";
  endGameBoxEl.classList.remove("slide-out-box");
  endGameBoxEl.innerHTML = `<div class='game-end-paragraph'>${
    percentScore >= 70 ? "Excellent" : "Fair"
  } performance</div> 
   <div class='game-end-paragraph'>You completed ${
     gameUpdate.finalScore
   } out of ${guessWordArray.length} (${percentScore}%) </div>
  <div class='game-end-paragraph'>Play to finish</div>
   
    
    <button class='game-end-button'> Play Again </button>
    `;
  gameEndButtonEl = document.querySelector(".game-end-button");
  gameEndButtonEl.addEventListener("click", function () {
    console.log("Welcome");
    endGameBoxEl.classList.add("slide-out-box");
    playContainer.classList.remove("hide-box");
    lifeLineBoxEl.classList.add("slide-out-box");
    lifelineButtonBackgroundColor("Green");
    gameUpdate.inputIndex = 0;
    gameUpdate.hintIndex = 0;
    gameUpdate.lifelineIndex = 0;
    gameUpdate.finalScore = 0;
    gameUpdate.lifelineTrial = 3;
    gameUpdate.activeLifeline = false;
    gameUpdate.timer = 20;
    timerEl.textContent = `00:20`;
    createTimer();
    playGameFlow();
    lifelineButtonText();
  });
};

const createTimer = function () {
  const startTimer = setInterval(function () {
    gameUpdate.timer--;
    let min = String(Math.trunc(gameUpdate.timer / 60)).padStart(2, 0);
    let sec = String(gameUpdate.timer % 60).padStart(2, 0);
    timerEl.textContent = `${min}:${sec}`;
    if (gameUpdate.timer <= 0) {
      gameUpdate.timer = 0;
      clearInterval(startTimer);
      if (gameUpdate.finalScore !== guessWordArray.length) endGameResult();
    }
  }, 1000);
};

playGameButton.addEventListener("click", function () {
  gameStart();
});

startGameButton.addEventListener("click", function () {
  instructContainer.classList.add("slide-out-box");
  playContainer.classList.remove("hide-box");
  createTimer();
  // inputFieldEl.textContent = "";
  // playHintEl.textContent = "";
  guessWordArray[0].applyInputBars();
  guessWordArray[0].applyPlayHint();
});

nextButtonEl.addEventListener("click", function () {
  inputFieldEl.textContent = "";
  playHintEl.textContent = "";

  guessWordArray[(gameUpdate.inputIndex += 1)].applyInputBars();
  guessWordArray[(gameUpdate.hintIndex += 1)].applyPlayHint();
  gameUpdate.lifelineIndex++;

  nextButtonEl.classList.add("slide-out-box");
});

lifelineButton.addEventListener("click", function () {
  if (!gameUpdate.activeLifeline) {
    if (gameUpdate.lifelineTrial > 0) gameUpdate.timer -= 2;

    gameUpdate.activeLifeline = true;
    gameUpdate.lifelineTrial--;
    lifelineButtonText();

    lifelineButtonBackgroundColor("Red");
    if (gameUpdate.lifelineTrial >= 0)
      guessWordArray[gameUpdate.lifelineIndex].applyLifeline();
  }
});

localStorage.setItem("gameUpdate", JSON.stringify(gameUpdate));
