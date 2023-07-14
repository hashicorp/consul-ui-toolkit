import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ListComponent extends Component {
  @action
  applyFilter(name, values) {
    console.log(name, values);
  }
}
