import StorageManager from '../../../utils/storageManager';

class Tree {
  treeImageSrc = '';
  storageManager: StorageManager;

  constructor() {
    this.storageManager = new StorageManager();
  }

  setTree(e: Event, image: HTMLImageElement) {
    const target = e.target as HTMLElement;

    if (target.dataset.tree) {
      const imageNum: string = target.dataset.tree;
      const imageSrc: string = require(`../../../../assets/images/tree-${imageNum}.png`);
      image.src = imageSrc;
      image.dataset.activetree = `${imageNum}`;

      this.storageManager.set('treeImage-src', imageSrc);
    }
  }
}

export default Tree;
