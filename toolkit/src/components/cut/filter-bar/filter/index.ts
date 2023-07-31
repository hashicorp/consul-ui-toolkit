/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { FilterConfig, ToggleArgs } from '..';

interface FilterInterface {
  Args: {
    name: string;
    config: FilterConfig;
    toggle: (toggle: ToggleArgs) => void;
    softToggle: (toggle: ToggleArgs) => void;
    applyFilter: (name: string) => void;
    isChecked: (name: string, value: any) => boolean;
    isMultiSelect?: boolean;
    batch?: boolean;
    dropdown?: unknown;
    listPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  };
}

export default class FilterComponent extends Component<FilterInterface> {
  get toggle(): (toggle: ToggleArgs) => void {
    return this.args.batch ? this.args.softToggle : this.args.toggle;
  }

  get filterCount(): string | undefined {
    if (!this.args.config?.filters || !this.args.isMultiSelect) {
      return undefined;
    }

    const value = this.args.config.filters[this.args.name];
    if (value && Array.isArray(value) && value.length >= 1) {
      return value.length.toString();
    }
  }
}
