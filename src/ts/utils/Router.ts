import { RouteType } from '../shared/types';
import Component from './component';
import Garage from '../components/garage';
import Winners from '../components/winners';

class Router {
  private readonly routes: Array<RouteType>;
  private defaultRoute: RouteType;

  garagePage: Component | undefined;
  winnersPage: Component | undefined;

  constructor(private rootElement: HTMLElement) {
    this.routes = [
      {
        name: '/garage',
        component: () => {
          this.garagePage = new Garage(this.rootElement);
          this.rootElement.append(this.garagePage.element);
        },
      },
      {
        name: '/winners',
        component: () => {
          this.winnersPage = new Winners(this.rootElement);
          this.rootElement.append(this.winnersPage.element);
        },
      },
    ];

    this.defaultRoute = {
      name: 'Default router',
      component: () => {
        this.rootElement.innerHTML = 'Default Page';
      },
    };
  }

  updateRouter() {
    this.rootElement.innerHTML = '';
    const currentRouteName = window.location.hash.slice(1);
    const currentRoute = this.routes.find((page) => page.name === currentRouteName);

    (currentRoute || this.defaultRoute).component();
  }

  initRouter() {
    if (window.location.hash === '') {
      window.location.hash = '#/';
    }

    window.onpopstate = () => this.updateRouter();
    this.updateRouter();
  }
}

export default Router;
