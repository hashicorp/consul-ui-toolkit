import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface Args {
  name: string;
}

export default class ConsulCardsWhyConsulComponent extends Component<Args> {
  @tracked count = 0;

  get text(): string {
    return `${this.args.name} has clicked the button ${this.count} times`;
  }

  // @action
  // incrementCount() {
  //   this.count += 1;
  // }
}
