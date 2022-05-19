import CarsGenerator from '../utils/cars-generator';
import DrivingAnimation from '../utils/driving-animation';
import Store from '../services/store';
import { CarType, CreateCarType, DrivingStatusType, EngineType, RaceType, StateType } from '../shared/types';

class GarageContainer {
  private cardId: number | null = Number(localStorage.getItem('car-id')) || null;
  private carsGenerator: CarsGenerator;
  private drivingAnimation: DrivingAnimation;
  private store: Store;
  private state: StateType;

  constructor() {
    this.carsGenerator = new CarsGenerator();
    this.drivingAnimation = new DrivingAnimation();
    this.store = Store.getInstance();
    this.state = this.store.getState();
  }

  private createCarObject = (e: Event): CreateCarType => {
    const target = e.target as HTMLFormElement;
    const inputs = Object.values(target).filter((el: HTMLInputElement) => el.tagName === 'INPUT') as Array<HTMLInputElement>;
    const [textInput, colorInput] = inputs;

    return {
      name: textInput.value || 'Lada',
      color: colorInput.value,
    };
  };

  private raceAll = async (promises: Array<Promise<DrivingStatusType>>, ids: number[]): Promise<RaceType> => {
    const { success, id, time } = await Promise.race(promises);

    if (!success) {
      const failedIndex = ids.findIndex((i) => i === id);
      const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
      const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
      return this.raceAll(restPromises, restIds);
    }

    const winner: CarType = this.state.garagePage.cars.filter((car: CarType): boolean => car.id === id)[0];

    return {
      ...winner,
      time: Number((time / 1000).toFixed(2)),
    };
  };

  private race = async (action: { (id: number): Promise<DrivingStatusType> }): Promise<RaceType> => {
    const promises = this.state.garagePage.cars.map(({ id }) => action(id));

    const winner = await this.raceAll(
      promises,
      this.state.garagePage.cars.map((car: { name: string; color: string; id: number }) => car.id)
    );

    return winner;
  };

  addCar = (e: Event) => {
    e.preventDefault();

    const newCar = this.createCarObject(e);

    localStorage.removeItem('newCar-name');
    localStorage.removeItem('newCar-color');

    this.store.api
      .createCar(newCar)
      .then(async () => {
        await this.store.setState();
      })
      .catch((err) => {
        throw err;
      });
  };

  updateCar = (e: Event) => {
    e.preventDefault();

    if (this.cardId) {
      const newCar = this.createCarObject(e);

      localStorage.removeItem('car-name');
      localStorage.removeItem('car-color');
      localStorage.removeItem('car-id');

      this.store.api
        .updateCar(newCar, this.cardId)
        .then(async () => {
          await this.store.setState();
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  startRace = () => {
    const raceBtn = document.querySelector('[data-button="race"]');
    const resetBtn = document.querySelector('[data-button="reset"]');
    const updateBtn = document.querySelector('[data-btn="update"]');
    const message = document.getElementById('message') as HTMLElement;
    const page = this.state.winnersPage.page;
    const limit = this.state.winnersPage.limit;

    raceBtn?.setAttribute('disabled', 'true');
    updateBtn?.setAttribute('disabled', 'true');

    this.race(this.startEngine)
      .then(async (res) => {
        resetBtn?.removeAttribute('disabled');
        updateBtn?.removeAttribute('disabled');

        message.innerHTML = `First place: ${res.name} ${res.time}s!`;
        message.classList.remove('hidden');

        const prevRes = await this.store.api.getWinner(res.id);
        const winnerId = res.id;
        const bestTime = (prevRes && prevRes.time) < res.time ? prevRes.time : res.time;
        const winnerResult = { id: winnerId, time: bestTime };

        await this.store.api
          .saveWinner(winnerResult)
          .then(async () => {
            const winners = await this.store.api.getWinners(page, limit);

            if (winners) {
              this.state.winnersPage.winners = winners.result;
            }
          })
          .then(() => {
            setTimeout(() => {
              message.classList.add('hidden');
            }, 3000);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  };

  resetRace = () => {
    const resetBtn = document.querySelector('[data-button="reset"]');
    const raceBtn = document.querySelector('[data-button="race"]');

    resetBtn?.setAttribute('disabled', 'true');
    raceBtn?.removeAttribute('disabled');

    this.state.garagePage.cars.map(({ id }) => this.breakEngine(id));
  };

  createRandomCars = () => {
    const cars = this.carsGenerator.generateRandomCars();

    Promise.all(cars.map((car) => this.store.api.createCar(car)))
      .then(async () => {
        await this.store.setState();
      })
      .catch((err) => {
        throw err;
      });
  };

  deleteCar(id: number) {
    this.store.api
      .deleteCar(id)
      .then(async () => {
        await this.store.api.deleteWinner(id);
      })
      .then(async () => {
        await this.store.setState();
      })
      .catch((err) => {
        throw err;
      });
  }

  selectCar(id: number) {
    const textInput = document.querySelector('[data-text="update"]');
    const colorInput = document.querySelector('[data-color="update"]');
    const updateBtn = document.querySelector('[data-btn="update"]');

    this.store.api
      .getCar(id)
      .then((car) => {
        if (car && textInput instanceof HTMLInputElement) {
          textInput.value = car.name;
          localStorage.setItem('car-name', car.name);
          textInput.focus();
        }
        if (car && colorInput instanceof HTMLInputElement) {
          colorInput.value = car.color;
          localStorage.setItem('car-color', car.color);
        }
        this.cardId = id;
        localStorage.setItem('car-id', `${id}`);
        updateBtn?.removeAttribute('disabled');
      })
      .catch((err) => {
        throw err;
      });
  }

  startEngine = async (id: number): Promise<DrivingStatusType> => {
    const btnA = document.querySelector(`[data-start="${id}"]`);
    const btnB = document.querySelector(`[data-break="${id}"]`);
    const car = document.querySelector(`[data-car="${id}"]`);
    const finish = document.querySelector(`[data-finish="${id}"]`);
    const remove = document.querySelector(`[data-remove="${id}"]`);
    const select = document.querySelector(`[data-select="${id}"]`);

    btnA?.setAttribute('disabled', 'true');
    btnB?.removeAttribute('disabled');

    remove?.setAttribute('disabled', 'true');
    select?.setAttribute('disabled', 'true');

    const { velocity, distance }: EngineType = await this.store.api.startEngine(id);

    const time = Math.round(distance / velocity);

    if (car instanceof HTMLElement && finish instanceof HTMLElement) {
      const distanceBtwElem = Math.floor(this.drivingAnimation.getDistanceBtwElements(car, finish)) + 100;

      this.state.garagePage.animation[id] = this.drivingAnimation.animation(car, distanceBtwElem, time);
    }

    const { success } = await this.store.api.drivingStatus(id);
    if (!success) window.cancelAnimationFrame(this.state.garagePage.animation[id].id);

    return { success, id, time };
  };

  breakEngine = (id: number) => {
    const btnA = document.querySelector(`[data-start="${id}"]`);
    const btnB = document.querySelector(`[data-break="${id}"]`);
    const car = document.querySelector(`[data-car="${id}"]`);
    const remove = document.querySelector(`[data-remove="${id}"]`);
    const select = document.querySelector(`[data-select="${id}"]`);

    btnB?.setAttribute('disabled', 'true');

    remove?.removeAttribute('disabled');
    select?.removeAttribute('disabled');

    this.store.api
      .stopEngine(id)
      .then(() => {
        btnA?.removeAttribute('disabled');

        if (car instanceof HTMLElement) {
          car.style.transform = 'translateX(0)';
          if (this.state.garagePage.animation[id]) {
            window.cancelAnimationFrame(this.state.garagePage.animation[id].id);
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}

export default GarageContainer;
