const categoryTitle = document.querySelector('#categoryTitle');
const cardsContainer = document.querySelector('#cardsGrid');
const showMoreBtn = document.querySelector('#showMoreBtn');
const showBtnText = document.querySelector('#showBtnText');
const showBtnIcon = document.querySelector('#showBtnIcon');
const mainCategory = localStorage.getItem('main-category');

categoryTitle.innerText = mainCategory === 'artists' ? 'Artists Quiz' : 'Pictures Quiz';

let isMoreCardsShowed = false;

const categoriesData = JSON.parse(localStorage.getItem('categories-data'));

const showMoreCards = () => {
  isMoreCardsShowed = !isMoreCardsShowed;
  let angle = isMoreCardsShowed ? 180 : 0;

  showBtnText.innerText = isMoreCardsShowed ? 'Hide' : 'Show More';
  showBtnIcon.style.transform = `rotate(${angle}deg)`;
  cardsContainer.classList.toggle('showed');
};

const setCards = () => {
  categoriesData.forEach((category, i) => {
    const value = +localStorage.getItem(`${mainCategory}-${category}-answers`);
    const isPlayed = localStorage.getItem(`${mainCategory}-${category}-isPlayed`) === 'true';
    const li = document.createElement('li');

    const liContent = `
    <div class="card-details">${value}/10</div>
    <a href="./game.html" id="categoryCard" class="card ${category}"></a>
    <h4 id="cardTitle">${category}</h4>
    <a
      href="./score.html"
      id="highscoreBtn"
      class="btn btn--yellow score-btn"
      >High Scores <i class="fas fa-star"></i
    ></a>
    `;

    li.style.backgroundImage = `url("assets/categories/${mainCategory}/${i + 1}.jpg")`;
    if (!isPlayed) {
      li.classList.add('gray');
    }

    li.insertAdjacentHTML('afterbegin', liContent);
    cardsContainer.appendChild(li);
  });
};
setCards();

const setSubCategory = (e) => {
  switch (true) {
    case e.target.classList.contains('portrait'):
      localStorage.setItem('sub-category', 'portrait');
      localStorage.setItem('portrait-answers', '0');
      break;
    case e.target.classList.contains('landscape'):
      localStorage.setItem('sub-category', 'landscape');
      localStorage.setItem('landscape-answers', '0');
      break;
    case e.target.classList.contains('still-life'):
      localStorage.setItem('sub-category', 'still-life');
      localStorage.setItem('still-life-answers', '0');
      break;
    case e.target.classList.contains('impressionism'):
      localStorage.setItem('sub-category', 'impressionism');
      localStorage.setItem('impressionism-answers', '0');
      break;
    case e.target.classList.contains('expressionism'):
      localStorage.setItem('sub-category', 'expressionism');
      localStorage.setItem('expressionism-answers', '0');
      break;
    case e.target.classList.contains('avant-garde'):
      localStorage.setItem('sub-category', 'avant-garde');
      localStorage.setItem('avant-garde-answers', '0');
      break;
    case e.target.classList.contains('renaissance'):
      localStorage.setItem('sub-category', 'renaissance');
      localStorage.setItem('renaissance-answers', '0');
      break;
    case e.target.classList.contains('surrealism'):
      localStorage.setItem('sub-category', 'surrealism');
      localStorage.setItem('surrealism-answers', '0');
      break;
    case e.target.classList.contains('kitsch'):
      localStorage.setItem('sub-category', 'kitsch');
      localStorage.setItem('kitsch-answers', '0');
      break;
    case e.target.classList.contains('minimalism'):
      localStorage.setItem('sub-category', 'minimalism');
      localStorage.setItem('minimalism', '0');
      break;
    default: {
      break;
    }
  }
};

cardsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('score-btn')) {
    const category = e.target.previousElementSibling.textContent.toLowerCase();
    localStorage.setItem('sub-category', category);
  }
});

cardsContainer.addEventListener('click', (e) => setSubCategory(e));
showMoreBtn.addEventListener('click', showMoreCards);
