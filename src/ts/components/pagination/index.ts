import Component from '../../utils/component';
import Store from '../../services/store';
import { StateType } from '../../shared/types';

class Pagination extends Component {
  store: Store;
  state: StateType;

  constructor(parentNode: HTMLElement, private page: string) {
    super(parentNode, 'div', ['pagination']);

    this.store = Store.getInstance();
    this.state = this.store.getState();
    this.createPaginationButtons(this.element);
  }

  createPaginationButtons(parentNode: HTMLElement) {
    const btnPrev = new Component(parentNode, 'button', ['pagination-button', 'btn'], '< Prev');
    const btnNext = new Component(parentNode, 'button', ['pagination-button', 'btn'], 'Next >');

    btnPrev.element.addEventListener('click', this.getPrevPage);
    btnNext.element.addEventListener('click', this.getNextPage);
  }

  getNextPage = () => {
    if (this.page === 'garage') {
      const { garagePage } = this.state;

      if (garagePage.page < garagePage.pages) {
        ++garagePage.page;

        this.store.setState().catch((err) => {
          throw err;
        });
      }
    }

    if (this.page === 'winners') {
      const { winnersPage } = this.state;

      if (winnersPage.page < winnersPage.pages) {
        ++winnersPage.page;

        this.store.setState().catch((err) => {
          throw err;
        });
      }
    }
  };

  getPrevPage = () => {
    if (this.page === 'garage') {
      const { garagePage } = this.state;

      if (garagePage.page > 1) {
        --garagePage.page;

        this.store.setState().catch((err) => {
          throw err;
        });
      }
    }

    if (this.page === 'winners') {
      const { winnersPage } = this.state;

      if (winnersPage.page > 1) {
        --winnersPage.page;

        this.store.setState().catch((err) => {
          throw err;
        });
      }
    }
  };
}

export default Pagination;
