import Controller from '@ember/controller';
import { setup } from 'ember-prism';

export default class ApplicationController extends Controller {
  init() {
    super.init(...arguments);
    setup();
  }
}
