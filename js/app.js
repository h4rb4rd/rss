document.addEventListener('DOMContentLoaded', () => {
  // Gulp webP function ============================================

function testWebP(callback) {

  const webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});
  // В свайпер передавать тот класс которому указываем __swiper (родитель слайдов)
let sliders = document.querySelectorAll('.__swiper');
if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index];
    if (!slider.classList.contains('swiper-build')) {
      let sliderItems = slider.children;
      if (sliderItems) {
        for (let index = 0; index < sliderItems.length; index++) {
          let el = sliderItems[index];
          el.classList.add('swiper-slide');
        }
      }
      let sliderContent = slider.innerHTML;
      let sliderWrapper = document.createElement('div');
      sliderWrapper.classList.add('swiper-wrapper');
      sliderWrapper.innerHTML = sliderContent;
      slider.innerHTML = '';
      slider.appendChild(sliderWrapper);
      slider.classList.add('swiper-bild');
    }
    if (slider.classList.contains('__gallery')) {
      //slider.data('lightGallery').destroy(true);
    }
  }
  slidersBuildCallback();

}


function slidersBuildCallback() {}
  // burger =======================================================/
const menuBurger = document.querySelector('.icon-menu'),
  menuBody = document.querySelector('.menu__body'),
  pageBody = document.querySelector('body'),
  menuList = document.querySelector('.menu__list'),
  headerMenu = document.querySelector('.menu ');

menuBurger.addEventListener('click', () => {
  menuBurger.classList.toggle('active');
  menuBody.classList.toggle('active');
  pageBody.classList.toggle('lock');
});

menuList.addEventListener('click', (e) => {
  if (e.target.tagName == 'A') {
    menuBurger.classList.remove('active');
    menuBody.classList.remove('active');
    pageBody.classList.remove('lock');
  }
});

document.addEventListener('click', (e) => {
  if (!headerMenu.contains(e.target)) {
    menuBurger.classList.remove('active');
    menuBody.classList.remove('active');
    pageBody.classList.remove('lock');
  }
});

// offer slider =================================================/
const offerNavigation = document.querySelector('.welcome-navigation'),
  offerFractionActive = offerNavigation.querySelector('.welcome-fraction__active');

if (document.querySelector('.welcome-slider__contnet')) {
  const offerSlider = new Swiper('.welcome-slider__contnet', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    // autoHeight: true,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.welcome-navigation__arrow--next',
      prevEl: '.welcome-navigation__arrow--prev',
    },
    pagination: {
      el: '.welcome-navigation__pagination',
      clickable: true,
    },
  });
  offerSlider.on('slideChange', function () {
    offerFractionActive.innerText = `0${offerSlider.realIndex + 1}`;
  });
}

const offerSliderBullets = offerNavigation.querySelectorAll('.swiper-pagination-bullet'),
  offerFractionTotal = offerNavigation.querySelector('.welcome-fraction__total');
offerFractionTotal.innerText = `0${offerSliderBullets.length}`;

// before after slider ===========================================/
const exploreSlider = document.querySelector('.explore-slider');
const before = document.querySelector('.explore-image--before');
const beforeImage = before.getElementsByTagName('img')[0];
const resizer = document.querySelector('.explore-slider__resizer');

let active = false;

//Sort overflow out for Overlay Image
document.addEventListener('DOMContentLoaded', function () {
  let width = exploreSlider.offsetWidth;
  beforeImage.style.width = width + 'px';
});

//Adjust width of image on resize
window.addEventListener('resize', function () {
  let width = exploreSlider.offsetWidth;
  beforeImage.style.width = width + 'px';
});

resizer.addEventListener('mousedown', function () {
  active = true;
  resizer.classList.add('resize');
});

document.body.addEventListener('mouseup', function () {
  active = false;
  resizer.classList.remove('resize');
});

document.body.addEventListener('mouseleave', function () {
  active = false;
  resizer.classList.remove('resize');
});

document.body.addEventListener('mousemove', function (e) {
  if (!active) return;
  let x = e.pageX;
  x -= exploreSlider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

resizer.addEventListener('touchstart', function () {
  active = true;
  resizer.classList.add('resize');
});

document.body.addEventListener('touchend', function () {
  active = false;
  resizer.classList.remove('resize');
});

document.body.addEventListener('touchcancel', function () {
  active = false;
  resizer.classList.remove('resize');
});

//calculation for dragging on touch devices
document.body.addEventListener('touchmove', function (e) {
  if (!active) return;
  let x;

  let i;
  for (i = 0; i < e.changedTouches.length; i++) {
    x = e.changedTouches[i].pageX;
  }

  x -= exploreSlider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

function slideIt(x) {
  let transform = Math.max(0, Math.min(x, exploreSlider.offsetWidth));
  before.style.width = transform + 'px';
  resizer.style.left = transform - 0 + 'px';
}

//stop divs being selected.
function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}
// video =========================================================/
const player = document.querySelector('.player');
const playerStatus = player.querySelector('.player__status');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const range = player.querySelector('.player__slider');

const fullscreenBtn = player.querySelector('.fullscreen');
const mute = player.querySelector('.mute');

const overlay = player.querySelector('.player__overlay');
const playPause = player.querySelector('.player__button');

let value = range.value * 100;
let mousedown = false;
let downKeys = {};

range.style.background = `linear-gradient(to right, #710707 0%, #710707 ${range.value * 100}%, #fff ${range.value * 100}%, white 100%)`;

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  if (this.paused) {
    playPause.classList.remove('pause');
    overlay.style.display = 'block';
  } else {
    playPause.classList.add('pause');
    overlay.style.display = 'none';
  }
}

function keyEvents(e) {
  downKeys[e.keyCode] = true;

  if (downKeys[16] && downKeys[190] && video.playbackRate < 2) {
    video.playbackRate = (video.playbackRate + 0.2).toFixed(1);
  }
  if (downKeys[16] && downKeys[188] && video.playbackRate > 0) {
    video.playbackRate = (video.playbackRate - 0.2).toFixed(1);
  }

  if (e.key === ' ' || e.key === 'Spacebar') {
    togglePlay();
  }

  if (e.key === 'm' || e.key === 'ь') {
    video.muted = !video.muted;
    updateMuteIcon();
    muted(video.muted);
  }

  if (e.key === 'f' || e.key === 'а') {
    fullscreen();
  }
}

function muted(muted) {
  if (muted) {
    range.value = 0;
    range.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
  } else {
    range.value = video.volume;
    range.style.background = `linear-gradient(to right, #710707 0%, #710707 ${range.value * 100}%, #fff ${range.value * 100}%, white 100%)`;
  }
}

function handleRangeUpdate() {
  if (this.value >= 0 && this.value <= 1) {
    video[this.name] = this.value;
    value = this.value * 100;
  }
  updateMuteIcon();
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function setPercentTime(position) {
  const time = (video.duration * position) / 100;
  video.currentTime = time;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullscreen() {
  if (player.requestFullscreen) {
    player.requestFullscreen();
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

function volumeRange() {
  const value = this.value * 100;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
}

function updateMuteIcon() {
  if (video.muted || video.volume === 0) {
    mute.classList.add('muted');
  } else if (!video.muted && video.volume > 0) {
    mute.classList.remove('muted');
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

range.addEventListener('change', handleRangeUpdate);
range.addEventListener('mousemove', handleRangeUpdate);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

fullscreenBtn.addEventListener('click', fullscreen);

range.addEventListener('input', volumeRange);
mute.addEventListener('click', () => {
  video.muted = !video.muted;
  muted(video.muted);
  updateMuteIcon();
});

overlay.addEventListener('click', togglePlay);

document.addEventListener('keydown', (e) => {
  if (event.target.tagName.toUpperCase() === 'INPUT') {
    return;
  }
  if (e.keyCode === 32) {
    e.preventDefault();
  }

  keyEvents(e);
});

document.addEventListener('keyup', (e) => (downKeys[event.keyCode] = false));

// video slider ===================/
if (document.querySelector('.video-slider__content')) {
  const videoSlider = new Swiper('.video-slider__content', {
    observer: true,
    observeParents: true,
    spaceBetween: 42,
    speed: 800,
    loop: true,
    navigation: {
      nextEl: '.video-slider__arrow--next',
      prevEl: '.video-slider__arrow--prev',
    },
    pagination: {
      el: '.video-slider__pagination',
      clickable: true,
    },
    breakpoints: {
      310: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      769: {
        spaceBetween: 40,
        slidesPerView: 3,
      },
    },
  });
  videoSlider.on('slideChange', function () {
    const vId = videoSlider.realIndex + 1;
    video.setAttribute('src', `./assets/video/${vId}.mp4`);
    video.setAttribute('poster', `./assets/img/player/posters/${vId}.jpg`);
    video.currentTime = 0;
    progressBar.style.flexBasis = 0;

    stopAllYouTubeVideos();
  });
}

// youtube =======================================================/
function stopAllYouTubeVideos() {
  let iframes = document.querySelectorAll('iframe');

  Array.prototype.forEach.call(iframes, (iframe, i) => {
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
  });
}

const addVideoPlaceholder = (video, id) => {
  video.innerHTML = '';

  let source = `https://img.youtube.com/vi/${video.dataset.embed}/sddefault.jpg`;
  let div = document.createElement('div');

  let image = new Image();
  image.src = source;
  image.addEventListener(
    'load',
    (function () {
      video.appendChild(image);
    })(id)
  );
  div.classList.add('play-button');
  video.appendChild(div);
};

const addIframesOnclick = (video, id) => {
  let iframe = document.createElement('iframe');
  iframe.classList.add('yVideo');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('src', `https://www.youtube.com/embed/${video.dataset.embed}?rel=0&showinfo=0&autoplay=1&enablejsapi=1`);

  video.innerHTML = '';
  video.appendChild(iframe);
};

function lazyYoutube() {
  let youtube = document.querySelectorAll('.youtube');

  youtube.forEach((video, id) => {
    // add placeholder
    addVideoPlaceholder(video, id);

    // add iframes
    video.addEventListener('click', (e) => {
      stopAllYouTubeVideos();
      addIframesOnclick(video, id);

      youtube.forEach((vid, idx) => {
        if (id != idx) {
          addVideoPlaceholder(vid, idx);
        }
      });
    });
  });
}

lazyYoutube();

// gallery =======================================================/
const pictureContainer = document.querySelector('.images-conainer');

const gallleryInfo = [
  {
    id: '1',
    title: "Psyché ranimée par le baiser de l'Amour",
    text: "Psyché ranimée par le baiser de l'Amour est un groupe statuaire en marbre sculpté entre 1787 et 1793 par Antonio Canova. Détails des visages.",
  },
  {
    id: '2',
    title: 'Artemis The Huntress',
    text: "Artemis the Huntress, known as the 'Diana of Versailles'. 1st-2nd c. The Greek Artemis, goddess of the woods and hunt. Roman copy of a 2nd c. Greek sculpture ascribed to Leochares. Roman art. Early Empire.",
  },
  {
    id: '3',
    title: 'The Dying Slave',
    text: 'The Dying Slave is a sculpture by the Italian Renaissance artist Michelangelo. Created between 1513 and 1516, it was to serve with another figure, the Rebellious Slave, at the tomb of Pope Julius II.',
  },
  {
    id: '4',
    title: 'Winged Victory of Samothrace',
    text: 'The Winged Victory of Samothrace, also called the Nike of Samothrace, is a marble Hellenistic sculpture of Nike that was created in about the 2nd century BC',
  },
  {
    id: '5',
    title: 'Venus de Milo',
    text: 'The Venus de Milo is a 204 cm (6.69 ft) tall Parian marble statue of a Greek goddess, most likely Aphrodite, depicted half-clothed with a bare torso.',
  },
  {
    id: '6',
    title: 'The Virgin and Child with Saint Anne',
    text: 'The Virgin and Child with Saint Anne is an unfinished oil painting of c. 1503 by Italian Renaissance artist Leonardo da Vinci depicting Saint Anne, her daughter the Virgin Mary and the infant Jesus.',
  },
  {
    id: '7',
    title: 'Mona Lisa',
    text: 'The Mona Lisa is an oil painting by Italian artist, inventor, and writer Leonardo da Vinci. Likely completed in 1506, the piece features a portrait of a seated woman set against an imaginary landscape. ',
  },
  {
    id: '8',
    title: 'The Mollien staircase',
    text: 'This beautiful staircase situated in the center of the Pavillon Mollien was built by the architect Hector Lefuel in 1857.',
  },
  {
    id: '9',
    title: 'Venus de Milo',
    text: 'The Venus de Milo is an ancient Greek sculpture from the Hellenistic period, depicting a Greek goddess. It is one of the most famous works of ancient Greek sculpture',
  },
  {
    id: '10',
    title: 'Department of Islamic Art',
    text: 'It benefited from the work of architects Rudy Ricciotti and Mario Bellino for its scenography. The courtyard was actually covered by an undulating vault made up of 1,600 glass triangles, which is reminiscent of the Louvre pyramid.',
  },
  {
    id: '11',
    title: 'Liberty Leading the People',
    text: 'A painting by Eugène Delacroix commemorating the July Revolution of 1830, which toppled King Charles X of France.The painting usually associated with the July Revolution of 1830 in France. It is a large canvas showing a busty woman in the center raising a flag and holding a bayonet. ',
  },
  {
    id: '12',
    title: 'Arria and Paetus',
    text: 'Depicts Arria stabbing herself and passing the dagger to her husband, Caecina Paetus, a Roman senator condemned to death for his involvement in a conspiracy against the Emperor Claudius in AD 42. The sculpture was begun by Jean-Baptiste Théodon, who created the initial model and started work on the marble from 1685 to 1691.',
  },

  {
    id: '13',
    title: 'Sleeping Hermaphroditus',
    text: 'The Sleeping Hermaphroditus is an ancient marble sculpture depicting Hermaphroditus life size. In 1620, Italian artist Gian Lorenzo Bernini sculpted the mattress upon which the statue now lies. ',
  },
  {
    id: '14',
    title: 'La Belle Ferronnière',
    text: 'La Belle Ferronnière is a portrait of a lady, usually attributed to Leonardo da Vinci, in the Louvre. It is also known as Portrait of an Unknown Woman.',
  },
  {
    id: '15',
    title: 'The Louvre',
    text: "The world's second-largest art museum and a historic monument in Paris, France, and is best known for being the home of the Mona Lisa.",
  },
];

function addGalleryImages(container, arr) {
  const gallery = arr
    .sort(() => Math.random() - 0.5)
    .map(
      (obj) =>
        `<div class="popup" data-aos="fade-up" data-aos-duration="1200">  <div class="popover">
        <h3>${obj.title}y</h3>
        <p>${obj.text}</p>
      </div><img class="images-item"  src="./assets/img/gallery/${obj.id}.jpg" alt="picture" /></div>`
    );
  pictureContainer.insertAdjacentHTML('afterbegin', gallery.join(''));
}

addGalleryImages(pictureContainer, gallleryInfo);

AOS.init();

// tickets =======================================================/

// slider
if (document.querySelector('.tickets-slider__content')) {
  const mainSlider = new Swiper('.tickets-slider__content', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    // autoHeight: true,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
}

// basic
const mainTickets = document.querySelector('.tickets-form');
const basicInput = document.getElementById('basicInput');
const basicModalInput = document.getElementById('basicTicketsInput');
const basicOverviewInput = document.querySelector('.basic-over');
const basicOverviewTotal = document.querySelector('.basic-total');

// senior
const modalTickets = document.querySelector('.form-modal');
const seniorInput = document.getElementById('seniorInput');
const seniorModalInput = document.getElementById('seniorTicketsInput');
const seniorOverviewInput = document.querySelector('.senior-over');
const seniorOverviewCount = document.querySelector('.senior-total');

// ticket type
const permanentRadio = document.getElementById('permanent');
const temporaryRadio = document.getElementById('temporary');
const combinedRadio = document.getElementById('combined');

const ticketsRadio = document.querySelector('.form-type');
const modalTicketsSelect = document.querySelector('.modal-select');

// total
const totalPrice = document.getElementById('total');
const totalModalPrice = document.getElementById('modal-total');

// buttons
const closeTicketsButton = document.querySelector('.tickets-form__button');
const closeModalButton = document.querySelector('.close-modal__button');

const ticketsParams = {
  basicPrice: +localStorage.getItem('basicPrice') || 20,
  seniorPrice: +localStorage.getItem('seniorPrice') || 10,
  basicTicketsCount: +localStorage.getItem('basicTicketsCount') || 1,
  seniorTicketsCount: +localStorage.getItem('seniorTicketsCount') || 1,
  basicTotalCount: +localStorage.getItem('basicTotalCount') || 20,
  seniorTotalCount: +localStorage.getItem('seniorTotalCount') || 10,
  coefficient: +localStorage.getItem('coefficient') || 1,
  totalTicketsPrice: +localStorage.getItem('totalTicketsPrice') || 30,
};

function updateTicketValues() {
  basicInput.value = ticketsParams.basicTicketsCount;
  seniorInput.value = ticketsParams.seniorTicketsCount;
  basicModalInput.value = ticketsParams.basicTicketsCount;
  seniorModalInput.value = ticketsParams.seniorTicketsCount;
  basicOverviewInput.innerText = ticketsParams.basicTicketsCount;
  seniorOverviewInput.innerText = ticketsParams.seniorTicketsCount;
  basicOverviewTotal.innerText = ticketsParams.basicTotalCount;
  seniorOverviewCount.innerText = ticketsParams.seniorTotalCount;
  modalTicketsSelect.value = ticketsParams.coefficient;
  totalPrice.innerText = ticketsParams.totalTicketsPrice;
  totalModalPrice.innerText = ticketsParams.totalTicketsPrice;
  setValuesToStorage();
}
updateTicketValues();

function setValuesToStorage() {
  for (const key in ticketsParams) {
    if (ticketsParams.hasOwnProperty(key)) {
      localStorage.setItem(`${key}`, ticketsParams[key]);
    }
  }
}

function ticketsCounter(input, type, operation) {
  function inc() {
    if (input.value < 20) {
      switch (type) {
        case 'basic':
          ticketsParams.basicTicketsCount++;
          break;
        case 'senior':
          ticketsParams.seniorTicketsCount++;
          break;
      }
    }
  }
  function dec() {
    if (input.value > 0) {
      switch (type) {
        case 'basic':
          ticketsParams.basicTicketsCount--;
          break;
        case 'senior':
          ticketsParams.seniorTicketsCount--;
          break;
      }
    }
  }
  switch (operation) {
    case 'inc':
      inc();
      break;
    case 'dec':
      dec();
      break;
  }
  switch (type) {
    case 'basic':
      input.value = ticketsParams.basicTicketsCount;

      break;
    case 'senior':
      input.value = ticketsParams.seniorTicketsCount;
      break;
  }
  switch (type) {
    case 'basic':
      ticketsParams.basicTotalCount = ticketsParams.basicPrice * ticketsParams.basicTicketsCount;
      break;
    case 'senior':
      ticketsParams.seniorTotalCount = ticketsParams.seniorPrice * ticketsParams.seniorTicketsCount;
      break;
  }

  isDisabled();
  updateTicketValues();
  updateTotalPrice();
}
function isDisabled() {
  if (ticketsParams.basicTicketsCount == 0 && ticketsParams.seniorTicketsCount == 0) {
    closeTicketsButton.disabled = true;
    closeModalButton.disabled = true;
  } else {
    closeTicketsButton.disabled = false;
    closeModalButton.disabled = false;
  }
}
function updateTotalPrice() {
  ticketsParams.totalTicketsPrice = Math.floor(
    (ticketsParams.basicTotalCount + ticketsParams.seniorTotalCount) * ticketsParams.coefficient
  );
  updateTicketValues();
}
function updateCoefficient(e) {
  if (e.target.tagName === 'INPUT') {
    ticketsParams.coefficient = e.target.value;

    updateTotalPrice();
    updateTicketValues();
  }
}
function updateModalCoefficient(e) {
  if (e.target.value) {
    ticketsParams.coefficient = e.target.value;
    switch (e.target.value) {
      case '0':
        permanentRadio.checked = true;
      case '1':
        permanentRadio.checked = true;
        break;
      case '1.25':
        temporaryRadio.checked = true;
        break;
      case '2':
        combinedRadio.checked = true;
        break;
    }
    updateTotalPrice();
    updateTicketValues();
  }
}
function setTicketRadio(coefficient) {
  switch (`${coefficient}`) {
    case '1':
      permanentRadio.checked = true;
      break;
    case '1.25':
      temporaryRadio.checked = true;
      break;
    case '2':
      combinedRadio.checked = true;
      break;
  }
}
setTicketRadio(ticketsParams.coefficient);

function ticketsListener(e) {
  if (e.target.classList.contains('basic-plus')) {
    ticketsCounter(basicInput, 'basic', 'inc');
  }
  if (e.target.classList.contains('basic-minus')) {
    ticketsCounter(basicInput, 'basic', 'dec');
  }
  if (e.target.classList.contains('senior-plus')) {
    ticketsCounter(seniorInput, 'senior', 'inc');
  }
  if (e.target.classList.contains('senior-minus')) {
    ticketsCounter(seniorInput, 'senior', 'dec');
  }
  if (e.target.classList.contains('basic-inc')) {
    ticketsCounter(basicModalInput, 'basic', 'inc');
  }
  if (e.target.classList.contains('basic-dec')) {
    ticketsCounter(basicModalInput, 'basic', 'dec');
  }
  if (e.target.classList.contains('senior-inc')) {
    ticketsCounter(seniorModalInput, 'senior', 'inc');
  }
  if (e.target.classList.contains('senior-dec')) {
    ticketsCounter(seniorModalInput, 'senior', 'dec');
  }
}

mainTickets.addEventListener('click', (e) => ticketsListener(e));
modalTickets.addEventListener('click', (e) => ticketsListener(e));
ticketsRadio.addEventListener('change', (e) => updateCoefficient(e));
modalTicketsSelect.addEventListener('change', (e) => updateModalCoefficient(e));

// modal =========================================================/
const modalWindow = document.querySelector('.modal');
const openModalButton = document.querySelector('.tickets-form__button');
const modalOverlay = document.querySelector('.modal__overlay');
const modalBody = document.querySelector('.form-modal');
const closeModalForm = document.querySelector('.form-modal');
const closeModalIcon = document.querySelector('.modal-close');
const bodyToLock = document.querySelector('body');
const bodyHeader = document.querySelector('.header');
const select = document.getElementById('select');

function hideHeader() {
  if (modalWindow.classList.contains('modal-show')) {
    bodyHeader.style.display = 'none';
  } else {
    bodyHeader.style.display = 'block';
  }
}

hideHeader();

const openModal = (e) => {
  modalWindow.classList.add('modal-show');
  bodyToLock.classList.add('modal-show');
  modalWindow.classList.remove('modal-hide');
  hideHeader();
};

const closeModal = (e) => {
  modalWindow.classList.add('modal-hide');
  bodyToLock.classList.remove('modal-show');
  modalWindow.classList.remove('modal-show');

  if (ticketsParams.coefficient == '0') {
    ticketsParams.coefficient = 1;

    updateTotalPrice();
    showSucces(select);
  }

  hideHeader();
};

openModalButton.addEventListener('click', openModal);
closeModalIcon.addEventListener('click', closeModal);

modalWindow.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-show')) {
    closeModal();
  }
});
// fields ==============================
// set time
const modalTimeSelect = document.getElementById('modal-time');
const modalTimeField = document.querySelector('.overview-info__time');
// set date
const modalDateSelect = document.getElementById('modal-date');
const modalDateField = document.querySelector('.overview-info__date');

const chooseTime = () => {
  modalTimeField.innerText = modalTimeSelect.value;
};

const chooseDate = (e) => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const date = new Date(e.target.value);
  modalDateField.innerText = date.toLocaleDateString('en-US', options);
};

// set min max date
modalDateSelect.min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
modalDateSelect.max = '2021-12-31';

// set min max time
modalTimeSelect.min = '09:00';
modalTimeSelect.max = '18:30';
modalTimeSelect.step = '1800';

const roundFunc = (e) => {
  let x = e.target.value.split(':');
  if (x[1] > 00 && x[1] < 15) {
    x[1] = '00';
  } else if (x[1] > 44 && x[1] < 60) {
    x[0] = x[0] < 10 ? '0' + (parseInt(x[0]) + 1) : parseInt(x[0]) + 1;
    x[1] = '00';
  } else {
    x[1] = '30';
  }
  e.target.value = x.join(':');
};

modalTimeSelect.addEventListener('input', roundFunc);
modalTimeSelect.addEventListener('input', chooseTime);
modalDateSelect.addEventListener('input', (e) => chooseDate(e));

// validation ============
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

//Show input error messages
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//show success
function showSucces(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
}

//checkRequired fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSucces(input);
    }
  });
}

function checkTime(input) {
  showSucces(input);

  let errors = 0;

  if (!input.value) {
    showError(input, 'please enter a valid time');
    errors++;
  } else {
    showSucces(input);
  }
  return errors;
}

function checkSelect(input) {
  showSucces(input);

  let errors = 0;

  if (input.value == 0) {
    showError(input, 'please select a ticket type');
    errors++;
  } else {
    showSucces(input);
  }
  return errors;
}

function checkDate(input) {
  showSucces(input);

  let errors = 0;

  if (!input.value) {
    showError(input, 'please select a date');
    errors++;
  } else {
    showSucces(input);
  }
  return errors;
}

//check email is valid
function checkEmail(input, min, max) {
  showSucces(input);

  let errors = 0;
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(input.value.trim())) {
    showError(input, 'please enter a valid email');
    errors++;
  } else if (input.value.trim().split('@')[0].length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    errors++;
  } else if (input.value.trim().split('@')[0].length > max) {
    showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    errors++;
  } else {
    showSucces(input);
  }
  return errors;
}

// checkUsername
function checkUsername(input, min, max) {
  showSucces(input);

  let errors = 0;
  const re = /^([а-яё\s]+|[a-z\s]+)$/iu;

  if (!re.test(input.value)) {
    showError(input, 'please enter a valid username');
    errors++;
  } else if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    errors++;
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be les than ${max} characters`);
    errors++;
  } else {
    showSucces(input);
  }
  return errors;
}

//check input Length
function checkPhone(input, min, max) {
  showSucces(input);

  errors = 0;
  const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  if (!re.test(input.value)) {
    showError(input, 'please enter a valid phone number');
    errors++;
  } else {
    showSucces(input);
  }
  return errors;
}

//get FieldName
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function formValidate() {
  checkRequired([username, email]);
  const errors =
    checkPhone(phone, 0, 16) +
    checkEmail(email, 3, 15) +
    checkUsername(username, 3, 15) +
    checkDate(modalDateSelect) +
    checkTime(modalTimeSelect) +
    checkSelect(select);

  if (errors === 0) {
    closeModal();
  }
}
//Event Listeners
username.addEventListener('input', () => checkUsername(username, 3, 15));
email.addEventListener('input', () => checkEmail(email, 3, 15));
phone.addEventListener('input', () => checkPhone(phone, 0, 16));
select.addEventListener('change', () => checkSelect(select));
modalDateSelect.addEventListener('change', () => checkDate(modalDateSelect));
modalTimeSelect.addEventListener('change', () => checkTime(modalTimeSelect));
form.addEventListener('submit', function (e) {
  e.preventDefault();
  formValidate();
});

// map ===========================================================/
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGQ3NjciLCJhIjoiY2tycnUwbnN5NW9iazJ1cDhiZDh2dXBpYiJ9.u-weylF0kmJKUoky5FAhzQ';
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/alexd767/ckrry062h7jpy17mo5gdrktxv',
  center: [2.3364, 48.86091],
  zoom: 16.2,
});

function header() {
  let doc = document.documentElement;
  let w = window;

  let prevScroll = w.scrollY || doc.scrollTop;
  let curScroll;
  let direction = 0;
  let prevDirection = 0;

  let header = document.querySelector('.header');

  let checkScroll = function () {
    /*
     ** Find the direction of scroll
     ** 0 - initial, 1 - up, 2 - down
     */

    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      //scrolled up
      direction = 2;
    } else if (curScroll < prevScroll) {
      //scrolled down
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  let toggleHeader = function (direction, curScroll) {
    if (direction === 2 && curScroll > 150) {
      header.classList.add('hide');
      prevDirection = direction;
    } else if (direction === 1) {
      header.classList.remove('hide');
      prevDirection = direction;
    }
  };

  window.addEventListener('scroll', checkScroll);
}
header();

function scrollTop() {
  let amountScrolled = 800;
  let w = window;

  window.addEventListener('scroll', () => {
    if (w.scrollY > amountScrolled) {
      document.querySelector('.back-to-top').classList.add('show');
    } else {
      document.querySelector('.back-to-top').classList.remove('show');
    }
  });
}
scrollTop();

console.log(
  `score 160/160\nДопольнительный функционал:\n1) Слайдер смены изображений в блоке tickets\n2) Липкий хедер\n3) Описание картин при ховере в секции Gallery\n4) Стрелка возвращающая наверх`
);

});
