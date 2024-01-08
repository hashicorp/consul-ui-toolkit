/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import type { ListItemSignature } from './types';

export default class ListItemComponent extends Component<ListItemSignature> {
  get route() {
    const { onClick, route, href } = this.args;

    if (route !== undefined) {
      assert(
        `Cut::ListItem" could have applied either @route, @href or @onClick.`,
        onClick === undefined && href === undefined,
      );
    }

    return route;
  }

  get href() {
    const { onClick, route, href } = this.args;

    if (href !== undefined) {
      assert(
        `Cut::ListItem" could have applied either @href, @route or @onClick.`,
        onClick === undefined && route === undefined,
      );
    }
    return href;
  }

  @action
  onClickAction() {
    // action handles case when no @onClick handler passed to the component
    this.args.onClick?.();
  }
}
