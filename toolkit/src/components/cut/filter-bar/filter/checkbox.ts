/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { ToggleArgs } from '..';

interface FilterBarCheckbox {
  Args: {
    filterName: string;
    name: string;
    value: any;
    toggle: (toggle: ToggleArgs) => void;
    isChecked: (name: string, value: any) => boolean;
  };
}

export default class CheckboxComponent extends Component<FilterBarCheckbox> {
  get isChecked() {
    return this.args.isChecked(this.args.filterName, this.args.value);
  }
}
