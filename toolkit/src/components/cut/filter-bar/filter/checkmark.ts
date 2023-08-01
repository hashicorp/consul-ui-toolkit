/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { FilterConfig, ToggleArgs } from '..';

interface FilterBarCheckbox {
  Args: {
    filterName: string;
    name: string;
    value: unknown;
    localConfig: FilterConfig;
    toggle: (toggle: ToggleArgs) => void;
    isChecked: (
      localConfig: FilterConfig,
      name: string,
      value: unknown
    ) => boolean;
  };
}

export default class CheckmarkComponent extends Component<FilterBarCheckbox> {
  get isChecked() {
    return this.args.isChecked(
      this.args.localConfig,
      this.args.filterName,
      this.args.value
    );
  }
}
