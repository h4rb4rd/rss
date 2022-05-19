class Router {
  linksContainer = document.querySelector('#navLinks') as HTMLDivElement;
  HTMLAnchorElement = document.querySelector('#mainLink') as HTMLAnchorElement;
  toysLink = document.querySelector('[data-link="toys"]') as HTMLAnchorElement;
  treeLink = document.querySelector('[data-link="tree"]') as HTMLAnchorElement;
  headerControls = document.querySelector('#headerControls') as HTMLDivElement;
  links = document.querySelectorAll('[data-link]');
  searchBar = document.querySelector('#searchBar') as HTMLInputElement;

  init(): void {
    this.linksContainer.addEventListener('click', this.listener);
    this.HTMLAnchorElement.addEventListener('click', this.listener);

    this.links.forEach((link) => {
      if (link instanceof HTMLElement) {
        if (link.dataset.link === (localStorage.getItem('$link-value') || 'logo')) {
          link.click();
        }
      }
    });
  }

  listener = (e: Event): void => {
    const target = e.target as HTMLAnchorElement;
    const value: string = target.dataset.link as string;

    if (target.dataset.link === 'logo' || target.dataset.link === 'toys' || target.dataset.link === 'tree') {
      this.clearActive();
      target.classList.add('active');
      localStorage.setItem('$link-value', value);
    }

    if (target.dataset.link === 'main') {
      this.clearActive();
      this.toysLink.classList.add('active');
      localStorage.setItem('$link-value', value);
    }

    if (target.dataset.link === 'toys' || target.dataset.link === 'main' || target.dataset.link === 'tree') {
      setTimeout(() => this.searchBar.focus(), 0);
      this.headerControls.classList.remove('hide');
      this.toysLink.classList.remove('hide');
      this.treeLink.classList.remove('hide');
    }

    if (target.dataset.link === 'logo') {
      this.headerControls.classList.add('hide');
      this.toysLink.classList.add('hide');
      this.treeLink.classList.add('hide');
    }

    if (target.dataset.link === 'tree') {
      this.searchBar.classList.add('hide');
    }

    if (target.dataset.link === 'toys' || target.dataset.link === 'logo' || target.dataset.link === 'main') {
      this.searchBar.classList.remove('hide');
    }
  };

  clearActive(): void {
    const links = document.querySelectorAll('[data-link]');

    links.forEach((link) => {
      if (link.classList.contains('active')) {
        link.classList.remove('active');
      }
    });
  }
}
export default Router;
