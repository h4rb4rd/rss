import html2canvas from 'html2canvas';

import StorageManager from '../../../utils/storageManager';

import { SavedTreeType, SavedToyType } from '../../../shared/types';

class TreeState {
  storageManager: StorageManager;

  savedTrees: Array<SavedTreeType> = [];

  constructor() {
    this.storageManager = new StorageManager();
  }

  save(treeImage: HTMLImageElement, treeCard: Element, dropZone: Element) {
    const defaultImgSrc = require('../../../../assets/images/tree-1.png');
    const defaultBgSrc = require('../../../../assets/images/bg1.jpg');

    const treeNum = treeImage?.dataset.activetree;
    const bgNum: string = this.storageManager.get('backgroundIamge-num') || '1';
    const bgSrc: string = this.storageManager.get('backgroundIamge-src') || defaultBgSrc;
    const imgSrc: string = this.storageManager.get('treeImage-src') || defaultImgSrc;
    const decoratedTree = document.querySelector(`[data-decorate="${treeNum}"]`);
    const decoratedImage = decoratedTree?.querySelector('img');

    const obj: SavedTreeType = {
      treeId: treeNum,
      bgId: bgNum,
      bgSrc: bgSrc,
      imgSrc: imgSrc,
      treeToys: [],
    };

    if (dropZone && dropZone.children.length > 0) {
      Array.from(dropZone.children).forEach((item) => {
        const style = window.getComputedStyle(item);
        const top = style.getPropertyValue('top');
        const left = style.getPropertyValue('left');

        const toy: SavedToyType = {
          id: item.id,
          top,
          left,
        };

        obj.treeToys.push(toy);

        if (this.savedTrees.length > 0) {
          this.savedTrees = this.savedTrees.filter((el) => el.treeId !== treeNum);
        }

        decoratedTree?.classList.add('decorated');
      });
    }

    if (treeCard instanceof HTMLElement && decoratedImage) {
      const imgDataUrl = this.setHtmlAsImage(treeCard);

      imgDataUrl.then((imgUrl) => {
        obj.treeImg = imgUrl;
        decoratedImage.src = imgUrl;
        this.savedTrees.push(obj);
        this.storageManager.set('saved-trees', this.savedTrees);
      });
    }
  }

  async setHtmlAsImage(srcEl: HTMLElement): Promise<string> {
    let imageUrl = '';
    await html2canvas(srcEl).then((canvas) => {
      imageUrl = canvas.toDataURL('image/jpeg', 0.9);
    });
    return imageUrl;
  }

  setInitialState() {
    this.savedTrees = this.storageManager?.get('saved-trees') || [];

    if (this.savedTrees.length) {
      this.savedTrees.forEach((item) => {
        const decoratedTree = document.querySelector(`[data-decorate="${item.treeId}"]`);
        const decoratedImage = decoratedTree?.querySelector<HTMLImageElement>('img');

        if (decoratedImage && item.treeImg) {
          decoratedImage.src = item.treeImg;
        }

        decoratedTree?.classList.add('decorated');
      });
    }
  }

  shiftToyToTree(toys: Array<SavedToyType>, dropZone: HTMLElement) {
    toys.forEach((toy) => {
      const treeToy = document.getElementById(`${toy.id}`);
      const id = toy.id.split('-')[0];
      const card = document.querySelector(`[data-cardnum="${id}"]`);

      if (treeToy instanceof HTMLElement) {
        treeToy.style.top = toy.top;
        treeToy.style.left = toy.left;
        dropZone?.append(treeToy);
      }

      if (card) {
        const p = card.firstChild as HTMLElement;
        const count = card.querySelectorAll('[data-toynum]').length;
        p.innerText = String(count);
      }
    });
  }

  shiftToyToCard(toys: Array<Element>) {
    toys.forEach((toy) => {
      const treeToy = document.getElementById(`${toy.id}`);
      const id = toy.id.split('-')[0];
      const card = document.querySelector(`[data-cardnum="${id}"]`);

      if (treeToy instanceof HTMLElement) {
        treeToy.removeAttribute('style');
        card?.append(treeToy);
      }

      if (card) {
        const p = card.firstChild as HTMLElement;
        const count = card.querySelectorAll('[data-toynum]').length;
        p.innerText = String(count);
      }
    });
  }

  set(button: Element, dropZone: HTMLElement, treeCard: HTMLElement, treeImage: HTMLImageElement) {
    if (button.classList.contains('decorated') && button instanceof HTMLElement) {
      const buttonNum = button.dataset.decorate;

      if (dropZone?.children.length) {
        this.shiftToyToCard(Array.from(dropZone.children));
      }

      if (buttonNum) {
        const filteredTrees = this.savedTrees.sort((a, b) => Number(a.treeId) - Number(b.treeId));
        const savedTree = filteredTrees[Number(buttonNum) - 1];
        const imageSrc = savedTree.imgSrc;
        treeCard.style.backgroundImage = `url('${savedTree.bgSrc}')`;

        if (imageSrc) {
          treeImage.src = imageSrc;
        }

        treeImage.dataset.activetree = `${savedTree.treeId}`;

        this.storageManager.set('treeImage-src', imageSrc);

        this.shiftToyToTree(savedTree.treeToys, dropZone);
      }
    }
  }
}

export default TreeState;
