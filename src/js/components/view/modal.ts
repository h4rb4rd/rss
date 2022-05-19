class Modal {
  modal = document.createElement('div');
  body = document.querySelector('body');

  init(text: string): void {
    this.modal.id = 'modal';
    this.modal.classList.add('modal');

    // prettier-ignore
    this.modal.insertAdjacentHTML('afterbegin',
      `
    <div class="modal__overlay" data-close="true">
      <div class="modal__content">
        <p class="modal__text">${text}</p>
        <button type="text" class="btn modal__close" data-close="true">&#10006;</button>
      </div>
    </div>
    `,
    );

    document.body.appendChild(this.modal);
    this.modal.addEventListener('click', this.listener);
  }

  listener = (e: Event): void => {
    const target = e.target as HTMLDivElement;
    if (target.dataset.close === 'true') {
      this.close();
    }
  };

  open(): void {
    if (this.body instanceof HTMLBodyElement) {
      this.body.classList.add('lock');
      this.modal.classList.add('open');
    }
  }

  close(): void {
    if (this.body instanceof HTMLBodyElement) {
      this.body.classList.remove('lock');
      this.modal.classList.remove('open');
    }
  }
}

export default Modal;
