import StorageManager from '../../../utils/storageManager';

class SearchFilter {
  storageManager: StorageManager;

  constructor() {
    this.storageManager = new StorageManager();
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;

    this.storageManager.set('search-value', target.value.toLowerCase());
  }

  clear(e: Event) {
    const target = e.target as HTMLInputElement;

    if (!target.value.length) {
      target.value = '';
      this.storageManager.set('search-value', target.value.toLowerCase());
    }
  }
}

export default SearchFilter;
