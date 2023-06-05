/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';

export interface DivSignature {
  Element: HTMLDivElement;
  Args: {
    icon: string;
    text: string;
    connection?: string | undefined;
    iconColor?: string | undefined;
  };
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class TextWithIconComponent extends Component<DivSignature> {}
