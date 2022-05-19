const highScoresList = document.querySelector('#highScoresList');
const scoreTitle = document.querySelector('#scoreTitle');

const mainCategory = localStorage.getItem('main-category');
const subCategory = localStorage.getItem('sub-category');

scoreTitle.innerHTML = `${mainCategory} leaderboard <br>${subCategory}:`;

const highScores = JSON.parse(localStorage.getItem(`${mainCategory}-${subCategory}-highScores`)) || [];

if (highScores.length > 0) {
  highScoresList.innerHTML = highScores
    .map((score) => {
      return `<li class="high-score">${score.name}: ${score.score} (${score.answers}/10)</li>`;
    })
    .join('');
} else {
  highScoresList.innerHTML = `<li class="high-score">Sorry, no results found</li>`;
}
