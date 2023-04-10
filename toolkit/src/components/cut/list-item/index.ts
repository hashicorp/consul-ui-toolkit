import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface DivSignature {
  Element: HTMLDivElement;
  Args: {
    href: string;
    isHrefExternal: boolean;
    route: string;
    isRouteExternal: boolean;
    query: object;
    replace: string;
    onClick(): void;
  };
}

export default class ListItemComponent extends Component<DivSignature> {
  @action
  onClick() {
    this.args.onClick?.();
  }
}