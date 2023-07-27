/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';

interface FilterBarCheckbox {
  Args: {
    filterName: string;
    name: string;
    value: any;
    toggle: (name: string, value: any) => void;
    softToggle: (name: string, displayName: string, value: any) => void;
    isChecked: (name: string, value: any) => boolean;
  };
}

export default class CheckboxComponent extends Component<FilterBarCheckbox> {
  get isChecked() {
    return this.args.isChecked(this.args.filterName, this.args.value);
  }
}
