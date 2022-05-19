import Header from './header';
import Main from './main';
import Footer from './footer';

class App {
  private header: Header;
  private main: Main;
  private footer: Footer;

  constructor(private rootElement: HTMLElement) {
    this.header = new Header(this.rootElement);
    this.main = new Main(this.rootElement);
    this.footer = new Footer(this.rootElement);
  }
}

export default App;
