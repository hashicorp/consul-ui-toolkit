import Component from '@glimmer/component';

export interface DivSignature {
  Element: HTMLDivElement;
  Args: {
    icon: string;
    text: string;
  };
}

export default class ListItemComponent extends Component<DivSignature> {}
