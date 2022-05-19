import Modal from './modal.js';
import { Congratulations } from './firework.js';

const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');

const picturesContainer = document.querySelector('#picturesGrid');
const playAgainBtn = document.querySelector('#playAgainBtn');
const homeBtn = document.querySelector('#homeBtn');
const showMoreBtn = document.querySelector('#showMoreBtn');

const modal = document.querySelector('#score-modal');
const scoreModal = new Modal(modal);

const mainCategory = localStorage.getItem('main-category');
const subCategory = localStorage.getItem('sub-category');

const hightScores = JSON.parse(localStorage.getItem(`${mainCategory}-${subCategory}-highScores`)) || [];

const mostRecentScore = +localStorage.getItem(`${mainCategory}-${subCategory}-score`);

const picturesArr = localStorage.getItem(`${mainCategory}-${subCategory}-pictures-score`).split(',');

const totalAnswers = picturesArr.filter((answer) => answer === 'true').length;

localStorage.setItem(`${mainCategory}-${subCategory}-answers`, totalAnswers);
localStorage.setItem(`${mainCategory}-${subCategory}-isPlayed`, true);

let isMoreCardsShowed = false;

const isVolume = localStorage.getItem('isVolume') !== 'false';

const audio = new Audio();

audio.volume = +localStorage.getItem('volume-level') || 0.5;

if (totalAnswers > 0 && totalAnswers < 10) {
  audio.src = 'assets/sounds/win.mp3';
} else if (totalAnswers === 0) {
  audio.src = 'assets/sounds/fail.mp3';
} else if (totalAnswers === 10) {
  audio.src = 'assets/sounds/fireworks.mp3';
}

const questionsData = JSON.parse(localStorage.getItem('questions-data'));

picturesArr.forEach((picture, id) => {
  const idx = id + 1;
  let images = '';
  if (picture === 'true') {
    images += `<img class="score-picture" data-number="${idx}" src="assets/paints/${subCategory}/${idx}.jpg" alt="paint" />`;
  } else {
    images += `<img class="score-picture gray" data-number="${idx}" src="assets/paints/${subCategory}/${idx}.jpg" alt="paint" />`;
  }

  picturesContainer.insertAdjacentHTML('beforeend', images);
});

finalScore.innerText = `Your score is ${mostRecentScore}, answers ${totalAnswers}/10`;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    answers: totalAnswers,
    score: mostRecentScore,
    name: username.value,
  };

  hightScores.push(score);

  hightScores.sort((a, b) => {
    return b.score - a.score;
  });

  hightScores.splice(5);

  localStorage.setItem(`${mainCategory}-${subCategory}-highScores`, JSON.stringify(hightScores));
  scoreModal.destroy();
  window.location.assign('/categories.html');
  // 'https://rolling-scopes-school.github.io/h4rb4rd-JSFE2021Q3/art-quiz/categories.html'
};

saveScoreBtn.addEventListener('click', saveHighScore);

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

const setModalDescription = (name, author, year, imageId) => {
  const options = {
    name: name,
    author: author,
    year: year,
    image: `<img src="assets/paints/${subCategory}/${imageId}.jpg" alt="paint" />`,
    btnText: 'Close',
    overlayClose: true,
    btnClose: true,
  };
  scoreModal.init(options);
};

const showModal = (e) => {
  const questions = getQuestions(subCategory);

  if (e.target.classList.contains('score-picture')) {
    const idx = e.target.dataset.number;
    const question = questions[idx - 1];

    const { name, author, year } = question;
    setModalDescription(name, author, year, idx);

    setTimeout(() => {
      scoreModal.open();
    }, 200);
  }
};

const showMoreCards = () => {
  isMoreCardsShowed = !isMoreCardsShowed;

  picturesContainer.classList.toggle('showed');
};

showMoreBtn.addEventListener('click', showMoreCards);
picturesContainer.addEventListener('click', (e) => showModal(e));
playAgainBtn.addEventListener('click', () => scoreModal.destroy());
homeBtn.addEventListener('click', () => scoreModal.destroy());

const timestamp = () => new Date().getTime();

const fireworksContainer = document.querySelector('#fireworks');

let then = timestamp();

const congratulations = new Congratulations();
window.onresize = () => congratulations.resize();
document.onclick = (evt) => congratulations.onClick(evt);
document.ontouchstart = (evt) => congratulations.onClick(evt);

let reqAnim = null;

function loop() {
  reqAnim = requestAnimationFrame(loop);

  let now = timestamp();
  const delta = now - then;

  then = now;
  congratulations.update(delta / 500);
}

const isPlayed = localStorage.getItem('isPlayed') !== 'false';

const showFireworks = () => {
  fireworksContainer.style.display = 'block';
  loop();
  setTimeout(() => {
    fireworksContainer.classList.add('hide-elements');
  }, 5000);
  setTimeout(() => {
    cancelAnimationFrame(reqAnim);
    fireworksContainer.style.display = 'none';
  }, 8000);
};

if (totalAnswers === 10 && !isPlayed) {
  showFireworks();
  localStorage.setItem('isPlayed', true);
}

if (isVolume && !isPlayed) {
  audio.play();
}
