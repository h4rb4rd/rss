import Component from '../../utils/component';

class Heading {
  constructor(private parentNode: HTMLElement, private type: string, private count: string, private page: number) {
    this.render();
  }

  private createCarsCount() {
    const title = new Component(this.parentNode, 'h2', ['title'], this.type === 'garage' ? 'Garage ' : 'Winners ');
    new Component(title.element, 'span', undefined, `(${this.count})`);
  }

  private createPageNumber() {
    const title = new Component(this.parentNode, 'p', ['page'], 'Page ');
    new Component(title.element, 'span', undefined, `#${this.page}`);
  }

  render() {
    this.createCarsCount();
    this.createPageNumber();
  }
}

export default Heading;
