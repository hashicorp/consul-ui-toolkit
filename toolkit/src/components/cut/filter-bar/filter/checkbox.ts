/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { FilterConfig, ToggleArgs } from '..';

interface FilterBarCheckbox {
  Args: {
    filterName: string;
    name: string;
    value: any;
    localConfig: FilterConfig;
    toggle: (toggle: ToggleArgs) => void;
    isChecked: (localConfig: FilterConfig, name: string, value: any) => boolean;
  };
}

export default class CheckboxComponent extends Component<FilterBarCheckbox> {
  get isChecked() {
    return this.args.isChecked(
      this.args.localConfig,
      this.args.filterName,
      this.args.value
    );
  }
}
