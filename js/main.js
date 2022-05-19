const artistsBtn = document.querySelector('#artistsBtn');
const picturesBtn = document.querySelector('#picturesBtn');

artistsBtn.addEventListener('click', () => {
  localStorage.setItem('main-category', 'artists');
});

picturesBtn.addEventListener('click', () => {
  localStorage.setItem('main-category', 'pictures');
});

const DATA_URL = new Request('assets/data.json');

const getData = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return res.json();
};

getData(DATA_URL).then((res) => {
  localStorage.setItem('questions-data', JSON.stringify(res));
  localStorage.setItem('categories-data', JSON.stringify(Object.keys(res)));
});

const btns = document.querySelector('#buttons ');
const cubes = document.querySelector('#cubes');

const isPreloaded = localStorage.getItem('preloaded') || 'false';

if (isPreloaded === 'false') {
  setTimeout(() => {
    btns.classList.add('show-elements');
    cubes.classList.add('hide-elements');
    localStorage.setItem('preloaded', 'true');
  }, 1000);
} else {
  btns.classList.remove('hide-buttons');
  cubes.classList.add('hide');
}
