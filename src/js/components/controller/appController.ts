import data from '../../utils/data';
import FiltersController from './filtersController';
import GameController from './gameController';

import { ToyType } from '../../shared/types';

class AppController {
  gameController: GameController;
  filtersController: FiltersController;

  data: Array<ToyType> = data;

  constructor() {
    this.filtersController = new FiltersController(this.data);
    this.gameController = new GameController(this.data);
  }

  initFilters() {
    this.filtersController.initFilters();
  }

  initGame() {
    this.gameController.initGame();
  }
}

export default AppController;
