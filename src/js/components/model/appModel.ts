import DataFilter from './filters/dataFilter';
import SortData from './filters/sortData';
import ValuesFilter from './filters/valuesFilter';

import { ToyType } from '../../shared/types';

class AppModel {
  dataFilter: DataFilter;
  sortData: SortData;
  valuesFilter: ValuesFilter;

  constructor(private data: Array<ToyType>) {
    this.dataFilter = new DataFilter(data);
    this.sortData = new SortData();
    this.valuesFilter = new ValuesFilter();
  }
}

export default AppModel;
