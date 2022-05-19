import { CreateCarType } from '../shared/types';

class CarsGenerator {
  private hexLetters = '0123456789ABCDEF';
  private brands = ['Nissan', 'Porsche', 'Audi', 'Hyundai', 'Ford', 'Volkswagen', 'Honda', 'BMW', 'Mercedes-Benz', 'Toyota'];
  private models = ['Juke', 'Cayenne', 'A4', 'Elantra', 'Fusion', 'Jetta', 'Civic', 'M5', 'G63', 'Camry'];

  private getRandomCarName = (): string => {
    const brand = this.brands[Math.floor(Math.random() * this.brands.length)];
    const model = this.models[Math.floor(Math.random() * this.models.length)];

    return `${brand} ${model}`;
  };

  private getRandomCarColor = () => {
    let carColor = '#';

    for (let i = 0; i < 6; i += 1) {
      carColor += this.hexLetters[Math.floor(Math.random() * 16)];
    }

    return carColor;
  };

  generateRandomCars = (carCount = 100): Array<CreateCarType> =>
    new Array(carCount).fill(1).map(() => ({ name: this.getRandomCarName(), color: this.getRandomCarColor() }));
}

export default CarsGenerator;
