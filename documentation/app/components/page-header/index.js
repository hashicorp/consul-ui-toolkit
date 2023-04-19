/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';

const STATUS_BADGES = {
  development: {
    text: 'Dev In Progress',
    color: 'warning',
    icon: 'alert-triangle',
  },
};

export default class PageHeader extends Component {
  get badge() {
    return STATUS_BADGES[this.args.status];
  }
}
