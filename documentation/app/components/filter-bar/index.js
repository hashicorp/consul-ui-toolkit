import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FilterBarComponent extends Component {
  @tracked filters = { status: ['success'] };
  @tracked filterChanges = {};

  @action
  toggleFilterValue(filterName, value) {
    // grab existing filter, existing filter changes
    // toggle filter value on the above
    // apply filter changes to the filterchanges tracked attribute
    console.log('BEFORE:');
    console.log('Filter Changes:', this.filterChanges);
    // debugger;
    let filter = Object.assign({}, { [filterName]: this.filters[filterName] });

    if (this.filterChanges[filterName]) {
      filter = Object.assign(filter, {
        [filterName]: this.filterChanges[filterName],
      });
    }

    if (Array.isArray(this.filters[filterName])) {
      const valueIndex = filter[filterName].indexOf(value);

      if (valueIndex !== -1) {
        filter[filterName].splice(valueIndex, 1);
      } else {
        filter[filterName].push(value);
      }
    }

    const newFilterChanges = Object.assign({}, this.filterChanges, filter);
    this.filterChanges = newFilterChanges;
    console.log('AFTER:');
    console.log('Filter Changes:', this.filterChanges);
  }

  @action
  applyFilter(name) {
    // apply filterChanges to filters
    // delete that filters change in the filterchanges object
  }
}
