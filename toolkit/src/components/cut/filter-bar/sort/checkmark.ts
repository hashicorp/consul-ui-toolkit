/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { FilterConfig } from '..';

interface SortCheckmarkInterface {
  checkmark: unknown;
  config: FilterConfig;
  value: string;
  name: string;
  onSortChange: (value: string, text: string) => void;
}

export default class SortCheckmarkComponent extends Component<SortCheckmarkInterface> {
  get isSelected(): boolean {
    return this.args.config?.sort?.value === this.args.value;
  }
}
