import StorageManager from '../../../utils/storageManager';

class Background {
  storageManager: StorageManager;

  imageSrc = '';

  constructor() {
    this.storageManager = new StorageManager();
  }

  setBackground(e: Event, card: HTMLElement) {
    const target = e.target as HTMLElement;

    if (target.dataset.bg) {
      const bgNum: string = target.dataset.bg;
      const bgSrc: string = require(`../../../../assets/images/bg${bgNum}.jpg`);
      card.style.backgroundImage = `url('${bgSrc}')`;

      this.storageManager.set('backgroundIamge-num', bgNum);
      this.storageManager.set('backgroundIamge-src', bgSrc);
    }
  }
}

export default Background;
