import StorageManager from '../../../utils/storageManager';
class Snow {
  storageManager: StorageManager;
  snowStatus = '';

  constructor() {
    this.storageManager = new StorageManager();
  }

  initSnow(container: HTMLElement) {
    this.snowStatus = this.storageManager?.get('snow-status');

    for (let i = 0; i < 125; i++) {
      const snowflake = document.createElement('i');
      container?.appendChild(snowflake);
    }

    if (this.snowStatus) {
      container?.classList.remove('hide');
    }
  }

  play(e: Event, container: HTMLElement) {
    const target = e.target;

    if (target instanceof HTMLElement)
      if (container?.classList.contains('hide')) {
        container?.classList.remove('hide');
        this.storageManager.set('snow-status', true);
      } else {
        container?.classList.add('hide');
        this.storageManager.set('snow-status', false);
      }
  }
}

export default Snow;
