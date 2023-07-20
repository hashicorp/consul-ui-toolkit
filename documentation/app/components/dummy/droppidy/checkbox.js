import Component from '@glimmer/component';

export default class CheckboxComponent extends Component {
  get isChecked() {
    return this.args.isChecked('numbers', this.args.value);
  }
}
