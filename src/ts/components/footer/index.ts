import Component from '../../utils/component';

class Footer extends Component {
  private container: Component;
  private content: Component;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'footer', ['footer']);
    this.container = new Component(this.element, 'div', ['container']);
    this.content = new Component(this.container.element, 'div', ['footer-content']);

    this.setGithubLink();
    this.setCopyright();
    this.setRssLogo();
  }

  private setGithubLink() {
    const githubLink = new Component(this.content.element, 'a', ['github'], 'Github');
    githubLink.element.setAttribute('href', 'https://github.com/h4rb4rd');
  }

  private setCopyright() {
    new Component(this.content.element, 'span', ['copyright'], '© 2021');
  }

  private setRssLogo() {
    const rssLogoLink = new Component(this.content.element, 'a', ['rsslogo']);
    const img = this.createRssLogoImage();

    rssLogoLink.element.setAttribute('href', 'https://rs.school/js/');
    rssLogoLink.element.append(img);
  }

  private createRssLogoImage(): HTMLImageElement {
    const img = document.createElement('img');
    img.src = require('../../../assets/icons/footer/rss.svg') as string;

    img.setAttribute('alt', 'rss-logo');

    return img;
  }
}

export default Footer;
