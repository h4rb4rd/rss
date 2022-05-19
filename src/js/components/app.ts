import AppController from './controller/appController';
import Router from '../utils/router';

class App {
  appController: AppController;
  router: Router;

  constructor() {
    this.appController = new AppController();
    this.router = new Router();
  }

  clearStorage() {
    const button = document.querySelector('#clearStorage');
    button?.addEventListener('click', () => localStorage.clear());
  }

  start() {
    this.appController.initFilters();
    this.appController.initGame();

    this.clearStorage();
    this.router.init();
  }
}

export default App;
