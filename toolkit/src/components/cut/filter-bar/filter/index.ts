/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { FilterConfig, ToggleArgs } from '..';

interface FilterInterface {
  Args: {
    name: string;
    config: FilterConfig;
    localConfig: FilterConfig;
    toggle: (toggle: ToggleArgs) => void;
    softToggle: (toggle: ToggleArgs) => void;
    applyFilter: (name: string) => void;
    isChecked: (localConfig: FilterConfig, name: string, value: any) => boolean;
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
    if (!this.args.config?.filters) {
      return undefined;
    }

    const value = this.args.config.filters[this.args.name];
    if (value && Array.isArray(value)) {
      return value.length.toString();
    } else if (value) {
      return '1';
    }
  }
}
