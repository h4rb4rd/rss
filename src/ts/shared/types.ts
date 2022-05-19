export type RouteType = {
  name: string;
  component: () => void;
};

export type CarType = {
  id: number;
  name: string;
  color: string;
};

export type WinnerType = {
  id: number;
  time: number;
  wins: number;
};

export type CreateCarType = {
  id?: number;
  name: string;
  color: string;
};

export type GaragePageType = {
  cars: CarType[];
  count: string;
  pages: number;
  page: number;
  limit: number;
  animation: { [key: number]: { id: number } };
};

export type WinnersPageType = {
  winners: WinnerType[];
  count: string;
  pages: number;
  page: number;
  limit: number;
  sort: string;
  order: string;
};

export type StateType = {
  garagePage: GaragePageType;
  winnersPage: WinnersPageType;
};

export type EngineType = {
  velocity: number;
  distance: number;
};

export type DrivingStatusType = {
  success: boolean;
  id: number;
  time: number;
};

export type RaceType = {
  name: string;
  color: string;
  id: number;
  time: number;
};
