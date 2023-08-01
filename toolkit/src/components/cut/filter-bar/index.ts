/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export interface ComponentSignature {
  Args: {
    config: FilterConfig;
    results?: number;
    onChange: (config: FilterConfig) => void;
  };
}

export interface FilterConfig {
  search?: Search;
  filters?: Filters;
  sort?: Sort;
}

interface Sort {
  value?: string;
}

interface Search {
  value?: string;
}

export interface Filter {
  text: string;
  value: unknown;
  isRequired?: boolean;
}

export interface Filters {
  [name: string]: Filter | Filter[] | undefined;
}

export interface AppliedFilter {
  name: string;
  value: Filter[];
  isMultiSelect?: boolean;
  isRequired?: boolean;
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  currentTarget: T;
};

export interface ToggleArgs {
  filterName: string;
  value: unknown;
  text: string;
  isMultiSelect?: boolean;
  isRequired?: boolean;
}

export default class FilterBarComponent extends Component<ComponentSignature> {
  @tracked configChanges: FilterConfig = {};

  get localConfig(): FilterConfig {
    /*
      - take config
      - if there are no filter changes return config
      - if there are filter changes apply them to config and return them
    */
    const local = Object.assign({}, this.args.config);

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

  get appliedFilters(): AppliedFilter[] {
    return Object.keys(this.args.config?.filters || {})
      .map((filterName) => {
        const filter = this.args.config?.filters?.[filterName];

        if (filter && Array.isArray(filter)) {
          const isRequired = !!(
            this.args.config?.filters?.[filterName] as Filter[]
          ).find((filter: Filter) => filter.isRequired);

          return {
            name: filterName,
            value: this.args.config?.filters?.[filterName],
            isMultiSelect: true,
            isRequired,
          };
        } else if (filter) {
          const isRequired = !!(
            this.args.config?.filters?.[filterName] as Filter
          ).isRequired;

          return {
            name: filterName,
            value: [this.args.config?.filters?.[filterName]],
            isMultiSelect: false,
            isRequired,
          };
        }
      })
      .filter(Boolean) as AppliedFilter[];
  }

  isChecked(localConfig: FilterConfig, filter: string, value: unknown) {
    if (Array.isArray(localConfig?.filters?.[filter])) {
      return !!(localConfig?.filters?.[filter] as Filter[]).find(
        (filter: Filter) => filter.value === value
      );
    } else {
      return (localConfig?.filters?.[filter] as Filter)?.value === value;
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
  softToggleFilterValue(toggle: ToggleArgs): void {
    const { filterName, value, text, isMultiSelect, isRequired } =
      Object.assign({}, { isMultiSelect: false, isRequired: false }, toggle);
    let filterChange: Filters = {};

    if (this.localConfig?.filters?.[filterName]) {
      filterChange = Object.assign(filterChange, {
        [filterName]: this.localConfig?.filters?.[filterName],
      });
    }

    if (this.configChanges?.filters?.[filterName]) {
      filterChange = Object.assign(filterChange, {
        [filterName]: this.configChanges?.filters?.[filterName],
      });
    }

    if (isMultiSelect) {
      if (Array.isArray(filterChange[filterName])) {
        const valueIndex = (filterChange[filterName] as Filter[]).findIndex(
          (filter: Filter) => filter.value === value
        );

        if (valueIndex !== -1 && !isRequired) {
          (filterChange[filterName] as Filter[]).splice(valueIndex, 1);
        } else {
          (filterChange[filterName] as Filter[]).push({
            text,
            value,
            isRequired,
          });
        }
      } else {
        (filterChange[filterName] as Filter[]) = [{ text, value, isRequired }];
      }
    } else if (typeof value === 'object') {
      filterChange[filterName] = { text, value, isRequired };
    } else {
      if (
        (filterChange[filterName] as Filter)?.value === value &&
        !isRequired
      ) {
        filterChange[filterName] = undefined;
      } else {
        filterChange[filterName] = { text, value, isRequired };
      }
    }
    this.configChanges.filters = Object.assign(
      {},
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
  toggleFilterValue(toggle: ToggleArgs): void {
    this.softToggleFilterValue(toggle);
    this.applyFilter(toggle.filterName);
  }

  // apply filterChanges to filters
  // delete that filters change in the filterchanges object
  /**
   *
   * @param name
   */
  @action
  applyFilter(name: string): void {
    // grab the config
    const config = Object.assign({}, this.args.config);

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

  @action
  clearFilters(): void {
    let config = Object.assign({}, this.args.config) || {};

    const keysToKeep = Object.keys(config?.filters || {}).filter(
      (key: string) => {
        return Array.isArray(config.filters?.[key])
          ? !!(config.filters?.[key] as Filter[])?.find(
              (filter: Filter) => filter.isRequired
            )
          : (config.filters?.[key] as Filter)?.isRequired;
      }
    );

    const filtersToKeep: Filters = {};
    keysToKeep.forEach((key) => {
      filtersToKeep[key] = config.filters?.[key];
    });

    config = Object.assign({}, config, { filters: filtersToKeep });

    this.args.onChange(config);
    this.configChanges = {};
  }

  @action
  onSearchKeyup(event: KeyboardEvent) {
    const value = (event?.target as HTMLInputElement)?.value;

    if (event.key === 'Enter') {
      this.onSearch(value);
    }
  }

  @action
  onSearchInput(event: HTMLElementEvent<HTMLInputElement>) {
    const value = event?.target?.value;

    if (value === '') {
      this.onSearch('');
    }
  }

  @action
  onSearch(value: string): void {
    const config = Object.assign({}, this.args.config, {
      search: {
        value,
      },
    });

    this.args.onChange(config);
  }

  @action
  onSortChange(value: string, text: string): void {
    if (value && value !== this.args.config?.sort?.value) {
      const config = Object.assign({}, this.args.config, {
        sort: { value, text },
      });

      this.args.onChange(config);
    }
  }
}
