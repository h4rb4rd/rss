import { ToyType } from '../../../shared/types';
import RenderToys from '../renderToys';
import StorageManager from '../../../utils/storageManager';

class RenderFilteredData {
  renderToys: RenderToys;
  storageManager: StorageManager;

  constructor() {
    this.renderToys = new RenderToys();
    this.storageManager = new StorageManager();
  }

  render(data: Array<ToyType>) {
    const isChecked: boolean = this.storageManager.get('is-checked');
    const filteredData = isChecked ? data.filter((item) => item.favorite) : data;

    this.renderToys.render(filteredData);
    this.renderToys.animate();
  }
}

export default RenderFilteredData;
