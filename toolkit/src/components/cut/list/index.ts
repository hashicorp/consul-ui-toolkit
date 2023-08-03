/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { FilterConfig } from '../filter-bar';

/**
 * <List as |L|>
 *  <L.FilterBar as |FB|>
 *  </L.FilterBar>
 *
 *  <L.
 * </List>
 */

export default class ListComponent extends Component {
  @tracked config: FilterConfig = {
    sort: {},
    search: {},
    filters: {},
  };

  @action
  onPageChange() {
    console.log(...arguments);
  }
}
