/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { FilterConfig } from '../filter-bar';
import { inject as service } from '@ember/service';
import RouterService from '@ember/routing/router-service';

/**
 * <List as |L|>
 *  <L.FilterBar as |FB|>
 *  </L.FilterBar>
 *
 *  <L.
 * </List>
 */

interface PaginationArgs {
  Args: {
    nextCursor?: string;
    prevCursor?: string;
    queryFunction?: (page: string) => {
      [key: string]: string | number | unknown;
    };
  };
}

export default class PaginationComponent extends Component<PaginationArgs> {
  @service declare readonly router: RouterService;

  get queryFunction(): (page: string) => {
    [key: string]: string | number | unknown;
  } {
    if (this.args.queryFunction) {
      return this.args.queryFunction;
    } else {
      const queryParams = this.router.currentRoute?.queryParams || {};

      return (page) =>
        Object.assign({}, queryParams, {
          page: page === 'prev' ? this.args.prevCursor : this.args.nextCursor,
        });
    }
  }

  @action
  onPageChange() {
    console.log(...arguments);
  }
}
