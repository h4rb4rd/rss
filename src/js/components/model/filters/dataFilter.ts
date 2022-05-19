import StorageManager from '../../../utils/storageManager';
import { ToyType } from '../../../shared/types';

class DataFilter {
  storageManager: StorageManager;

  constructor(private data: Array<ToyType>) {
    this.storageManager = new StorageManager();
  }

  getFilteredData() {
    const favoriteCards: Array<ToyType> = this.storageManager.get('favoriteCards-data');

    const searchValue: string = this.storageManager.get('search-value');
    const countValues: Array<number> = this.storageManager.get('count-values');
    const yearValues: Array<number> = this.storageManager.get('year-values');
    const shapeValues: Array<string> = this.storageManager.get('shape-values');
    const colorValues: Array<string> = this.storageManager.get('color-values');
    const sizeValues: Array<string> = this.storageManager.get('size-values');

    const [countMin, countMax]: Array<number> = countValues;
    const [yearMin, yearMax] = yearValues;

    const data: Array<ToyType> = (favoriteCards ? favoriteCards : this.data).filter((item: ToyType) => {
      let isMatchesBySearch = true;
      let isMatchesByCount = true;
      let isMatchesByYear = true;
      let isMatchesByShape = true;
      let isMatchesByColor = true;
      let isMatchesBySize = true;

      if (searchValue) {
        isMatchesBySearch = item.name.toLowerCase().includes(searchValue);
      }

      if (countValues) {
        isMatchesByCount = countMin <= Number(item.count) && Number(item.count) <= countMax;
      }

      if (yearValues) {
        isMatchesByYear = yearMin <= Number(item.year) && Number(item.year) <= yearMax;
      }

      if (shapeValues.length) {
        isMatchesByShape = shapeValues.includes(item.shape);
      }

      if (colorValues.length) {
        isMatchesByColor = colorValues.includes(item.color);
      }

      if (sizeValues.length) {
        isMatchesBySize = sizeValues.includes(item.size);
      }

      return (
        isMatchesBySearch &&
        isMatchesByCount &&
        isMatchesByYear &&
        isMatchesByShape &&
        isMatchesByColor &&
        isMatchesBySize
      );
    });

    return data;
  }
}

export default DataFilter;
