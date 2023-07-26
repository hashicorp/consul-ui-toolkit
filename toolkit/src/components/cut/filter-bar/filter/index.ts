/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { FilterConfig, Filters } from '..';

interface FilterInterface {
  Args: {
    name: string;
    config: FilterConfig;
    toggle: (name: string, value: any) => void;
    softToggle: (name: string, displayName: string, value: any) => void;
    applyFilter: (name: string) => void;
    isChecked: (name: string, value: any) => boolean;
    isMultiSelect?: boolean;
    // not sure what to make this type
    dropdown?: any;
    listPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  };
}

export default class FilterComponent extends Component<FilterInterface> {
  get filterCount(): string | undefined {
    if (!this.args.config?.filters || !this.args.isMultiSelect) {
      return undefined;
    }

    const value = this.args.config.filters[this.args.name]?.value;
    if (value && Array.isArray(value) && value.length >= 1) {
      return value.length.toString();
    }
  }
}
