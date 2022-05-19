import * as noUiSlider from 'nouislider';
import StorageManager from '../../../utils/storageManager';

class RangeFilter {
  storageManager: StorageManager;

  constructor() {
    this.storageManager = new StorageManager();
  }

  countSlider(slider: any, outputs: Array<HTMLElement>) {
    const [leftOutput, rightOutput] = outputs;

    const values: Array<number> = this.storageManager.get('count-values') || [1, 12];

    noUiSlider.create(slider, {
      start: values,
      connect: true,
      range: {
        min: 1,
        max: 12,
      },
      step: 1,
    });

    slider.noUiSlider.on('update', (values: Array<string>) => {
      leftOutput.textContent = Math.floor(Number(values[0])).toString();
      rightOutput.textContent = Math.floor(Number(values[1])).toString();
    });

    slider.noUiSlider.on('slide', (values: Array<string>) => {
      const valuesArr: Array<number> = [Math.floor(Number(values[0])), Math.floor(Number(values[1]))];
      this.storageManager.set('count-values', valuesArr);
    });

    return slider;
  }

  yearSlider(slider: any, outputs: Array<HTMLElement>) {
    const values: Array<number> = this.storageManager.get('year-values') || [1940, 2020];
    const [leftOutput, rightOutput] = outputs;

    noUiSlider.create(slider, {
      start: values,
      connect: true,
      range: {
        min: 1940,
        max: 2020,
      },
      step: 10,
    });

    slider.noUiSlider.on('update', (values: Array<string>) => {
      leftOutput.textContent = Math.floor(Number(values[0])).toString();
      rightOutput.textContent = Math.floor(Number(values[1])).toString();
    });

    slider.noUiSlider.on('slide', (values: Array<string>) => {
      const valuesArr = [Math.floor(Number(values[0])), Math.floor(Number(values[1]))];

      this.storageManager.set('year-values', valuesArr);
    });

    return slider;
  }
}

export default RangeFilter;
