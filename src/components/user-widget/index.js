import { USER_LS } from '@/constants';
import template from './widget.pug';
import CONSTANTS from '@/constants/index.json';

export class UserWidget {
  constructor() {
    this.container = document.querySelector('#js-user-widget');
    this.links = Array.from(document.querySelectorAll('#js-app-link')) ?? [];

    if (this.container) {
      this.init();
    }
  }

  async init() {
    const tokens = this.getUserTokens();

    if (!tokens) {
      return;
    }

    const user = await this.getUser(tokens);

    if (user) {
      this.renderTemplate(user);
      this.showWidget();
      this.changeLinks();
    } else {
      this.showWidget();
    }
  }

  getUserTokens() {
    try {
      const value = localStorage.getItem(USER_LS);

      if (!value) {
        return null;
      }
      return JSON.parse(value).tokens ?? null;
    } catch {
      return null;
    }
  }

  async getUser(tokens) {
    const accessToken = tokens?.accessToken;

    if (!accessToken) {
      return null;
    }

    const header = `Bearer ${accessToken}`;

    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          Authorization: header,
        },
      });

      const data = await response.json();

      if (response.ok && data?.user) {
        return data.user;
      } else {
        throw new Error();
      }
    } catch {
      return null;
    }
  }

  showWidget() {
    this.container.classList.add('is-show');
  }

  renderTemplate(user) {
    this.container.innerHTML = '';
    this.container.innerHTML = template({ firstName: user.firstName });
  }

  changeLinks() {
    this.links.forEach((link) => {
      link.setAttribute('href', CONSTANTS.pages.app);
    });
  }
}
