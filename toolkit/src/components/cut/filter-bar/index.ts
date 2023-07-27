/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export interface ComponentSignature {
  Args: {
    config: FilterConfig;
    onChange: (config: FilterConfig) => void;
  };
}

export interface FilterConfig {
  search?: Search;
  filters?: Filters;
  sort?: { value?: string };
}

interface Search {
  value?: string;
}

export interface Filter {
  text: string;
  value: any;
}

export interface Filters {
  [name: string]: Filter | Filter[] | undefined;
}

interface AppliedFilter {
  name: string;
  value: Filter[];
  isMultiSelect?: boolean;
}

// 'clusterID'.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").replace(/  /g, " ").replace(/^./g, (match) => match.toUpperCase())
export default class FilterBarComponent extends Component<ComponentSignature> {
  @tracked configChanges: FilterConfig = {};
  // @tracked localConfig?: FilterConfig;
  titlecase(value: string): string | null {
    if (!value || typeof value !== 'string') {
      return null;
    }

    return value
      .replace(/([A-Z]+)/g, ' $1')
      .replace(/([A-Z][a-z])/g, ' $1')
      .replace(/  /g, ' ')
      .replace(/^./g, (match) => match.toUpperCase());
  }

  get localConfig(): FilterConfig {
    /*
      - take config
      - if there are no filter changes return config
      - if there are filter changes apply them to config and return them
    */
    let local = Object.assign({}, this.args.config);

    if (this.configChanges.filters) {
      // do the filter changes
      local.filters = Object.assign(
        {},
        local.filters,
        this.configChanges.filters
      );
    }

    if (this.configChanges.search) {
      // do the search changes
      local.search = Object.assign({}, local.search, this.configChanges.search);
    }

    if (this.configChanges.sort) {
      // do the sort changes
      local.sort = Object.assign({}, local.sort, this.configChanges.sort);
    }

    return local;
  }

  /**
   * [
   *   { name: filterName, value: { text: , value: }}
   * ]
   */
  get appliedFilters(): AppliedFilter[] {
    return Object.keys(this.args.config?.filters || {})
      .map((filterName) => {
        const filter = this.args.config?.filters?.[filterName];

        if (filter && Array.isArray(filter)) {
          return {
            name: filterName,
            value: this.args.config?.filters?.[filterName],
            isMultiSelect: true,
          };
        } else if (filter) {
          return {
            name: filterName,
            value: [this.args.config?.filters?.[filterName]],
            isMultiSelect: false,
          };
        }
      })
      .filter(Boolean) as AppliedFilter[];
  }

  @action
  isCheckboxChecked(filter: string, value: any) {
    if (Array.isArray(this.localConfig?.filters?.[filter])) {
      return !!(this.localConfig?.filters?.[filter] as Filter[]).find(
        (filter: Filter) => filter.value === value
      );
    } else {
      return (this.localConfig?.filters?.[filter] as Filter)?.value === value;
    }
  }

  /**
   *
   * @param name
   * @param displayName
   * @param value
   * @param isMultiSelect
   *
   * softToggleFilterValue extracts the filter that is being changed from the passed in config,
   * applies the existing pending config changes for that filter to it, then applies the new
   * change to it and saves it back to the configChanges object so that it may be applied in
   * the future.
   *
   * TODO:
   *  this works best with arrays of basic data types and basic data types best right now.
   *  Need to find a way to identify custom objects so that we can compare them.
   *  This also doesn't support passing in display copy for value types currently. By that
   *  I mean if you have a value that isn't easily or nicely converted to a string to show in
   *  the applied filters section of the filter bar, it would be nice to be able to pass in copy
   *  for how it should be represented there.
   */
  @action
  softToggleFilterValue(
    name: string,
    displayName: string,
    value: any,
    isMultiSelect?: boolean
  ) {
    let filterChange: Filters = {};

    if (this.localConfig?.filters?.[name]) {
      filterChange = Object.assign(filterChange, {
        [name]: this.localConfig?.filters?.[name],
      });
    }

    if (this.configChanges?.filters?.[name]) {
      filterChange = Object.assign(filterChange, {
        [name]: this.configChanges?.filters?.[name],
      });
    }

    if (isMultiSelect) {
      if (Array.isArray(filterChange[name])) {
        let valueIndex = (filterChange[name] as Filter[]).findIndex(
          (filter: Filter) => filter.value === value
        );

        if (valueIndex !== -1) {
          (filterChange[name] as Filter[]).splice(valueIndex, 1);
        } else {
          (filterChange[name] as Filter[]).push({ text: displayName, value });
        }
      } else {
        (filterChange[name] as Filter[]) = [{ text: displayName, value }];
      }
    } else if (typeof value === 'object') {
      filterChange[name] = { text: displayName, value };
    } else {
      if ((filterChange[name] as Filter)?.value === value) {
        filterChange[name] = undefined;
      } else {
        filterChange[name] = { text: displayName, value };
      }
    }
    this.configChanges.filters = Object.assign(
      this.configChanges?.filters || {},
      filterChange
    );
  }

  /**
   *
   * @param filterName
   * @param displayName
   * @param value
   * @param isMultiSelect
   *
   * toggleFilterValue toggles filters and applies the change immediately. This will call the softToggleValue
   * function, followed by the applyFilter function to perform this.
   */
  @action
  toggleFilterValue(
    filterName: string,
    displayName: string,
    value: any,
    isMultiSelect?: boolean
  ) {
    this.softToggleFilterValue(filterName, displayName, value, isMultiSelect);
    this.applyFilter(filterName);
  }

  // apply filterChanges to filters
  // delete that filters change in the filterchanges object
  /**
   *
   * @param name
   */
  @action
  applyFilter(name: string): any {
    // grab the config
    let config = Object.assign({}, this.args.config);

    // apply the filter from filterChanges
    if (Object.hasOwn(this.configChanges?.filters || {}, name)) {
      config.filters = Object.assign({}, config.filters, {
        [name]: this.configChanges?.filters?.[name],
      });
    }
    // clear out the empty filters
    if (config.filters) {
      Object.keys(config.filters).forEach((key) => {
        if (
          !config?.filters?.[key] ||
          (Array.isArray(config?.filters?.[key]) &&
            (config?.filters?.[key] as Filter[])?.length === 0)
        ) {
          delete config.filters?.[key];
        }
      });
    }
    // call it
    this.args.onChange(config);
    // clear out the config changes for that filter
    delete this.configChanges?.filters?.[name];
  }
}
