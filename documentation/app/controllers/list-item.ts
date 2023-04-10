import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ListItemController extends Controller {
  onItemClicked() {
    console.log('clicked');
  }

  @action
  onItemClick() {
    console.log('regular on works');
  }
}
