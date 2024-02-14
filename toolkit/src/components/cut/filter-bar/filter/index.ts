/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import type { FilterSignature, ToggleArgs } from 'src/types';

/**
 * `Cut::FilterBar::Filter` is a wrapper of the HDS::Dropdown component that exposes wrapped dropdown list items
 * that handle hooking up the change handlers for updating filter bar state. It also provides some defaults to the UI
 * compoents, like filter counts to the toggle button.
 *
 * ```
 * <Cut::FilterBar as |FB|>
 *  <FB.Filter @name="status" as |F|>
 *    <F.ToggleButton @text="Status" />
 *    <F.Checkbox @name="Warning" @value="warning" />
 *  </FB.Filter>
 * </Cut::FilterBar>
 * ```
 *
 * @class Cut::FilterComponent
 *
 */
export default class FilterComponent extends Component<FilterSignature> {
  get toggle(): (toggle: ToggleArgs) => void {
    return this.args.batch ? this.args.softToggle : this.args.toggle;
  }

  get filterCount(): string | undefined {
    if (!this.args.config?.filters || !this.args.isMultiSelect) {
      return undefined;
    }

    const value = this.args.config.filters[this.args.name];
    if (value && Array.isArray(value)) {
      return value.length.toString();
    } else if (value) {
      return '1';
    }
  }
}
