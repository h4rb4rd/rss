import AppView from '../view/appView';
import AppModel from '../model/appModel';
import Sound from '../view/game/sound';
import StorageManager from '../../utils/storageManager';

import { ToyType } from '../../shared/types';

class GameController {
  appView: AppView;
  appModel: AppModel;
  sound: Sound;
  storageManager!: StorageManager;

  dragItem: HTMLElement | null = null;
  isDragged = false;

  constructor(private data: Array<ToyType>) {
    this.appView = new AppView(data);
    this.appModel = new AppModel(data);
    this.sound = new Sound();
    this.storageManager = new StorageManager();
  }

  setSound() {
    const soundBtn = document.querySelector<HTMLElement>('#soundBtn');
    this.sound.audio.muted = false;

    window.addEventListener('load', () => {
      if (soundBtn?.classList.contains('active')) {
        soundBtn.classList.remove('active');
      }
    });

    soundBtn?.addEventListener('click', (e) => this.sound.play(e));

    if (soundBtn) {
      this.sound.init(soundBtn);
    }
  }

  setSnow() {
    const snowContainer = document.querySelector<HTMLElement>('#snowflakes');
    const snowBtn = document.querySelector('#snowBtn');

    if (snowContainer) {
      this.appView.snow.initSnow(snowContainer);
      snowBtn?.addEventListener('click', (e) => this.appView.snow.play(e, snowContainer));
    }
  }

  setTree() {
    const treeImage = document.querySelector<HTMLImageElement>('#treeImage');
    const treeButtons = document.querySelector('#treeButtons');

    this.appView.tree.treeImageSrc = this.storageManager?.get('treeImage-src');

    if (this.appView.tree.treeImageSrc && treeImage) {
      treeImage.src = this.appView.tree.treeImageSrc;
    }

    if (treeImage) {
      treeButtons?.addEventListener('click', (e) => this.appView.tree.setTree(e, treeImage));
    }
  }

  setBackground() {
    const treeCard = document.querySelector<HTMLElement>('#treeCard');
    const backgroundButtons = document.querySelector('#backgroundButtons');

    this.appView.background.imageSrc = this.storageManager?.get('backgroundIamge-src');

    if (this.appView.background.imageSrc && treeCard) {
      treeCard.style.backgroundImage = `url('${this.appView.background.imageSrc}')`;
    }

    if (treeCard) {
      backgroundButtons?.addEventListener('click', (e) => this.appView.background.setBackground(e, treeCard));
    }
  }

  setGarland() {
    const garlandContainer = document.querySelector<HTMLElement>('#garland');
    const garlandButtons = document.querySelector('#garlandButtons');
    const switcher = document.querySelector<HTMLInputElement>('#switcher');

    const switcherPosition: boolean = this.storageManager?.get('switcher-position');

    if (switcherPosition) {
      this.appView.garland.switcherPosition = String(switcherPosition);
    }

    if (garlandContainer && switcher) {
      garlandButtons?.addEventListener('click', (e: Event) => {
        return this.appView.garland.onButtonsClick(e, garlandContainer, switcher);
      });
    }

    if (garlandContainer) {
      switcher?.addEventListener('click', (e) => this.appView.garland.onSwitcherClick(e, garlandContainer));
    }

    if (!switcherPosition && switcher && garlandContainer) {
      console.log(1);
      const color: string = this.storageManager.get('garland-color') || 'multicolor';
      this.appView.garland.appendGarland(color, garlandContainer);
      switcher.checked = false;
    }
  }

  setToyCards() {
    const treeLink = document.querySelector<HTMLAnchorElement>('[data-link="tree"]');
    const toysContainer = document.querySelector<HTMLElement>('#favoriteToys');

    if (toysContainer) {
      this.appView.dragAndDrop.appendToysCards(toysContainer);
    }

    if (treeLink && toysContainer) {
      treeLink.addEventListener('click', () => this.appView.dragAndDrop.appendToysCards(toysContainer));
    }
  }

  setDragAndDrop() {
    const dropZone = document.querySelector('#area');

    dropZone?.addEventListener('dragover', this.appView.dragAndDrop.handleDragover), false;
    dropZone?.addEventListener('drop', this.appView.dragAndDrop.handleDrop), false;
  }

  saveTreeState() {
    const dropZone = document.querySelector('#area');
    const saveButton = document.querySelector('#buttonSave');
    const treeCard = document.querySelector('#treeCard');
    const treeImage = treeCard?.querySelector<HTMLImageElement>('[data-activetree]');

    this.appView.treeState.savedTrees = this.storageManager?.get('saved-trees') || [];

    if (treeCard && dropZone && treeImage) {
      saveButton?.addEventListener('click', () => this.appView.treeState.save(treeImage, treeCard, dropZone));
    }
  }

  setDecoratedTrees() {
    const decoratedTreeButtons = document.querySelectorAll('[data-decorate]');
    const treeCard = document.querySelector<HTMLElement>('#treeCard');
    const treeImage = document.querySelector<HTMLImageElement>('#treeImage');
    const dropZone = document.querySelector<HTMLElement>('#area');

    this.appView.treeState.setInitialState();

    if (dropZone && treeCard && treeImage) {
      decoratedTreeButtons.forEach((button) => {
        button.addEventListener('click', () => this.appView.treeState.set(button, dropZone, treeCard, treeImage));
      });
    }
  }

  initGame() {
    this.setSound();
    this.setSnow();
    this.setTree();
    this.setBackground();
    this.setGarland();
    this.setToyCards();
    this.setDragAndDrop();
    this.saveTreeState();
    this.setDecoratedTrees();
  }
}
export default GameController;
