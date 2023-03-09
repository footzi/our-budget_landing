export class Dropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.content = this.dropdown.querySelector('.dropdown__content');
    this.container = this.dropdown.querySelector('.dropdown__container');

    this.isOpen = false;

    this.bindEvents();
  }

  bindEvents() {
    this.dropdown.addEventListener('click', this.handleClick.bind(this));
    this.dropdown.addEventListener('keydown', (event) => {
      const isEnter = event.code === 'Enter' || event.code === '13';
      const isSpace = event.code === 'Space' || event.code === '32';

      if (isEnter || isSpace) {
        this.handleClick();
      }
    });
    window.addEventListener('resize', this.repaint.bind(this));
  }

  handleClick() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    const contentHeight = this.content.offsetHeight;
    this.container.style.height = contentHeight + 'px';
    this.dropdown.classList.add('is-open');
    this.dropdown.setAttribute('aria-expanded', true);

    this.isOpen = true;
  }

  close() {
    this.container.style.height = 0;
    this.dropdown.classList.remove('is-open');
    this.dropdown.setAttribute('aria-expanded', false);

    this.isOpen = false;
  }

  repaint() {
    if (!this.isOpen) {
      return;
    }

    const contentHeight = this.content.offsetHeight;
    this.container.style.height = contentHeight + 'px';
  }
}
