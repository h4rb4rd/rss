import StorageManager from '../../../utils/storageManager';

class ValuesFilter {
  storageManager!: StorageManager;

  shapeFilterValues: Array<string> = [];
  colorFilterValues: Array<string> = [];
  sizeFilterValues: Array<string> = [];

  constructor() {
    this.storageManager = new StorageManager();
  }

  setValues(e: Event, type: string) {
    const target = e.target as HTMLButtonElement;

    this.shapeFilterValues = this.storageManager?.get('shape-values') || [];
    this.colorFilterValues = this.storageManager?.get('color-values') || [];
    this.sizeFilterValues = this.storageManager?.get('size-values') || [];

    if (target.tagName === 'BUTTON') {
      const dataValue: string = target.dataset.filter as string;

      if (target.classList.contains('active')) {
        target.classList.remove('active');

        if (type === 'shape') {
          this.shapeFilterValues = this.shapeFilterValues.filter((item) => item !== dataValue);
          this.storageManager.set('shape-values', this.shapeFilterValues);
        }
        if (type === 'color') {
          this.colorFilterValues = this.colorFilterValues.filter((item) => item !== dataValue);
          this.storageManager.set('color-values', this.colorFilterValues);
        }
        if (type === 'size') {
          this.sizeFilterValues = this.sizeFilterValues.filter((item) => item !== dataValue);
          this.storageManager.set('size-values', this.sizeFilterValues);
        }
      } else {
        target.classList.add('active');

        if (type === 'shape') {
          this.shapeFilterValues.push(dataValue);
          this.storageManager.set('shape-values', this.shapeFilterValues);
        }
        if (type === 'color') {
          this.colorFilterValues.push(dataValue);
          this.storageManager.set('color-values', this.colorFilterValues);
        }
        if (type === 'size') {
          this.sizeFilterValues.push(dataValue);
          this.storageManager.set('size-values', this.sizeFilterValues);
        }
      }
    }
  }

  reset() {
    this.shapeFilterValues = [];
    this.colorFilterValues = [];
    this.sizeFilterValues = [];
  }
}

export default ValuesFilter;
