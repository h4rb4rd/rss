class Modal {
  constructor(modal) {
    this.modal = modal;
    this.listener = this.listener.bind(this);
  }

  init(options) {
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
    <div class="modal-overlay" data-close=${options.overlayClose}>
      <div class="modal-window">
        <div class="modal-image">${options.image}</div>
        <div class="modal-description">
          <p class="modal-name">${options.name}</p>
          <p class="modal-author">${options.author}</p>
          <p class="modal-year">${options.year}</p>
        </div>
        <button type="text" class="btn modal-close" data-close=${options.btnClose}>${options.btnText}</button>
      </div>
    </div>
    `;
    this.modal.addEventListener('click', this.listener);
  }

  listener({ target }) {
    if (target.dataset.close === 'true') {
      this.close();
    }
  }

  open() {
    this.modal.classList.add('open');
  }

  close() {
    this.modal.classList.remove('open');
  }

  destroy() {
    this.modal.innerHTML = null;
    this.modal.removeEventListener('click', this.listener);
  }
}

export default Modal;
