import { USER_LS } from '@/constants';
import template from './widget.pug';
import CONSTANTS from '@/constants/index.json';

export class UserWidget {
  constructor() {
    this.container = document.querySelector('#js-user-widget');
    this.links = Array.from(document.querySelectorAll('.js-app-link')) ?? [];

    this.mobileLoginNav = document.querySelector('#js-mobile-menu__login-nav');
    this.mobileAppNav = document.querySelector('#js-mobile-menu__app-nav');

    if (this.container) {
      this.init();
    }
  }

  async init() {
    const userName = this.getUserName();

    if (userName) {
      this.renderTemplate(userName);
      this.changeLinks('Войти', CONSTANTS.pages.login);
      this.changeLinks('Войти', CONSTANTS.pages.app);
      this.showWidget();
      this.changeMobileWidget();
    }

    if (!userName) {
      this.showWidget();
    }
  }

  getUserName() {
    try {
      const value = localStorage.getItem(USER_LS);

      if (!value) {
        return null;
      }
      return JSON.parse(value).firstName ?? null;
    } catch {
      return null;
    }
  }

  showWidget() {
    this.container.classList.add('is-show');
  }

  changeMobileWidget() {
    this.mobileLoginNav.classList.add('is-hidden');
    this.mobileAppNav.classList.remove('is-hidden');
  }

  renderTemplate(firstName) {
    this.container.innerHTML = '';
    this.container.innerHTML = template({ firstName });
  }

  changeLinks(name, href) {
    this.links.forEach((link) => {
      link.innerHTML = name;
      link.setAttribute('href', href);
    });
  }
}
