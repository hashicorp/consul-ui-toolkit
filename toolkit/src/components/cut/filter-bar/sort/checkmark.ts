/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { SortCheckmarkSignature } from 'src/types';

export default class SortCheckmarkComponent extends Component<SortCheckmarkSignature> {
  get isSelected(): boolean {
    return this.args.config?.sort?.value === this.args.value;
  }
}
