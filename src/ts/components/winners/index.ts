import Component from '../../utils/component';
import carImage from '../../shared/car-image';
import Heading from '../heading';
import Pagination from '../pagination';
import Store from '../../services/store';
import WinnersContainer from '../../containers/winners-container';

import { CarType, StateType } from '../../shared/types';

class Winners extends Component {
  private store: Store;
  private state: StateType;
  private heading?: Heading;
  private pagination?: Pagination;
  private table: Component;
  private list?: Component;
  private winnersContainer: WinnersContainer;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['winners']);

    this.store = Store.getInstance();
    this.state = this.store.getState();
    this.winnersContainer = new WinnersContainer();
    this.table = new Component(this.element, 'div', ['winners-table']);

    this.initTable();
  }

  private createHeading() {
    const page = this.state.winnersPage.page;
    const count = this.state.winnersPage.count;
    this.heading = new Heading(this.table.element, 'winners', count, page);
  }

  private createPagination() {
    this.pagination = new Pagination(this.element, 'winners');
  }

  private createTableFilters() {
    const filters = new Component(this.table.element, 'div', ['table-filters']);
    const idSortBtn = new Component(filters.element, 'button', ['filters-item'], 'Number');
    new Component(filters.element, 'span', ['filters-item'], 'Car');
    new Component(filters.element, 'span', ['filters-item'], 'Name');
    const winsSortBtn = new Component(filters.element, 'button', ['filters-item'], 'Wins');
    const timeSortBtn = new Component(filters.element, 'button', ['filters-item'], 'Best Time');

    idSortBtn.element.setAttribute('data-sort', 'id');
    winsSortBtn.element.setAttribute('data-sort', 'wins');
    timeSortBtn.element.setAttribute('data-sort', 'time');

    idSortBtn.element.addEventListener('click', () => this.winnersContainer.sortById(this.createTableList));
    winsSortBtn.element.addEventListener('click', () => this.winnersContainer.sortByWins(this.createTableList));
    timeSortBtn.element.addEventListener('click', () => this.winnersContainer.sortByTime(this.createTableList));
  }

  private createTableList = () => {
    if (this.list) {
      this.list.destroy();
    }

    this.list = new Component(this.table.element, 'ul', ['table-list']);
    const winners = this.state.winnersPage.winners;

    if (winners) {
      winners.forEach(async (winner) => {
        const winnerCar: CarType | null = await this.store.api.getCar(winner.id);

        if (winnerCar) {
          const { name, color } = winnerCar;
          const { id, wins, time } = winner;

          if (this.list) {
            this.createTableListItem(this.list.element, id, name, color, wins, time);
          }
        }
      });
    }
  };

  private createTableListItem(parentNode: HTMLElement, id: number, model: string, color: string, wins: number, time: number) {
    const item = new Component(parentNode, 'li', ['table-item']);
    new Component(item.element, 'span', undefined, `${id}`);
    const car = new Component(item.element, 'div', ['table-item']);
    car.element.innerHTML = carImage(`${color}`);
    new Component(item.element, 'span', undefined, `${model}`);
    new Component(item.element, 'span', undefined, `${wins}`);
    new Component(item.element, 'span', undefined, `${time}`);
  }

  private initTable() {
    this.createHeading();

    this.createTableFilters();
    this.createTableList();
    this.createPagination();
  }
}

export default Winners;
