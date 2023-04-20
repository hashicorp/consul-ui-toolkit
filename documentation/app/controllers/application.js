/**
 * Copyright (c) HashiCorp, Inc.
 */

import Controller from '@ember/controller';
import { setup } from 'ember-prism';

export default class ApplicationController extends Controller {
  constructor() {
    super(...arguments);
    setup();
  }
}
