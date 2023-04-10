import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ListItem extends Component {
  onItemClicked() {
    console.log('clicked');
  }

  @action
  onItemClick() {
    console.log('regular on works');
  }
}
