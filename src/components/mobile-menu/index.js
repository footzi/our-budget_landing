export class MobileMenu {
  constructor() {
    this.button = document.querySelector('#js-mobile-menu-button');
    this.menu = document.querySelector('#js-mobile-menu');
    this.links = Array.from(document.querySelectorAll('#js-mobile-menu a')) ?? [];
    this.isOpen = false;

    this.bindEvents();
  }

  bindEvents() {
    this.button.addEventListener('click', () => this.toggle());

    this.links.forEach((link) => {
      link.addEventListener('click', () => this.toggle());
    });
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

    setTimeout(() => {
      this.animate();
    }, 0);
  }

  close() {
    this.animate();

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
