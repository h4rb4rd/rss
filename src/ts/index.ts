// main imports
import '../index.html';
import '../scss/index.scss';

// parts
import App from './components/app';

window.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.body;
  new App(rootElement);
});
