/**
 * Copyright (c) HashiCorp, Inc.
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FilterBarController extends Controller {
  @tracked filters = {
    search: {
      value: '',
    },
    filters: {
      status: [
        { text: 'Running', value: 'running' },
        { text: 'Warning', value: 'warning' },
      ],
      type: {
        text: 'Nomad',
        value: 'nomad',
      },
    },
  };

  @action
  handleFilterChange(config) {
    console.log('Received updated filters');
    this.filters = config;
    console.log(this.filters);
  }
}
