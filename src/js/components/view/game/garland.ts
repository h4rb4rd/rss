import StorageManager from '../../../utils/storageManager';

class Garland {
  storageManager: StorageManager;
  switcherPosition = '';

  constructor() {
    this.storageManager = new StorageManager();
  }

  createGalrand(color: string, size: number, angle: number, step: number, count: number): HTMLElement {
    const ul = document.createElement('ul');
    ul.classList.add('lightrope');
    ul.style.width = `${size}px`;
    ul.style.height = `${size}px`;

    for (let i = 0; i < count; i++) {
      const li = document.createElement('li');
      const stepValue = step * i;
      li.classList.add(color);
      li.style.transform = ` rotate(${angle + stepValue}deg) translate(${size / 2}px) rotate(-${angle + stepValue}deg)`;
      ul.appendChild(li);
    }
    return ul;
  }

  createGalrands(color: string): Array<HTMLElement> {
    const garlands = [
      this.createGalrand(color, 120, 65, 12, 5),
      this.createGalrand(color, 170, 60, 10, 7),
      this.createGalrand(color, 230, 60, 8, 8),
      this.createGalrand(color, 300, 60, 6, 11),
      this.createGalrand(color, 380, 55, 4, 18),
      this.createGalrand(color, 465, 55, 3.5, 21),
      this.createGalrand(color, 555, 58, 3, 24),
      this.createGalrand(color, 650, 58, 2, 29),
    ];

    return garlands;
  }

  appendGarland(color: string, container: HTMLElement) {
    const garlands = this.createGalrands(color);

    container.innerHTML = '';
    container.append(...garlands);
  }

  onButtonsClick(e: Event, container: HTMLElement, switcher: HTMLInputElement) {
    const target = e.target as HTMLElement;

    if (target.dataset.color) {
      const color = target.dataset.color;

      this.appendGarland(color, container);
      switcher.checked = false;

      this.storageManager.set('garland-color', color);
      this.storageManager.set('switcher-position', switcher.checked);
    }
  }

  onSwitcherClick(e: Event, container: HTMLElement) {
    const target = e.target as HTMLInputElement;
    const color: string = this.storageManager.get('garland-color') || 'multicolor';

    if (!target.checked) {
      this.appendGarland(color, container);
    } else {
      container.innerHTML = '';
    }

    this.storageManager.set('switcher-position', target.checked);
  }
}

export default Garland;
