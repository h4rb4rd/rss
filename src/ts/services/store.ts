import { StateType } from '../shared/types';
import Api from './api';

class Store {
  private static instance: Store;

  api: Api;

  private state: StateType = {
    garagePage: {
      cars: [],
      count: '',
      pages: 1,
      page: 1,
      limit: 7,
      animation: {},
    },
    winnersPage: {
      winners: [],
      count: '',
      pages: 1,
      page: 1,
      limit: 10,
      sort: 'time',
      order: 'ASC',
    },
  };

  private constructor() {
    this.api = new Api();
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }

    return Store.instance;
  }

  async setState(
    carsPage = this.state.garagePage.page,
    winnersPage = this.state.winnersPage.page,
    carsLimit = this.state.garagePage.limit,
    winnersLimit = this.state.winnersPage.limit
  ) {
    const sort = this.state.winnersPage.sort;
    const oder = this.state.winnersPage.order;

    const carsData = await this.api.getCars(carsPage, carsLimit);
    const winnersData = await this.api.getWinners(winnersPage, winnersLimit, sort, oder);

    if (carsData) {
      this.state.garagePage.cars = carsData.cars;
      this.state.garagePage.count = carsData.count;
      this.state.garagePage.pages = Math.ceil(Number(carsData.count) / carsLimit);
      this.state.garagePage.page = carsPage;
      this.state.garagePage.limit = carsLimit;
    }

    if (winnersData) {
      this.state.winnersPage.winners = winnersData.result;
      this.state.winnersPage.count = winnersData.totalCount;
      this.state.winnersPage.pages = Math.ceil(Number(winnersData.totalCount) / winnersLimit);
      this.state.winnersPage.page = winnersPage;
      this.state.winnersPage.limit = winnersLimit;
    }

    this.rerenderEntireTree();
  }

  rerenderEntireTree() {
    console.log('state was changed');
  }

  subscribe(observer: () => void) {
    this.rerenderEntireTree = observer;
  }

  getState(): StateType {
    return this.state;
  }
}

export default Store;
