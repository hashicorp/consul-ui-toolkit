/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export interface DivSignature {
  Element: HTMLDivElement;
  Args: {
    href?: string;
    isHrefExternal?: boolean;
    route?: string;
    isRouteExternal?: boolean;
    query?: object;
    replace?: string;
    onClick?: any;
  };
}

export default class ListItemComponent extends Component<DivSignature> {
  get route() {
    const { onClick, route, href } = this.args;

    if (route !== undefined) {
      assert(
        `Cut::ListItem" could have applied either @route, @href or @onClick.`,
        onClick === undefined && href === undefined
      );
    }

    return route;
  }

  get href() {
    const { onClick, route, href } = this.args;

    if (href !== undefined) {
      assert(
        `Cut::ListItem" could have applied either @href, @route or @onClick.`,
        onClick === undefined && route === undefined
      );
    }
    return href;
  }

  @action
  onClick() {
    this.onClick?.();
  }
}
