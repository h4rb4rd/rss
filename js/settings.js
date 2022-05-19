const timepicker = document.querySelector('#timepicker');
const timer = document.querySelector('#timer');
const volumeSlider = document.querySelector('#volumeSlider');
const volumeValue = document.querySelector('#volumeValue');

const volume = document.querySelector('#volume');

timer.checked = localStorage.getItem('isTimer') !== 'false';
timepicker.value = localStorage.getItem('timepicker') || 30;

volume.checked = localStorage.getItem('isVolume') !== 'false';

timer.addEventListener('change', () => {
  const value = timer.checked;
  localStorage.setItem('isTimer', value);

  checkTime();
});

volume.addEventListener('change', () => {
  const value = volume.checked;
  localStorage.setItem('isVolume', value);

  checkVolume();
});

timepicker.addEventListener('change', () => {
  const value = timepicker.value;
  localStorage.setItem('timepicker', value);
});

const checkTime = () => {
  if (timer.checked === false) {
    timepicker.parentElement.classList.add('gray');
    timepicker.disabled = true;
    timer.nextElementSibling.innerHTML = `<span>off</span>`;
  } else {
    timepicker.parentElement.classList.remove('gray');
    timepicker.disabled = false;
    timer.nextElementSibling.innerHTML = `<span>on</span>`;
  }
};

checkTime();

const checkVolume = () => {
  if (volume.checked === false) {
    volumeSlider.parentElement.classList.add('gray');
    volumeSlider.disabled = true;
    volume.nextElementSibling.innerHTML = `<span>off</span>`;
  } else {
    volumeSlider.parentElement.classList.remove('gray');
    volumeSlider.disabled = false;
    volume.nextElementSibling.innerHTML = `<span>on</span>`;
  }
};

checkVolume();

let volumeLevel = localStorage.getItem('volume-level') || volumeSlider.value;

volumeSlider.value = volumeLevel;

volumeSlider.style.background = `linear-gradient(to right, rgb(8, 114, 244) 0%, rgb(8, 114, 244) ${volumeLevel * 100}%, rgb(255, 247, 9) ${
  volumeLevel * 100
}%, rgb(255, 247, 9) 100%)`;

volumeValue.innerText = `${Math.floor(volumeLevel * 100)}%`;

function handleRangeUpdate() {
  volumeLevel = this.value;

  volumeValue.innerText = `${Math.floor(volumeLevel * 100)}%`;
  this.style.background = `linear-gradient(to right, rgb(8, 114, 244) 0%, rgb(8, 114, 244) ${volumeLevel * 100}%, rgb(255, 247, 9) ${
    volumeLevel * 100
  }%, rgb(255, 247, 9) 100%)`;

  localStorage.setItem('volume-level', volumeLevel);
}

volumeSlider.addEventListener('change', handleRangeUpdate);
volumeSlider.addEventListener('mousemove', handleRangeUpdate);
volumeSlider.addEventListener('input', handleRangeUpdate);
