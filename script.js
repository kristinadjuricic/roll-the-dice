'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

// // starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
let scores; //hold the scores of player 0 an player 1
let currentScore;
let activePlayer;
let playing;

const init = function () {
  scores = [0, 0]; //hold the scores of player 0 an player 1
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  //winner clas disappear

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //switch to next player
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//diceEl.classList.add('hidden');

// rolling dice functionality

btnRoll.addEventListener('click', function () {
  // 1.generating random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.checked for rolled 1: if true

    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // //switch to next player
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score

    scores[activePlayer] += currentScore; // if is player 1 than will be scores 1 and for player 0 than will be scores 0 ***** scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if player's score is >= 50
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //finish the game
    switchPlayer();
    //switch to next player
  }

  btnNew.addEventListener('click', init);
});
