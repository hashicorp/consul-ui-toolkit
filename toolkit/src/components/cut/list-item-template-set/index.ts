import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface DivSignature {
  Element: HTMLDivElement;
  Args: {
    name: string;
  };
}

export default class ListItemTemplateSetComponent extends Component<DivSignature> {
  @action
  onClick() {
    console.log('clicked');
  }
}
