/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import RouterService from '@ember/routing/router-service';
import { PaginationSignature } from 'src/types';

/**
 * `Cut::List::Pagination` provides a wrapper around the `Hds::Pagination::Compact` and `Hds::Pagination::SizeSelector` components.
 *
 * To use with route-based pagination
 * ```
 * <L.Pagination
 *  @pageSizes={{array 5 10 20 30}}
 *  @currentPageSize={{this.size}}
 *  @prevCursor={{this.prevCursor}}
 *  @nextCursor={{this.nextCursor}}
 * />
 * ```
 *
 * To use with functions
 * ```
 * <L.Pagination
 *  @pageSizes={{array 5 10 20 30}}
 *  @currentPageSize={{this.size}}
 *  @prevCursor={{this.prevCursor}}
 *  @nextCursor={{this.nextCursor}}
 *  @onPageChange={{this.updatePage}}
 *  @onPageSizeChange={{this.updatePageSize}}
 * />
 * ```
 *
 * @class PaginationComponent
 *
 * By default the pagination will use the router service to update the existing query params with the `page` and `pageSize` parameters
 * when interacting with the page selectors and the size selectors. You can pass in a `onPageChange` action to have it call a function insteand.
 * The same goes for the size selector, but the argument is `onPageSizeChange`.
 */
export default class PaginationComponent extends Component<PaginationSignature> {
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
          previousPage: page === 'prev' ? this.args.prevCursor : undefined,
          nextPage: page === 'next' ? this.args.nextCursor : undefined,
        });
    }
  }

  @action
  onPageSizeChange(size: number) {
    if (this.args.onPageSizeChange) {
      this.args.onPageSizeChange(size);
    } else {
      const queryParams = this.router.currentRoute?.queryParams || {};
      const newParams = Object.assign({}, queryParams, {
        pageSize: size,
      });

      this.router.transitionTo(this.router.currentRouteName, {
        queryParams: newParams,
      });
    }
  }
}
