import StorageManager from '../../../utils/storageManager';

class Sound {
  storageManager: StorageManager;

  audio: HTMLAudioElement;
  AudioSrc = 'public/audio.mp3';
  audioStatus = '';

  constructor() {
    this.audio = new Audio(this.AudioSrc);
    this.storageManager = new StorageManager();
  }

  init(btn: HTMLElement) {
    document.body.addEventListener('click', (e) => {
      this.audioStatus = this.storageManager?.get('audio-status');

      if (this.audioStatus) {
        if (this.audio.paused && e.target !== btn) {
          this.audio.play();
          btn?.classList.add('active');
        }
      }
    });
  }

  play(e: Event) {
    const target = e.target;
    this.audio.loop = true;

    if (target instanceof HTMLElement) {
      if (target?.classList.contains('active')) {
        target.classList.remove('active');
        this.audio.pause();
        this.storageManager.set('audio-status', false);
      } else {
        target?.classList.add('active');
        this.audio.play();
        this.storageManager.set('audio-status', true);
      }
    }
  }
}
export default Sound;
