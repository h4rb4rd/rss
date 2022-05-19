import StorageManager from '../../../utils/storageManager';

class ActiveButtons {
  storageManager: StorageManager;

  constructor() {
    this.storageManager = new StorageManager();
  }

  set(buttons: NodeListOf<HTMLElement | Element>) {
    const shapeValue: Array<string> = this.storageManager.get('shape-values');
    const colorValues: Array<string> = this.storageManager.get('color-values');
    const sizeValues: Array<string> = this.storageManager.get('size-values');

    const values: Array<string> = [...shapeValue, ...colorValues, ...sizeValues];

    buttons.forEach((button) => {
      if (button instanceof HTMLElement) {
        const value: string = button.dataset.filter as string;
        if (values.includes(value)) {
          button.classList.add('active');
        }
      }
    });
  }
}

export default ActiveButtons;
