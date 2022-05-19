import StorageManager from '../../../utils/storageManager';
import { ToyType } from '../../../shared/types';

class FavoritesCount {
  storageManager: StorageManager;

  constructor(private data: Array<ToyType>) {
    this.storageManager = new StorageManager();
  }

  setCount(counter: HTMLElement) {
    const favoriteCards: Array<ToyType> = this.storageManager.get('favoriteCards-data');
    const data = favoriteCards ? favoriteCards : this.data;

    const count: number = data.filter((item: ToyType) => item.favorite).length;

    this.storageManager.set('totalFavorites', count);
    counter.textContent = String(count);
  }
}
export default FavoritesCount;
