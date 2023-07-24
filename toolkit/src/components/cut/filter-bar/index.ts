/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
// import { assert } from '@ember/debug';

export interface ComponentSignature {
  Args: {
    href?: string;
    isHrefExternal?: boolean;
    route?: string;
    isRouteExternal?: boolean;
    query?: object;
    replace?: string;
    onClick(): void;
  };
}

interface Filter {
  text: string;
  value: any;
}

interface Filters {
  [name: string]: Filter;
}

export default class FilterBarComponent extends Component<ComponentSignature> {
  @tracked filters: Filters = {
    status: { value: ['running'], text: 'Status' },
  };
  @tracked filterChanges: Filters = {};

  isCheckboxChecked(filter: string, value: any) {
    console.log(this.filters);
    console.log(this.filters[filter], filter, value);

    return this.filters[filter].value.includes(value);
  }

  @action
  softToggleFilterValue(filterName: string, value: Filter) {
    // grab existing filter, existing filter changes
    // toggle filter value on the above
    // apply filter changes to the filterchanges tracked attribute
    console.log('BEFORE:');
    console.log('Filter Changes:', this.filterChanges);

    let filter: Filters = Object.assign(
      {},
      { [filterName]: this.filters[filterName] }
    );

    if (this.filterChanges[filterName]) {
      filter = Object.assign(filter, {
        [filterName]: this.filterChanges[filterName],
      });
    }

    if (Array.isArray(this.filters[filterName])) {
      const valueIndex = filter[filterName].value.indexOf(value);

      if (valueIndex !== -1) {
        filter[filterName].value.splice(valueIndex, 1);
      } else {
        filter[filterName].value.push(value);
      }
    }

    const newFilterChanges = Object.assign({}, this.filterChanges, filter);
    this.filterChanges = newFilterChanges;
    console.log('AFTER:');
    console.log('Filter Changes:', this.filterChanges);
  }

  @action
  toggleFilterValue(filterName: string, value: Filter) {
    // grab existing filter, existing filter changes
    // toggle filter value on the above
    // apply filter changes to the filterchanges tracked attribute
    let filter: Filters = Object.assign(
      {},
      { [filterName]: this.filters[filterName] }
    );

    if (this.filterChanges[filterName]) {
      filter = Object.assign(filter, {
        [filterName]: this.filterChanges[filterName],
      });
    }

    if (Array.isArray(this.filters[filterName])) {
      const valueIndex = filter[filterName].value.indexOf(value);

      if (valueIndex !== -1) {
        filter[filterName].value.splice(valueIndex, 1);
      } else {
        filter[filterName].value.push(value);
      }
    } else if (filter[filterName] === value) {
      // TODO: fix this
      // filter[filterName] = undefined;
    } else {
      filter[filterName] = value;
    }

    this.filters = Object.assign({}, this.filters, {
      [filterName]: filter[filterName],
    });
  }

  // apply filterChanges to filters
  // delete that filters change in the filterchanges object
  @action
  applyFilter(name: string) {
    this.filters = Object.assign({}, this.filters, {
      [name]: this.filterChanges[name],
    });

    console.log(this.filters);
  }
}
