export class MobileMenu {
  constructor() {
    this.button = document.querySelector('#js-mobile-menu-button');
    this.menu = document.querySelector('#js-mobile-menu');
    this.overlay = this.menu.querySelector('#js-mobile-menu__overlay');
    this.links = Array.from(this.menu.querySelectorAll('#js-mobile-menu a')) ?? [];
    this.isOpen = false;

    this.bindEvents();
  }

  bindEvents() {
    this.button.addEventListener('click', () => this.toggle());

    this.links.forEach((link) => {
      link.addEventListener('click', () => this.toggle());
    });

    this.overlay.addEventListener('click', () => this.toggle());
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }

    this.button.classList.toggle('is-open');
    this.isOpen = !this.isOpen;
  }

  open() {
    this.show();
    this.button.setAttribute('aria-label', 'Закрыть меню');

    setTimeout(() => {
      this.animate();
    }, 0);
  }

  close() {
    this.animate();
    this.button.setAttribute('aria-label', 'Открыть меню');

    setTimeout(() => {
      this.show();
    }, 300);
  }

  show() {
    this.menu.classList.toggle('is-show');
  }

  animate() {
    this.menu.classList.toggle('is-animate');
  }
}
