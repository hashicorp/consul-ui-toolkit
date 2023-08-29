/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import structuredClone from '@ungap/structured-clone';
import {
  AppliedFilter,
  Filter,
  FilterBarSignature,
  FilterConfig,
  Filters,
  HTMLElementEvent,
  ToggleArgs,
} from 'src/types';

/**
 * `Cut::FilterBar` provides the UI building blocks for building a FilterBar while also managing state for you.
 *
 * ```
 * <Cut::FilterBar
 *  @config={{filterConfig}}
 *  @count={{numberOfReturnedItems}}
 *  @onChange={{onFilterChangeFunction}}
 * as |FB|>
 *
 * </Cut::FilterBar>
 * ```
 *
 * @class FilterBarComponent
 *
 * The FilterBar component takes in a `config` which denotes the initial values of the filter, search, and sort.
 * In addition, it takes a `onChange` function that will be called everytime the filters/sort/search are altered
 * with the new config. It is the consumers responsibility to perform any side-effects of filter changes and to
 * update the config state accordingly.
 *
 * FilterBar manages state via 3 main variables. The `config` is the source of truth, as it represents the actual
 * state of the filters/search/sort. The `pendingFilterChange` is an object of the same type as `config.filters`, but it holds
 * any pending changes that have yet to be committed/applied. The `localConfig` is a `FilterConfig` object.
 * It is the result of taking the source of truth (config), and applying any existing pending filter changes from the
 * `pendingFilterChange` object to it. `localConfig` is used to represent the state of pending action. For example,
 * if I were to check a few checkboxes in a batch filter, but not yet apply them. This state would be represented
 * in the `localConfig` but not yet in the `config`. Once you apply the pending changes, they will be applied to the
 * `config` and the `onChange` function will be called.
 */
export default class FilterBarComponent extends Component<FilterBarSignature> {
  @tracked pendingFilterChange: Filters = {};

  get localConfig(): FilterConfig {
    /*
      - take config
      - if there are no filter changes return config
      - if there are filter changes apply them to config and return them
    */
    const local = structuredClone(this.args.config);

    const pendingFilterKey = Object.keys(this.pendingFilterChange)[0];
    if (pendingFilterKey) {
      local.filters = Object.assign({}, local.filters, {
        [pendingFilterKey]: this.pendingFilterChange[pendingFilterKey],
      });
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

  get shouldShowClearFiltersButton(): boolean {
    return (
      this.appliedFilters.length > 0 &&
      !!this.appliedFilters.find((filter) => !filter.isRequired)
    );
  }

  get hasCount(): boolean {
    return typeof this.args.count === 'number';
  }

  get isFiltering(): boolean {
    return Object.keys(this.args.config?.filters || {}).length > 0;
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
   * @function softToggleFilterValue
   * @param toggle ToggleArgs
   *
   * softToggleFilterValue extracts the filter that is being changed from the passed in config,
   * applies the existing pending config changes for that filter to it, then applies the new
   * change to it and saves it back to the pendingFilterChange object so that it may be applied in
   * the future.
   */
  @action
  softToggleFilterValue(toggle: ToggleArgs): void {
    const { filterName, value, text, isMultiSelect, isRequired } =
      Object.assign({}, { isMultiSelect: false, isRequired: false }, toggle);
    let filterChange: Filters = {};

    if (this.localConfig?.filters?.[filterName]) {
      filterChange = Object.assign({}, filterChange, {
        [filterName]: this.localConfig?.filters?.[filterName],
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

    this.pendingFilterChange = Object.assign(
      {},
      this.pendingFilterChange,
      filterChange
    );
  }

  /**
   * @function softToggleFilterValue
   * @param toggle ToggleArgs
   *
   * toggleFilterValue toggles filters and applies the change immediately. This will call the softToggleValue
   * function, followed by the applyFilter function to perform this.
   */
  @action
  toggleFilterValue(toggle: ToggleArgs): void {
    this.softToggleFilterValue(toggle);
    this.applyFilter(toggle.filterName);
  }

  /**
   * @function applyFilter
   * @param name
   *
   * Applies the filter changes in `configChanges` for the named filter to the `config`
   * and calls the `onChange` function with the new config.
   */
  @action
  applyFilter(name: string): void {
    // grab the config
    const config = structuredClone(this.args.config);

    // apply the filter from filterChanges
    if (
      Object.prototype.hasOwnProperty.call(this.pendingFilterChange || {}, name)
    ) {
      config.filters = Object.assign({}, config.filters, {
        [name]: this.pendingFilterChange?.[name],
      });
    }

    if (
      !config?.filters?.[name] ||
      (Array.isArray(config?.filters?.[name]) &&
        (config?.filters?.[name] as Filter[])?.length === 0)
    ) {
      delete config.filters?.[name];
    }

    // call it
    this.args.onChange(config);

    // clear out the config changes for that filter
    this.pendingFilterChange = {};
  }

  /**
   * @function clearPendingFilter
   *
   * Clears all pending filter changes
   */
  @action
  clearPendingFilter(): void {
    this.pendingFilterChange = {};
  }

  /**
   * @function clearFilters
   *
   * Clears all existing filters that don't have `isRequired` set to `true` in the `config`.
   * It also clears out all changes in the `pendingFilterChanges` object and calls the `onChange` function
   * with the new config.
   */
  @action
  clearFilters(): void {
    let config = structuredClone(this.args.config);

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
    this.pendingFilterChange = {};
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
