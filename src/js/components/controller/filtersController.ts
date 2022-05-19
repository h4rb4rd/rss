import AppModel from '../model/appModel';
import AppView from '../view/appView';
import StorageManager from '../../utils/storageManager';

import { ToyType } from '../../shared/types';

class FiltersController {
  appModel: AppModel;
  appView: AppView;
  storageManager: StorageManager;

  countSlider: any | null = null;
  checkbox: HTMLInputElement | null = null;
  searchBar: HTMLInputElement | null = null;
  yearSlider: any | null = null;

  constructor(private data: Array<ToyType>) {
    this.appModel = new AppModel(data);
    this.appView = new AppView(data);
    this.storageManager = new StorageManager();
  }

  search() {
    this.searchBar = document.querySelector<HTMLInputElement>('#searchBar');
    const searchValue: string = this.storageManager.get('search-value');

    if (this.searchBar) {
      this.searchBar.focus();
      this.searchBar.value = searchValue;

      this.searchBar.addEventListener('keyup', (e) => {
        this.appView.searchFilter.search(e);
        this.setFilteredData();
      });

      this.searchBar.addEventListener('search', (e) => {
        this.appView.searchFilter.clear(e);
        this.setFilteredData();
      });
    }
  }

  sort() {
    const select = document.querySelector<HTMLSelectElement>('#toysSelect');
    const selectValue: string = this.storageManager.get('select-value') || 'sort-name-max';

    if (select) {
      select.value = selectValue;

      select.addEventListener('change', () => {
        const value = select.value;
        this.storageManager.set('select-value', value);

        this.setFilteredData();
      });
    }
  }

  setRangeSlider() {
    const countRangeSlider = document.querySelector<HTMLElement>('#countRangeSlider');
    const leftCountOutput = document.querySelector<HTMLElement>('#leftCountOutput');
    const rightCountOutput = document.querySelector<HTMLElement>('#rightCountOutput');

    if (leftCountOutput && rightCountOutput) {
      const countOutputs: Array<HTMLElement> = [leftCountOutput, rightCountOutput];

      this.countSlider = this.appView.rangeFilter.countSlider(countRangeSlider, countOutputs);
    }

    this.countSlider.noUiSlider.on('slide', () => this.setFilteredData());

    const yearRangeSlider = document.querySelector('#yearRangeSlider');
    const leftYearOutput = document.querySelector<HTMLElement>('#leftYearOutput');
    const rightYearOutput = document.querySelector<HTMLElement>('#rightYearOutput');

    if (leftYearOutput && rightYearOutput) {
      const yearOutputs: Array<HTMLElement> = [leftYearOutput, rightYearOutput];

      this.yearSlider = this.appView.rangeFilter.yearSlider(yearRangeSlider, yearOutputs);
    }

    this.yearSlider.noUiSlider.on('slide', () => this.setFilteredData());
  }

  addFilterListener = (elements: Element, type: string) => {
    elements.addEventListener('click', (e) => {
      this.appModel.valuesFilter.setValues(e, type);
      this.setFilteredData();
    });
  };

  setRangeValues() {
    const shapeButtons = document.querySelector('#shapeButtons');
    const colorButtons = document.querySelector('#colorButtons');
    const sizeButtons = document.querySelector('#sizeButtons');

    if (shapeButtons) {
      this.addFilterListener(shapeButtons, 'shape');
    }

    if (colorButtons) {
      this.addFilterListener(colorButtons, 'color');
    }

    if (sizeButtons) {
      this.addFilterListener(sizeButtons, 'size');
    }
  }

  addToFavorites() {
    this.checkbox = document.querySelector<HTMLInputElement>('#favoriteCheckbox');
    const isChecked: boolean = this.storageManager.get('is-checked');

    if (this.checkbox) {
      this.checkbox.checked = isChecked;

      this.checkbox.addEventListener('change', (e) => {
        this.appView.favoritesFilter.toggleCheckbox(e);
        this.setFilteredData();
      });
    }
  }

  addToFavorite() {
    const cardsContainer = document.querySelector<HTMLElement>('#cardsContainer');

    if (cardsContainer) {
      cardsContainer.addEventListener('click', (e) => {
        this.appView.toyToFavorite.add(e);
        this.setFavoritesCounter();
      });
    }
  }

  setFavoritesCounter() {
    const counter = document.querySelector<HTMLElement>('#favoritesTotal');

    if (counter) {
      this.appView.favoritesCount.setCount(counter);
    }
  }

  setActiveButtons() {
    const buttons = document.querySelectorAll('[data-filter]');
    this.appView.activeButtons.set(buttons);
  }

  setFilteredData() {
    const filteredData = this.appModel.dataFilter.getFilteredData();
    const cardsContainer = document.querySelector('#cardsContainer');

    this.appModel.sortData.sort(filteredData);
    this.appView.renderFilteredData.render(filteredData);

    if (!filteredData.length) {
      cardsContainer?.classList.add('notification');
    } else {
      cardsContainer?.classList.remove('notification');
    }
  }

  clearStorageValues() {
    this.storageManager.delete('search-value');
    this.storageManager.delete('count-values');
    this.storageManager.delete('year-values');
    this.storageManager.delete('shape-values');
    this.storageManager.delete('color-values');
    this.storageManager.delete('size-values');
    this.storageManager.delete('is-checked');
  }

  resetFilters() {
    const resetFiltersButton = document.querySelector<HTMLElement>('#resetFiltersButton');
    const valueBtns = document.querySelectorAll('[data-filter]');
    const minDefaultRangeFilterValue = 1;
    const maxDefaultRangeFilterValue = 12;
    const minDefaultRangeFilterYear = 1940;
    const maxDefaultRangeFilterYear = 2020;

    if (resetFiltersButton) {
      resetFiltersButton.addEventListener('click', () => {
        if (this.countSlider) {
          this.countSlider.noUiSlider.set([minDefaultRangeFilterValue, maxDefaultRangeFilterValue]);
        }

        if (this.yearSlider) {
          this.yearSlider.noUiSlider.set([minDefaultRangeFilterYear, maxDefaultRangeFilterYear]);
        }

        if (this.searchBar) {
          this.searchBar.value = '';
        }

        if (valueBtns) {
          valueBtns.forEach((button) => {
            if (button.classList.contains('active')) {
              button.classList.remove('active');
            }
          });
        }

        if (this.checkbox) {
          this.checkbox.checked = false;
        }

        this.clearStorageValues();

        this.appModel.valuesFilter.reset();

        this.setFilteredData();
      });
    }
  }

  initFilters() {
    this.search();
    this.sort();
    this.setRangeSlider();
    this.setRangeValues();
    this.addToFavorites();
    this.addToFavorite();
    this.setFavoritesCounter();
    this.setActiveButtons();
    this.resetFilters();

    this.setFilteredData();
    this.appView.toyToFavorite.modal.init('Извините, все слоты заполнены');
  }
}

export default FiltersController;
