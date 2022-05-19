import Modal from './modal.js';

const questionTitle = document.querySelector('#questionTitle');
const choices = Array.from(document.querySelectorAll('.choice'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const paint = document.querySelector('#paint');
const gameContainer = document.querySelector('#game');

const mainCategory = localStorage.getItem('main-category');
const subCategory = localStorage.getItem('sub-category');

if (mainCategory === 'artists') {
  gameContainer.classList.add('artists');
  gameContainer.classList.remove('pictures');
} else if (mainCategory === 'pictures') {
  gameContainer.classList.remove('artists');
  gameContainer.classList.add('pictures');
}

const modal = document.querySelector('#modal');
const gameModal = new Modal(modal);

const hudTimer = document.querySelector('#hudTimer');
const hudTimeValue = document.querySelector('#hudTimeValue');

const isTimer = localStorage.getItem('isTimer') !== 'false';
const timeValue = +localStorage.getItem('timepicker') || 30;

const isVolume = localStorage.getItem('isVolume') !== 'false';

if (isTimer) {
  hudTimer.classList.remove('hide');
} else {
  hudTimer.classList.add('hide');
}

hudTimeValue.innerText = timeValue;

if (mainCategory === 'artists') {
  paint.classList.add('hide');
} else {
  paint.classList.remove('hide');
}

let timer = null;

let answers = [];
let currentAnswer = '';
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let picturesScore = [];
let classToApply = 'incorrect';

const audio = new Audio();

audio.volume = +localStorage.getItem('volume-level') || 0.5;

const questionsData = JSON.parse(localStorage.getItem('questions-data'));

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

const getQuestions = (subCat) => {
  switch (subCat) {
    case 'portrait':
      return [...questionsData.portrait];
    case 'landscape':
      return [...questionsData.landscape];
    case 'still-life':
      return [...questionsData['still-life']];
    case 'impressionism':
      return [...questionsData.impressionism];
    case 'expressionism':
      return [...questionsData.expressionism];
    case 'avant-garde':
      return [...questionsData['avant-garde']];
    case 'renaissance':
      return [...questionsData.renaissance];
    case 'surrealism':
      return [...questionsData.surrealism];
    case 'kitsch':
      return [...questionsData.kitsch];
    case 'minimalism':
      return [...questionsData.minimalism];
    default:
      break;
  }
  return null;
};

const gameTimer = (time) => {
  let t = time;
  timer = setTimeout(gameTimer, 1000, (t -= 1));
  hudTimeValue.innerHTML = time;

  if (t === 0) {
    clearTimeout(timer);
    if (classToApply === 'incorrect') {
      picturesScore.push(false);
    }
    hudTimeValue.innerHTML = `<span class="time-out">Time is up!</span>`;
    setTimeout(() => {
      gameModal.open();
    }, 200);
  }
};

const setAnswers = () => {
  answers = [];
  const questions = getQuestions(subCategory);

  answers.push(currentAnswer);

  for (let i = 0; answers.length < 4; i += 1) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomAnswer = mainCategory === 'artists' ? questions[randomIndex].id : questions[randomIndex].name;

    if (!answers.includes(randomAnswer)) {
      answers.push(randomAnswer);
      questions.splice(randomIndex, 1);
    }
  }
  answers.sort(() => Math.random() - 0.5);
};

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = getQuestions(subCategory);

  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem(`${mainCategory}-${subCategory}-score`, score);
    localStorage.setItem(`${mainCategory}-${subCategory}-pictures-score`, picturesScore);
    clearTimeout(timer);
    gameModal.destroy();
    localStorage.setItem('isPlayed', false);
    return window.location.assign('/end.html');
    // "https://rolling-scopes-school.github.io/h4rb4rd-JSFE2021Q3/art-quiz/end.html"
  }

  if (isTimer) {
    hudTimeValue.innerHTML = timeValue;
    timer = setTimeout(gameTimer, 1000, timeValue);
  }

  questionCounter += 1;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const PREFIX = ['A', 'B', 'C', 'D'];
  const questionIndex = 0;

  currentQuestion = availableQuestions[questionIndex];

  const { name, author, year, id } = currentQuestion;

  currentAnswer = mainCategory === 'artists' ? id : name;

  setAnswers();

  questionTitle.innerText = mainCategory === 'artists' ? `Guess the ${author} Picture` : 'Guess the Picture';
  paint.innerHTML = `<img src="assets/paints/${subCategory}/${id}.jpg" alt="paint" />`;

  choices.forEach((choice, i) => {
    if (mainCategory === 'artists') {
      choice.innerHTML = `<img class="choice-image" data-number="${answers[i]}" src="assets/paints/${subCategory}/${answers[i]}.jpg" alt="paint">`;
    } else {
      choice.innerHTML = `<p class="choice-prefix">${PREFIX[i]}</p>
      <p class="choice-text">${answers[i]}</p>`;
    }
  });
  setModalDescription(name, author, year, id);

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;

  return null;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    clearTimeout(timer);

    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = mainCategory === 'artists' ? selectedChoice.dataset.number : selectedChoice.textContent;

    classToApply = selectedAnswer === currentAnswer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
      picturesScore.push(true);

      audio.src = 'assets/sounds/correct.mp3';
    } else {
      picturesScore.push(false);
      audio.src = 'assets/sounds/incorrect.mp3';
    }

    if (isVolume) {
      audio.play();
    }

    selectedChoice.parentElement.classList.add(classToApply);

    clearTimeout(timer);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      gameModal.open();
    }, 1000);
  });
});

const setModalDescription = (name, author, year, imageId) => {
  setTimeout(() => {
    const options = {
      name: name,
      author: author,
      year: year,
      image: `<img src="assets/paints/${subCategory}/${imageId}.jpg" alt="paint" />`,
      btnText: 'continue',
      overlayClose: false,
      btnClose: true,
    };
    gameModal.init(options);
  }, 1000);
};

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

modal.addEventListener('click', (e) => {
  if (e.target.dataset.close === 'true') {
    getNewQuestion();
  }
});

startGame();
