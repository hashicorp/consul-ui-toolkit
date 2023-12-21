/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import type { FilterBarCheckboxSignature } from 'src/types';

export default class CheckmarkComponent extends Component<FilterBarCheckboxSignature> {
  get isChecked() {
    return this.args.isChecked(
      this.args.localConfig,
      this.args.filterName,
      this.args.value,
    );
  }
}
