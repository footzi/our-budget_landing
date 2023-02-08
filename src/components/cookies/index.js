const COOKIES_LS = 'COOKIES_LS';

export class Cookies {
  constructor() {
    this.container = document.querySelector('#js-cookies');

    if (this.container) {
      this.button = this.container.querySelector('#js-cookies__button');
      this.bindEvents();
    }
  }

  bindEvents() {
    window.addEventListener('load', () => {
      this.init();
    });

    this.button.addEventListener('click', () => {
      this.hide();
    });
  }

  init() {
    const isShowed = window.localStorage.getItem(COOKIES_LS);

    if (!Boolean(isShowed)) {
      this.show();
    }
  }

  show() {
    this.container.classList.add('is-show');
  }

  hide() {
    this.container.classList.remove('is-show');

    window.localStorage.setItem(COOKIES_LS, 'true');
  }
}
