/**
 * Copyright (c) HashiCorp, Inc.
 */

export interface TextWithIconSignature {
  Element: HTMLDivElement;
  Args: {
    icon: string;
    text: string;
    connection?: string | undefined;
    iconColor?: string | undefined;
  };
}
