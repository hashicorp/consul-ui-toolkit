/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';

// enum COMPONENT_STATUS {
//   DEVELOPMENT = 'development',
//   COMPLETE = 'complete',
// }

// export interface ComponentSignature {
//   Args: {
//     title?: string;
//     figma?: string;
//     github?: string;
//     status?: COMPONENT_STATUS;
//   };
// }

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
