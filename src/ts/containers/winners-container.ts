import Store from '../services/store';
import { StateType } from '../shared/types';

class WinnersContainer {
  private store: Store;
  private state: StateType;

  constructor() {
    this.store = Store.getInstance();
    this.state = this.store.getState();
  }

  sortByWins = (callback: () => void) => {
    const winsSortBtn = document.querySelector('[data-sort="wins"]');
    const idSortBtn = document.querySelector('[data-sort="id"]');
    const timeSortBtn = document.querySelector('[data-sort="time"]');

    winsSortBtn?.classList.toggle('active');
    timeSortBtn?.classList.remove('arrow');
    idSortBtn?.classList.remove('arrow');

    if (winsSortBtn?.classList.contains('active')) {
      winsSortBtn?.classList.remove(...['arrow', 'arrow-down']);
      winsSortBtn?.classList.add(...['arrow', 'arrow-up']);
      this.sortWinners('wins', 'ASC', callback);
    } else {
      winsSortBtn?.classList.remove(...['arrow', 'arrow-up']);
      winsSortBtn?.classList.add(...['arrow', 'arrow-down']);
      this.sortWinners('wins', 'DESC', callback);
    }
  };

  sortByTime = (callback: () => void) => {
    const timeSortBtn = document.querySelector('[data-sort="time"]');
    const idSortBtn = document.querySelector('[data-sort="id"]');
    const winsSortBtn = document.querySelector('[data-sort="wins"]');

    timeSortBtn?.classList.toggle('active');
    idSortBtn?.classList.remove('arrow');
    winsSortBtn?.classList.remove('arrow');

    if (timeSortBtn?.classList.contains('active')) {
      timeSortBtn?.classList.remove(...['arrow', 'arrow-down']);
      timeSortBtn?.classList.add(...['arrow', 'arrow-up']);
      this.sortWinners('time', 'ASC', callback);
    } else {
      timeSortBtn?.classList.remove(...['arrow', 'arrow-up']);
      timeSortBtn?.classList.add(...['arrow', 'arrow-down']);
      this.sortWinners('time', 'DESC', callback);
    }
  };

  sortById = (callback: () => void) => {
    const idSortBtn = document.querySelector('[data-sort="id"]');
    const timeSortBtn = document.querySelector('[data-sort="time"]');
    const winsSortBtn = document.querySelector('[data-sort="wins"]');

    idSortBtn?.classList.toggle('active');
    timeSortBtn?.classList.remove('arrow');
    winsSortBtn?.classList.remove('arrow');

    if (idSortBtn?.classList.contains('active')) {
      idSortBtn?.classList.remove(...['arrow', 'arrow-down']);
      idSortBtn?.classList.add(...['arrow', 'arrow-up']);
      this.sortWinners('id', 'ASC', callback);
    } else {
      idSortBtn?.classList.remove(...['arrow', 'arrow-up']);
      idSortBtn?.classList.add(...['arrow', 'arrow-down']);
      this.sortWinners('id', 'DESC', callback);
    }
  };

  private sortWinners = (sort: string, order: string, callback: () => void) => {
    const page = this.state.winnersPage.page;
    const limit = this.state.winnersPage.limit;

    this.store.api
      .getWinners(page, limit, sort, order)
      .then((data) => {
        if (data) {
          this.state.winnersPage.winners = data.result;
          this.state.winnersPage.sort = sort;
          this.state.winnersPage.order = order;
        }
      })
      .then(() => {
        callback();
      })
      .catch((err) => {
        throw err;
      });
  };
}
export default WinnersContainer;
