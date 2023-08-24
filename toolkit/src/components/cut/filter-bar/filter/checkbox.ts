/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { FilterBarCheckboxSignature } from 'src/types';

export default class CheckboxComponent extends Component<FilterBarCheckboxSignature> {
  get isChecked() {
    return this.args.isChecked(
      this.args.localConfig,
      this.args.filterName,
      this.args.value
    );
  }
}
