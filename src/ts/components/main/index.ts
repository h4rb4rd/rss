import Component from '../../utils/component';
import Router from '../../utils/Router';
import Store from '../../services/store';
import { StateType } from '../../shared/types';

class Main extends Component {
  private container: Component;
  private content?: Component;
  private router?: Router;
  private store: Store;
  private state: StateType;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', ['main']);

    this.store = Store.getInstance();
    this.state = this.store.getState();
    this.store.subscribe(this.render);

    this.container = new Component(this.element, 'div', ['container']);
    this.store.setState().catch((err) => {
      throw err;
    });

    this.render();
  }

  render = () => {
    if (this.content) {
      this.content.destroy();
    }

    this.content = new Component(this.container.element, 'div', ['main-content']);
    this.router = new Router(this.content.element);
    this.router.initRouter();
  };
}

export default Main;
