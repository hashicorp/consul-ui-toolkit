import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ListItemController extends Controller {
  isExpanded = false;

  @action
  alertMe() {
    window.alert('So... you pressed the button... good job!');
  }
}
