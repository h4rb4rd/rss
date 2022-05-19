import Component from '../../utils/component';
import carImage from '../../shared/car-image';
import finishImage from '../../shared/finish-image';
import GarageContainer from '../../containers/garage-container';
import Heading from '../heading';
import Pagination from '../pagination';
import Store from '../../services/store';

import { StateType } from '../../shared/types';

class Garage extends Component {
  garageContainer: GarageContainer;
  heading?: Heading;
  pagination?: Pagination;
  store: Store;
  state: StateType;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['garage']);

    this.garageContainer = new GarageContainer();
    this.store = Store.getInstance();
    this.state = this.store.getState();

    this.renderGarage();
  }

  private createHeading(parentNode: HTMLElement) {
    const count = this.state.garagePage.count;
    const page = this.state.garagePage.page;

    this.heading = new Heading(parentNode, 'garage', count, page);
  }

  private createPagination() {
    this.pagination = new Pagination(this.element, 'garage');
  }

  private addListener(element: HTMLElement, key: string) {
    element.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;

      if (target) {
        localStorage.setItem(`${key}`, `${target.value}`);
      }
    });
  }

  private addCurrentValue(element: HTMLElement, button: HTMLElement, key: string) {
    if (element instanceof HTMLInputElement) {
      const value = localStorage.getItem(`${key}`);

      if (value) {
        element.value = value;
        button.removeAttribute('disabled');
      }
    }
  }

  private createOptionsSet(parentNode: HTMLElement, btnText: string, type: string) {
    const formSet = new Component(parentNode, 'form', ['options-set']);
    const textInput = new Component(formSet.element, 'input', ['text-input']);
    const colorInput = new Component(formSet.element, 'input', ['color-input']);
    const button = new Component(formSet.element, 'button', ['options-btn', 'btn'], btnText);

    textInput.element.setAttribute('type', 'text');
    textInput.element.setAttribute('data-text', type);
    colorInput.element.setAttribute('type', 'color');
    colorInput.element.setAttribute('data-color', type);
    button.element.setAttribute('type', 'submit');

    if (type === 'create') {
      formSet.element.addEventListener('submit', this.garageContainer.addCar);

      this.addListener(textInput.element, 'newCar-name');
      this.addListener(colorInput.element, 'newCar-color');

      this.addCurrentValue(textInput.element, button.element, 'newCar-name');
      this.addCurrentValue(colorInput.element, button.element, 'newCar-color');
    }

    if (type === 'update') {
      button.element.setAttribute('data-btn', 'update');
      button.element.setAttribute('disabled', 'true');
      formSet.element.addEventListener('submit', this.garageContainer.updateCar);

      this.addCurrentValue(textInput.element, button.element, 'car-name');
      this.addCurrentValue(colorInput.element, button.element, 'car-color');
    }
  }

  private createOptionsButtons(parentNode: HTMLElement) {
    const container = new Component(parentNode, 'div', ['options-buttons']);
    const raceBtn = new Component(container.element, 'button', ['options-button', 'btn'], 'Race');
    const resetBtn = new Component(container.element, 'button', ['options-button', 'btn', 'btn--red'], 'Reset');
    const generateBtn = new Component(container.element, 'button', ['options-button', 'btn'], 'Generate Cars');

    raceBtn.element.setAttribute('data-button', 'race');
    resetBtn.element.setAttribute('data-button', 'reset');
    resetBtn.element.setAttribute('disabled', 'true');

    generateBtn.element.addEventListener('click', this.garageContainer.createRandomCars);
    raceBtn.element.addEventListener('click', this.garageContainer.startRace);
    resetBtn.element.addEventListener('click', this.garageContainer.resetRace);
  }

  private createOptions() {
    const options = new Component(this.element, 'div', ['garage-options']);
    this.createOptionsSet(options.element, 'Create', 'create');
    this.createOptionsSet(options.element, 'Update', 'update');
    this.createOptionsButtons(options.element);
  }

  private createTracks() {
    const traks = new Component(this.element, 'div', ['garage-tracks']);

    this.createHeading(traks.element);
    this.createTracksList(traks.element);
  }

  private createTracksList(parentNode: HTMLElement) {
    const tracksList = new Component(parentNode, 'ul', ['tracks-list']);
    const cars = this.state.garagePage.cars;

    if (cars) {
      cars.forEach((car) => {
        this.createTracksItem(tracksList.element, car.id, car.name, car.color);
      });
    }
  }

  private createTracksItem(parentNode: HTMLElement, id: number, model: string, color: string) {
    const tracksListItem = new Component(parentNode, 'li', ['tracks-item']);
    this.createTracksItemHeading(tracksListItem.element, id, model);
    this.createTracksItemContent(tracksListItem.element, id, color);
  }

  private createTracksItemHeading(parentNode: HTMLElement, id: number, model: string) {
    const heading = new Component(parentNode, 'div', ['track-heading']);
    const selectBtn = new Component(heading.element, 'button', ['track-button', 'btn'], 'Select');
    const removeBtn = new Component(heading.element, 'button', ['track-button', 'btn', 'btn--red'], 'Remove');
    new Component(heading.element, 'div', ['track-model'], model);

    removeBtn.element.setAttribute('data-remove', `${id}`);
    selectBtn.element.setAttribute('data-select', `${id}`);

    removeBtn.element.addEventListener('click', () => this.garageContainer.deleteCar(id));
    selectBtn.element.addEventListener('click', () => this.garageContainer.selectCar(id));
  }

  private createTracksItemContent(parentNode: HTMLElement, id: number, color: string) {
    const content = new Component(parentNode, 'div', ['track-content']);
    this.createTrackItemControls(content.element, id);
    this.createTrackItemRoad(content.element, color, id);
  }

  private createTrackItemControls(parentNode: HTMLElement, id: number) {
    const controls = new Component(parentNode, 'div', ['track-controls']);
    const btnA = new Component(controls.element, 'button', ['controls-button', 'btn'], 'A');
    const btnB = new Component(controls.element, 'button', ['controls-button', 'btn', 'btn--red'], 'B');

    btnA.element.setAttribute('data-start', `${id}`);
    btnB.element.setAttribute('data-break', `${id}`);
    btnB.element.setAttribute('disabled', 'true');

    btnA.element.addEventListener('click', () => this.garageContainer.startEngine(id));
    btnB.element.addEventListener('click', () => this.garageContainer.breakEngine(id));
  }

  private createTrackItemRoad(parentNode: HTMLElement, color: string, id: number) {
    const road = new Component(parentNode, 'div', ['track-road']);
    const car = new Component(road.element, 'div', ['track-car']);
    const finish = new Component(road.element, 'div', ['track-finish']);

    car.element.setAttribute('data-car', `${id}`);
    finish.element.setAttribute('data-finish', `${id}`);

    car.element.innerHTML = carImage(color);
    finish.element.innerHTML = finishImage();
  }

  private createMessageWindow() {
    const message = new Component(this.element, 'span', ['winner']);
    message.element.setAttribute('id', 'message');
    message.element.classList.add('hidden');
    message.element.textContent = 'First place: Lada 203s!';
  }

  private renderGarage() {
    this.createOptions();
    this.createTracks();
    this.createMessageWindow();
    this.createPagination();
  }
}

export default Garage;
