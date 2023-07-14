import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FilterBarComponent extends Component {
  @action
  handleButtonClick() {
    window.alert('button was clicked');
  }
}
