export type ToyType = {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
};

export type SavedTreeType = {
  treeId?: string;
  treeImg?: string;
  bgId?: string;
  bgSrc?: string;
  imgSrc?: string;
  treeToys: Array<SavedToyType>;
};

export type SavedToyType = {
  id: string;
  top: string;
  left: string;
};
