import StorageManager from '../../../utils/storageManager';
import Modal from '../modal';
import { ToyType } from '../../../shared/types';

class ToyToFavorite {
  storageManager: StorageManager;
  modal: Modal;

  constructor(private data: Array<ToyType>) {
    this.storageManager = new StorageManager();
    this.modal = new Modal();
  }

  add(e: Event) {
    const target = e.target as HTMLDivElement;
    const favoriteCards: Array<ToyType> = this.storageManager.get('favoriteCards-data');

    if (target.classList.contains('toys-card')) {
      const cardNumber = target.dataset.num;
      const currentCardDecsritpion = target.querySelector<HTMLElement>(`[data-favorite="${cardNumber}"]`);
      const data: Array<ToyType> = favoriteCards || this.data;
      const currentCard: ToyType = data.filter((card: ToyType) => card.num === cardNumber)[0];
      const totalFavorites: number = this.storageManager.get('totalFavorites');

      if (totalFavorites > 19 && !currentCard.favorite) {
        this.modal.open();
        return;
      }

      if (currentCardDecsritpion) {
        if (currentCard.favorite) {
          currentCard.favorite = false;
          currentCardDecsritpion.innerText = 'Любимая: нет';

          target.classList.remove('active');
        } else {
          currentCard.favorite = true;
          currentCardDecsritpion.innerText = 'Любимая: да';

          target.classList.add('active');
        }
      }

      this.storageManager.set('favoriteCards-data', data);
    }
  }
}
export default ToyToFavorite;
