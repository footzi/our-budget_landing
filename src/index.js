import './styles/index.less';
import { Dropdown } from './components/dropdown'

document.querySelectorAll('.dropdown').forEach((dropdown) => {
    new Dropdown(dropdown);
});
