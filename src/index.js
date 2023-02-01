import './styles/index.less';
import { Dropdown } from './components/dropdown'
import { UserWidget } from './components/user-widget'

document.querySelectorAll('.dropdown').forEach((dropdown) => {
    new Dropdown(dropdown);
});

new UserWidget();
