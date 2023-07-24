import Component from '@glimmer/component';

interface FilterBarCheckbox {
  Args: {
    name: string;
    value: any;
    toggle: (name: string, value: any) => void;
    isChecked: (name: string, value: any) => boolean;
  };
}

export default class CheckboxComponent extends Component<FilterBarCheckbox> {
  get isChecked() {
    return this.args.isChecked(this.args.name, this.args.value);
  }
}
