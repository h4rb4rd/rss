import { ToyType } from '../../../shared/types';
import StorageManager from '../../../utils/storageManager';

class SortData {
  storageManager: StorageManager;

  constructor() {
    this.storageManager = new StorageManager();
  }

  sortNameMax = (data: Array<ToyType>) => data.sort((a, b) => a.name.localeCompare(b.name));
  sortNameMin = (data: Array<ToyType>) => data.sort((a, b) => b.name.localeCompare(a.name));
  sortYearMax = (data: Array<ToyType>) => data.sort((a, b) => Number(a.year) - Number(b.year));
  sortYearMin = (data: Array<ToyType>) => data.sort((a, b) => Number(b.year) - Number(a.year));

  sort(data: Array<ToyType>) {
    const value = this.storageManager.get('select-value') || 'sort-name-max';

    switch (value) {
      case 'sort-name-max':
        this.sortNameMax(data);
        break;
      case 'sort-name-min':
        this.sortNameMin(data);
        break;
      case 'sort-year-max':
        this.sortYearMax(data);
        break;
      case 'sort-year-min':
        this.sortYearMin(data);
        break;
    }
  }
}

export default SortData;
