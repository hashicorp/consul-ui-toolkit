/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';

export default class ListItemComponent extends Component {
  onItemClicked() {
    console.log('clicked');
  }
}
