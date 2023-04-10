import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface DivSignature {
  Element: HTMLDivElement;
}

export default class ListItemActionComponent extends Component<DivSignature> {
  @action
  onActionClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}