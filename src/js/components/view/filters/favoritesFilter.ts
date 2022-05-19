import StorageManager from '../../../utils/storageManager';

class FavoritesFilter {
  storageManager: StorageManager;

  constructor() {
    this.storageManager = new StorageManager();
  }

  toggleCheckbox(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target) {
      const isChecked: boolean = target.checked;
      this.storageManager.set('is-checked', isChecked);
    }
  }
}
export default FavoritesFilter;
