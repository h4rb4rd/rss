import Component from '../../utils/component';

class Header extends Component {
  private container: Component;
  private content: Component;
  private navItems: Component[] = [];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['header']);

    this.container = new Component(this.element, 'div', ['container']);
    this.content = new Component(this.container.element, 'div', ['header-content']);

    this.setNavLinks();
    this.setLogo();
  }

  private setNavLinks() {
    const headerMenu = new Component(this.content.element, 'nav', ['header-menu']);
    const linkToGarage = new Component(headerMenu.element, 'a', ['header-link', 'btn', 'active'], 'Garage');
    const linkToWinners = new Component(headerMenu.element, 'a', ['header-link', 'btn'], 'Winners');

    this.navItems = [linkToGarage, linkToWinners];
    linkToGarage.element.setAttribute('href', '#/garage');
    linkToWinners.element.setAttribute('href', '#/winners');

    window.addEventListener('hashchange', () => this.updateActiveLink(this.navItems));
    window.addEventListener('load', () => linkToGarage.element.click());
  }

  private setLogo() {
    const headerLogo = new Component(this.content.element, 'div', ['header-logo']);
    const img = this.createLogoImg();

    headerLogo.element.append(img);

    new Component(headerLogo.element, 'p', ['header-title'], 'Async Race');
  }

  private createLogoImg(): HTMLImageElement {
    const img = document.createElement('img');
    const imgSrc = require('../../../assets/images/header/logo.png') as string;

    img.classList.add('header-image');
    img.src = imgSrc;
    img.setAttribute('alt', 'car-logo');

    return img;
  }

  private updateActiveLink(navItems: Component[]) {
    this.navItems = navItems.map((item): Component => {
      item.element.classList.remove('active');
      if (item.element.getAttribute('href') === window.location.hash) {
        item.element.classList.add('active');
      }

      return item;
    });
  }
}

export default Header;
