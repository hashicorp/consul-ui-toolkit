/**
 * Copyright (c) HashiCorp, Inc.
 */

import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class ListItemComponent extends Component {
  onItemClicked() {
    console.log('clicked');
  }

  @action
  onItemClick() {
    console.log('regular on works');
  }
}
