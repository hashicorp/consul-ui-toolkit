/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface DivSignature {
  Element: HTMLDivElement;
}

export default class ListItemActionComponent extends Component<DivSignature> {
  @action
  onClickStopPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
