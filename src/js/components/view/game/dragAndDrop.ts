import StorageManager from '../../../utils/storageManager';
import { ToyType } from '../../../shared/types';

class DragAndDrop {
  dragItem: HTMLElement | null = null;
  isDragged = false;
  storageManager: StorageManager;

  constructor(private data: Array<ToyType>) {
    this.storageManager = new StorageManager();
  }

  creatToyCard(num: string, count: string): HTMLElement {
    const div = document.createElement('div');
    const p = document.createElement('p');

    div.classList.add('favorites-toys__card');
    div.classList.add('favorites-card');
    div.setAttribute('data-cardnum', `${num}`);

    p.classList.add('favorites-card__count');
    p.innerText = `${count}`;

    div.prepend(p);

    for (let i = 1; i <= Number(count); i++) {
      const img = document.createElement('img');

      img.src = require(`../../../../assets/images/${num}.png`);
      img.classList.add('favorites-card__image');
      img.id = `${num}-${i}`;
      img.setAttribute('alt', 'toy');
      img.setAttribute('data-toynum', `${num}`);
      img.setAttribute('draggable', 'true');
      img.addEventListener('dragstart', this.handleDragstart, false);
      img.addEventListener('dragend', this.handleDragend, false);

      div.append(img);
    }
    return div;
  }

  appendToysCards(container: HTMLElement) {
    const defaultFavoritesToys = this.data.filter((toy) => toy.favorite === true);
    const defaultToys: Array<ToyType> = this.data.slice(0, 20);
    const favoriteToysData: Array<ToyType> = this.storageManager.get('favoriteCards-data') || defaultFavoritesToys;
    const favoriteToys = favoriteToysData?.filter((toy) => toy.favorite === true) || [];
    const toys: Array<ToyType> = favoriteToys.length ? favoriteToys : defaultToys;

    container.innerHTML = '';

    const toysElements = toys.map(({ num, count }) => {
      return this.creatToyCard(num, count);
    });

    container?.append(...toysElements);
  }

  handleDragstart = (e: Event) => {
    this.isDragged = true;
    this.dragItem = e.target as HTMLImageElement;
  };

  handleDragend = (e: Event) => {
    const dropZone = document.querySelector('#area');
    const saveButton = document.querySelector<HTMLButtonElement>('#buttonSave');

    const target = e.target as HTMLElement;
    const id = target.id.split('-')[0];

    const card = document.querySelector(`[data-cardnum="${id}"]`);

    if (this.isDragged === true) {
      if (this.dragItem) {
        this.dragItem.removeAttribute('style');

        card?.append(this.dragItem);
      }
    }

    if (card) {
      const p = card.firstChild as HTMLElement;
      const count = card.querySelectorAll('[data-toynum]').length;

      p.innerText = String(count);
    }

    if (dropZone && saveButton) {
      saveButton.disabled = dropZone.children.length <= 0;
    }

    this.dragItem = null;
  };

  handleDrop = (e: Event) => {
    const target = e.target as HTMLElement;
    const evt = e as MouseEvent;
    const rect = target.getBoundingClientRect();

    const top: number = evt.clientY - rect.top;
    const left: number = evt.clientX - rect.left;

    if (this.dragItem && target.id === 'area') {
      this.isDragged = false;
      this.dragItem.style.left = `${left}px`;
      this.dragItem.style.top = `${top}px`;
      target.append(this.dragItem);
    }
  };

  handleDragover = (e: Event) => {
    e.preventDefault();
  };

  setDragAndDrop() {
    const dropZone = document.querySelector('#area');

    dropZone?.addEventListener('dragover', this.handleDragover), false;
    dropZone?.addEventListener('drop', this.handleDrop), false;
  }
}
export default DragAndDrop;
