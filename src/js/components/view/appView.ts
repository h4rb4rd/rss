import ActiveButtons from './filters/activeButtons';
import Background from './game/background';
import DragAndDrop from './game/dragAndDrop';
import FavoritesFilter from './filters/favoritesFilter';
import FavoritesCount from './filters/favoritesCount';
import Garland from './game/garland';
import Modal from './modal';
import RangeFilter from './filters/rangeFilter';
import RenderFilteredData from './filters/renderFilteredData';
import RenderToys from './renderToys';
import Sound from './game/sound';
import Snow from './game/snow';
import SearchFilter from './filters/searchFilter';
import ToyToFavorite from './filters/toyToFavorite';
import Tree from './game/tree';
import TreeState from './game/treeState';

import { ToyType } from '../../shared/types';

class AppView {
  activeButtons: ActiveButtons;
  background: Background;
  dragAndDrop: DragAndDrop;
  favoritesFilter: FavoritesFilter;
  favoritesCount: FavoritesCount;
  garland: Garland;
  modal: Modal;
  rangeFilter: RangeFilter;
  renderFilteredData: RenderFilteredData;
  renderToys: RenderToys;
  searchFilter: SearchFilter;
  sound: Sound;
  snow: Snow;
  toyToFavorite: ToyToFavorite;
  tree: Tree;
  treeState: TreeState;

  constructor(private data: Array<ToyType>) {
    this.activeButtons = new ActiveButtons();
    this.background = new Background();
    this.dragAndDrop = new DragAndDrop(data);
    this.favoritesFilter = new FavoritesFilter();
    this.favoritesCount = new FavoritesCount(data);
    this.garland = new Garland();
    this.modal = new Modal();
    this.rangeFilter = new RangeFilter();
    this.renderFilteredData = new RenderFilteredData();
    this.renderToys = new RenderToys();
    this.searchFilter = new SearchFilter();
    this.sound = new Sound();
    this.snow = new Snow();
    this.toyToFavorite = new ToyToFavorite(data);
    this.tree = new Tree();
    this.treeState = new TreeState();
  }
}
export default AppView;
